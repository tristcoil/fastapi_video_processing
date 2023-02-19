import React, { useState, useEffect } from 'react';



  interface NavigationProps {
    prefix: string;
    filename: string;
    chunkNum: number;
    chunkSize: number;
    setFilename: React.Dispatch<React.SetStateAction<string>>;
    setChunkNum: React.Dispatch<React.SetStateAction<number>>;
    setChunkSize: React.Dispatch<React.SetStateAction<number>>;
  }
  



  
  const Navigation: React.FC<NavigationProps> = ({ prefix, chunkNum, setChunkNum, filename, chunkSize }) => {
    const [maxChunks, setMaxChunks] = useState(0);
  
    // useEffect(() => {
    //   const fetchMaxChunks = async () => {
    //     console.log('navigation api call to fetch max chunks');
    //     const response = await fetch(`http://localhost:8000/text_chunks/${prefix}_${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`);
    //     const data = await response.json();
    //     setMaxChunks(data.total_chunks);
    //   };
    //   fetchMaxChunks();
    // }, [filename, chunkSize]);

    useEffect(() => {
      const fetchMaxChunks = async () => {
        console.log('navigation api call to fetch max chunks');
        try {
          const response = await fetch(`http://localhost:8000/text_chunks/${prefix}_${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          });
          const data = await response.json();
          setMaxChunks(data.total_chunks);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMaxChunks();
    }, [filename, chunkSize]);
    




  
    const handlePrev = () => {
      if (chunkNum > 0) {
        setChunkNum(chunkNum - 1);
      }
    };
  
    const handleNext = () => {
      if (chunkNum < maxChunks - 1) {
        setChunkNum(chunkNum + 1);
      }
    };
  
    return (
      <div className="card">
        <h1 className="text-lg text-blue-900">Navigation {prefix}</h1>
        <button onClick={handlePrev} className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Previous</button>
        <button onClick={handleNext} className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Next</button>
      </div>
    );
  };

  
export default Navigation;