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



    // axios
    //   .post("http://localhost:8000/process_split_files", { filename: fileName, worktype: workType })
    //   .then((response) => {
    //     console.log(response.data);
    //     setFileName("");
    //     setStatus(response.data.status);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setStatus("Error while processing split files");
    //   });

    axios.post("http://localhost:8000/process_split_files", 
    { 
      filename: fileName, 
      worktype: workType 
    }, 
    { 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      } 
    })
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
      <div className="block p-6 rounded-lg shadow-lg bg-gray max-w-sm">
      <h1 className="text-lg text-blue-900">Process split files ({workType})</h1>
        <p className="font-mono text-xs text-gray">
          insert name of parent file output.txt and it will translate all files called
          output_0.txt, output_1.txt, output_2.txt, ...
          it will call them
          translation_output_0.txt, translation_output_1.txt, translation_output_2.txt, ...
          then these files are joined into one big translation file called
          translation_output.txt
        </p>
        <br></br>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label htmlFor="filenamebox" className="form-label inline-block mb-2 text-gray-700">File name to be processed</label>
            <input
              type="text"
              value={fileName}
              onChange={handleChange}
              placeholder="Enter file name"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="filenamebox"
              aria-describedby="emailHelp" />
          </div>
          <button type="submit" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Process split files ({workType})</button>
        </form>
      </div>
  );
};

export default ProcessSplitFiles;





// original
{/* <h1>Process split files ({workType})</h1>
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
{status ? <div>{status}</div> : null} */}