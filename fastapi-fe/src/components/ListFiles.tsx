import React, { useState, useEffect } from 'react';

interface ListFilesProps {
  type: string;
}

const ListFiles: React.FC<ListFilesProps> = (props) => {
  const [files, setFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/files/${props.type}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.files);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [props.type]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <p>Directory contents {props.type} : </p>
      <ul>
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListFiles;
