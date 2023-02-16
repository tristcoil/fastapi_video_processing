import React, { useState, useEffect } from 'react';

interface FullTextCardProps {
  prefix: string;
  filename: string;
}

const FullTextCard: React.FC<FullTextCardProps> = ({ prefix, filename }) => {
  const [textChunk, setTextChunk] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `http://localhost:8000/textfiles/${prefix}_${filename}`
    );
    const data = await response.json();
    setTextChunk(data.file_contents);
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
