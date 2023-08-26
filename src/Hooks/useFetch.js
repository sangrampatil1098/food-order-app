import React, { useEffect, useState } from "react";

const useFetch = (reuqestConfig, handleLoading, handleError) => {
  console.log("use fetch rendered");
  const loadedData = [];
  const [data, setData] = useState([]);
  const { url } = reuqestConfig;

  useEffect(() => {
    const fetchData = async () => {
      console.log("inside fetch");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      console.log("responseData", responseData);

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      console.log("loadedData", loadedData);
      setData(loadedData);
    };
    fetchData()
      .then(() => {
        handleLoading(false);
      })
      .catch((err) => {
        handleLoading(false);
        handleError(err.message);
      });
  }, [url]);

  console.log("data", data);

  return data;
};

export default useFetch;
