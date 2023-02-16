import React, { useState, useEffect } from 'react';

interface FormProps {
    prefix: string;
    filename_prop: string;
    onFormSubmit: (filename: string, chunkNum: number, chunkSize: number) => void;
}

const Form: React.FC<FormProps> = ({ prefix, filename_prop, onFormSubmit }) => {
    const [filename, setFilename] = useState('');
    const [chunkNum, setChunkNum] = useState(0);
    const [chunkSize, setChunkSize] = useState(10);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFormSubmit(filename, chunkNum, chunkSize);
    };

    useEffect(() => {
        setFilename(filename_prop);
    }, []);

    return (
        <div className="card">
            <h1 className="text-lg text-blue-900">Form {prefix}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Filename:
                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text" value={filename} onChange={(e) => { setFilename(e.target.value); }} />
                    </label>
                </div>
                <div>
                    <label>
                        Chunk Number:
                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="number" value={chunkNum} onChange={(e) => { setChunkNum(Number(e.target.value)); }} />
                    </label>
                </div>
                <div>
                    <label>
                        Chunk Size:
                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="number" value={chunkSize} onChange={(e) => { setChunkSize(Number(e.target.value)); }} />
                    </label>
                </div>
                <div>
                    <button type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                </div>
            </form>
        </div>
    );
};





export default Form;