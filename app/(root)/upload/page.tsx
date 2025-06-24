"use client";
import { Card, CardBody, Input } from "@heroui/react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-[80vh] p-4 ">
      <Card className="border-1 border-gray-300 rounded-2xl shadow-2xl">
        <h1 className="text-2xl  m-4 text-center font-semibold">
          Upload Your Video File
        </h1>
        <CardBody>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input label="Email" variant={"flat"} />
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
