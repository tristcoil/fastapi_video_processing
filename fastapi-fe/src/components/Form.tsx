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
            <h1>Form {prefix}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Filename:
                        <input type="text" value={filename} onChange={(e) => { setFilename(e.target.value); }} />
                    </label>
                </div>
                <div>
                    <label>
                        Chunk Number:
                        <input type="number" value={chunkNum} onChange={(e) => { setChunkNum(Number(e.target.value)); }} />
                    </label>
                </div>
                <div>
                    <label>
                        Chunk Size:
                        <input type="number" value={chunkSize} onChange={(e) => { setChunkSize(Number(e.target.value)); }} />
                    </label>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Form;