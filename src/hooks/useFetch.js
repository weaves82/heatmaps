import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (query) => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(query).then(res => {
      setData(res.data)
    })
  },[query])

  return data

}

export default useFetch