export default async function fetchData(url,dataCallback,abortSignal)
{
    const timeStamp = Date.now();
    try{
        const response = await fetch(url,{abortSignal});
        //console.log("Response", response);
        const data = await response.json();
        //console.log("Data", data);
        dataCallback(data,timeStamp);
    }
    catch(error)
    {
        console.log("Error", error.message);
    }
}