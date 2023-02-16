import React, { useState } from "react";
import axios from "axios";

interface Props {
  workType: string;
}

const ProcessSplitFiles: React.FC<Props> = ({ workType }) => {
  const [fileName, setFileName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fileName.endsWith(".txt")) {
      setStatus("File must be in .txt format");
      return;
    }
    axios
      .post("http://localhost:8000/process_split_files", { filename: fileName, worktype: workType })
      .then((response) => {
        console.log(response.data);
        setFileName("");
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
        setStatus("Error while processing split files");
      });
  };

  return (
    <div>
      <h1>Process split files ({workType})</h1>
      <p>insert name of parent file output.txt and it will translate all files called
        output_0.txt, output_1.txt, output_2.txt, ...
        it will call them
        translation_output_0.txt, translation_output_1.txt, translation_output_2.txt, ...
        then these files are joined into one big translation file called
        translation_output.txt
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fileName}
          onChange={handleChange}
          placeholder="Enter file name"
        />
        <button type="submit">Process split files ({workType})</button>
      </form>
      {status ? <div>{status}</div> : null}
    </div>
  );
};

export default ProcessSplitFiles;
