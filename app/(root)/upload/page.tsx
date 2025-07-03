"use client";
import { Card, CardBody } from "@heroui/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import { Progress } from "@/components/ui/progress";

const MAX_THUMB_SIZE = 5000000;
const MAX_VID_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_VID_TYPES = ["video/mp4", "video/webm", "video/ogg"];

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  visibility: z.enum(["public", "private"]),
  file: z
    .any()
    .refine((files) => files?.length === 1, "Select a video file")
    .refine(
      (file) => file?.[0]?.size <= MAX_VID_SIZE,
      `Max video size is 10MB.`
    )
    .refine(
      (file) => ACCEPTED_VID_TYPES.includes(file?.[0]?.type),
      "Only .mp4, .webm and .ogg formats are supported."
    ),

  thumb: z
    .any()
    .refine(
      (file) => file?.[0]?.size <= MAX_THUMB_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

export default function HomePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "public",
      thumb: undefined,
      file: undefined,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [thumbProgress, setThumbProgress] = useState<number>(0);
  const [fileProgress, setFileProgress] = useState<number>(0);
  const [isuploading, setisuploading] = useState(false);

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async (file: any, setProgress: any) => {
    // Retrieve authentication parameters for the upload.

    const authParams = await authenticator();
    const { signature, expire, token, publicKey } = authParams;

    return upload({
      expire,
      token,
      signature,
      publicKey,
      file,
      fileName: file.name,
      onProgress: (event) => {
        setProgress(Math.round((event.loaded / event.total) * 100));
      },
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setisuploading(true);
    setThumbProgress(0);
    setFileProgress(0);
    let thumbUrl = null;
    let videoUrl = null;
    const toastId = toast.loading("Preparing to upload");

    try {
      const thumb = values.thumb?.[0];
      const file = values.file[0];
      if (thumb) {
        toast.loading("Uploading video and thumbnail", { id: toastId });
        const [thumbData, fileData] = await Promise.all([
          handleUpload(thumb, setThumbProgress),
          handleUpload(file, setFileProgress),
        ]);
        thumbUrl = thumbData?.url;
        videoUrl = fileData?.url;
      } else {
        toast.loading("Uploading video", { id: toastId });
        const fileData = await handleUpload(file, setFileProgress);
        thumbUrl = fileData?.thumbnailUrl;
        videoUrl = fileData?.url;
      }

      await axios
        .post("/api/videos", {
          title: values.title,
          description: values.description,
          thumbUrl,
          videoUrl,
        })
        .catch((e) => {
          throw e;
        });

      toast.success("Upload successful", { id: toastId });
      form.reset();
      formRef.current?.reset();
    } catch (error) {
      toast.error("Error Occured", { id: toastId });
      console.log(error);
    } finally {
      setisuploading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-[80vh] p-4 ">
      <Toaster position="top-right" />
      <Card className="border-1 border-gray-300 rounded-2xl shadow-2xl">
        <h1 className="text-2xl  m-4 text-center font-semibold">
          Upload Your Video File
        </h1>
        <CardBody>
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your title"
                        {...field}
                        disabled={isuploading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the description"
                        {...field}
                        disabled={isuploading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <div className="w-full ">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className="w-full rounded-2xl border-gray-800 text-gray-700"
                            disabled={isuploading}
                          >
                            <SelectValue placeholder="Choose Visibility" />
                          </SelectTrigger>
                          <SelectContent className="bg-white  ">
                            <SelectItem value="public" className="border-b-1">
                              Public
                            </SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Thumbnail (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Upload the file"
                        type="file"
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        disabled={isuploading}
                      />
                    </FormControl>
                    {isuploading && thumbProgress > 0 && (
                      <Progress value={thumbProgress} className="w-full mt-2" />
                    )}
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Video</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Upload the file"
                        type="file"
                        accept={ACCEPTED_VID_TYPES.join(",")}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        disabled={isuploading}
                      />
                    </FormControl>
                    {isuploading && fileProgress > 0 && (
                      <Progress value={fileProgress} className="w-full mt-2" />
                    )}
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />

              <div className="flex items-center w-full  justify-center">
                <Button
                  type="submit"
                  className="border hover:bg-gray-800 bg-black text-white"
                  disabled={isuploading}
                >
                  {isuploading ? "Uploading..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardBody>
      </Card>
    </main>
  );
}
