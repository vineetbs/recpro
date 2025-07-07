"use client";
import axios from "axios";

import { useEffect, useState } from "react";

const useFetchData = (url: string) => {
  const [data, setdata] = useState<any>();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      setloading(true);
      try {
        const response = await axios.get(url);
        setdata(response);
        seterror(false);
      } catch (error) {
        seterror(error);
      } finally {
        setloading(false);
      }
    };
    if (url) {
      fetch();
    }
  }, [url]);
  return { loading, data, error };
};

export default useFetchData;
