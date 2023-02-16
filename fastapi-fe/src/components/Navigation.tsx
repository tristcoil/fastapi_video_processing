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
  
    useEffect(() => {
      const fetchMaxChunks = async () => {
        console.log('navigation api call to fetch max chunks');
        const response = await fetch(`http://localhost:8000/text_chunks/${prefix}_${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`);
        const data = await response.json();
        setMaxChunks(data.total_chunks);
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
        <p>Navigation {prefix}</p>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    );
  };

  
export default Navigation;