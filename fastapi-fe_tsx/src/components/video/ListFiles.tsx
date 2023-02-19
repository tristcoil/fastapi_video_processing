import React, { useState, useEffect } from 'react';

interface ListFilesProps {
  type: string;
}

const ListFiles: React.FC<ListFilesProps> = (props) => {
  const [files, setFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetch(`http://localhost:8000/files/${props.type}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFiles(data.files);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => console.error(error));
  // }, [props.type]);

  useEffect(() => {
    fetch(`http://localhost:8000/files/${props.type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFiles(data.files);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the files:', error);
        setIsLoading(false);
      });
  }, [props.type]);
  



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <p>Directory contents {props.type} : </p>
      <ul className="list-disc">
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListFiles;
