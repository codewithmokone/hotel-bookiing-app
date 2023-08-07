import React, { useEffect } from 'react'
import useStorage from '../components/hooks/useStorage'

const ProgressBar = ({ file, setFile }) => {

    const { url, progress } = useStorage(file);
    
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile])

  return (
    <div className="h-[5px] bg-sky-600 mt-[20px] block" style={{ width: progress + '%' }}></div>
  )
}

export default ProgressBar