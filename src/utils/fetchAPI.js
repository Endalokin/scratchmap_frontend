export default async function fetchData(url, dataCallback, method = 'GET', abortSignal) {
  const timeStamp = Date.now();
  try {
    const requestOptions = {
      method: method,
    };
    const response = await fetch(url, requestOptions, { abortSignal });
    //console.log("Response", response);
    const data = await response.json();
    //console.log("Data", data);
    dataCallback(data, timeStamp);
  } catch (error) {
    console.log("Error", error.message);
  }
}
