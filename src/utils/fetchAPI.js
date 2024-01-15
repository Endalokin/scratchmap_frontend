export default async function fetchData(url, dataCallback, method = 'GET', body, abortSignal) {
  const timeStamp = Date.now();
  console.log(url)
  try {
    let requestOptions = {
      method: method,
      headers: {
        'Content-Type' : 'application/json'
      }
    };
    if (method == "POST" && body) {
      requestOptions.body = JSON.stringify(body),
      console.log(typeof requestOptions.body)
    }
    const response = await fetch(url, requestOptions, { abortSignal });
    //console.log("Response", response);
    const data = await response.json();
    //console.log("Data", data);
    dataCallback(data, timeStamp);
  } catch (error) {
    console.log("Error", error.message);
  }
}
