import React, { useState, useEffect } from 'react';

interface CardProps {
  prefix: string;
  filename: string;
  chunkNum: number;
  chunkSize: number;
}

const Card: React.FC<CardProps> = ({ prefix, filename, chunkNum, chunkSize }) => {
  const [totalChunks, setTotalChunks] = useState(0);
  const [textChunk, setTextChunk] = useState("");
  const [prevChunkNum, setPrevChunkNum] = useState(chunkNum);
  const [isFirstRender, setIsFirstRender] = useState(true);

  let mod_filename = '';
  if (prefix === '') {
    mod_filename = filename;
  } else {
    mod_filename = `${prefix}_${filename}`;
  } 

  // const handleSubmit = async () => {
  //   let uri = '';
  //   if (prefix === '') {
  //     uri = `http://localhost:8000/text_chunks/${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`;
  //   } else {
  //     uri = `http://localhost:8000/text_chunks/${prefix}_${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`;
  //   }
  //   const response = await fetch(uri);
  //   const data = await response.json();
  //   setTotalChunks(data.total_chunks);
  //   setTextChunk(data.chunk);
  // };

  const handleSubmit = async () => {
    let uri = '';
    if (prefix === '') {
      //uri = `http://localhost:8000/api/text_chunks/${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`;
      uri = `/api/text_chunks/${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`;
    } else {
      //uri = `http://localhost:8000/api/text_chunks/${prefix}_${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`;
      uri = `/api/text_chunks/${prefix}_${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`;
    }
    try {
      const response = await fetch(uri, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTotalChunks(data.total_chunks);
      setTextChunk(data.chunk);
    } catch (error) {
      console.error('Error fetching data:', error);
      // handle error in UI
    }
  };



  useEffect(() => {
    if (filename !== 'default') {

      if (isFirstRender) {
        setIsFirstRender(false);
        handleSubmit();
      } else if (chunkNum !== prevChunkNum) {
        handleSubmit();
      }
    }
  }, [chunkNum]);

  return (
    <div className="card">
      <h1>Card heading {prefix}</h1>
      <p>Filename: {mod_filename}</p>
      <p>Chunk number: {chunkNum}</p>
      <p>Chunk size: {chunkSize}</p>
      <p>Total chunks: {totalChunks}</p>
      <p>Text chunk: {textChunk}</p>
    </div>
  );
};

export default Card;
