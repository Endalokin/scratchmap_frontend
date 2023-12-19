import React, {useEffect, useState} from 'react'
import fetchData from './fetchAPI'

export default function Test() {
    const [test, setTest] = useState()
    const testURL = "http://localhost:8080/test" 

    useEffect(() => {
        fetchData(testURL, (data) => {
            setTest(data.msg)
            console.log(data.msg)
        })
    }, [])
    

  return (
    <div><h1>ServerTest</h1><br/> {test}</div>
  )
}
