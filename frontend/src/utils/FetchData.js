import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    };

    fetchData().catch(console.error);
  }, [url]);

  return data;
};
