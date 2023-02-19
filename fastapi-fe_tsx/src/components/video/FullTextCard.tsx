import React, { useState, useEffect } from 'react';

interface FullTextCardProps {
  prefix: string;
  filename: string;
}

const FullTextCard: React.FC<FullTextCardProps> = ({ prefix, filename }) => {
  const [textChunk, setTextChunk] = useState("");

  // const handleSubmit = async () => {
  //   const response = await fetch(
  //     `http://localhost:8000/textfiles/${prefix}_${filename}`
  //   );
  //   const data = await response.json();
  //   setTextChunk(data.file_contents);
  // };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/textfiles/${prefix}_${filename}`, {
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
      setTextChunk(data.file_contents);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  








  useEffect(() => {
    if (filename !== 'default') {
      handleSubmit();
    }
  }, [filename]);

  return (
    <div className="card">
      <h1 className="text-lg text-blue-900">Card heading {prefix}</h1>
      <p>Filename: {prefix}_{filename}</p>
      <p>Text chunk: {textChunk}</p>
    </div>
  );
};

export default FullTextCard;
