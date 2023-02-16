// App.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Form = ({ prefix, filename_prop, onFormSubmit }) => {
  const [filename, setFilename] = useState('');
  const [chunkNum, setChunkNum] = useState(0);
  const [chunkSize, setChunkSize] = useState(10);

  const handleSubmit = (e) => {
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
            <input type="number" value={chunkNum} onChange={(e) => { setChunkNum(e.target.value); }} />
          </label>
        </div>
        <div>
          <label>
            Chunk Size:
            <input type="number" value={chunkSize} onChange={(e) => { setChunkSize(e.target.value); }} />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};




const Card = ({ prefix, filename, chunkNum, chunkSize }) => {
  const [totalChunks, setTotalChunks] = useState(0);
  const [textChunk, setTextChunk] = useState("");
  const [prevChunkNum, setPrevChunkNum] = useState(chunkNum);
  const [isFirstRender, setIsFirstRender] = useState(true);

  let mod_filename = ''
  if (prefix === '') {
    mod_filename = filename
  }
  else {
    mod_filename = `${prefix}_${filename}`
  } 

  const handleSubmit = async () => {
    let uri = '';
    if (prefix === '') {
      uri = `http://localhost:8000/text_chunks/${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`
    }
    else {
      uri = `http://localhost:8000/text_chunks/${prefix}_${filename}?chunk_num=${chunkNum}&chunk_size=${chunkSize}`
    }
    const response = await fetch(uri);
    const data = await response.json();
    setTotalChunks(data.total_chunks);
    setTextChunk(data.chunk);
  };

  useEffect(() => {
    if (filename !== 'default' && chunkNum !== 'default' && chunkSize !== 'default') {

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

const FullTextCard = ({ prefix, filename }) => {
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
      <h1>Card heading {prefix}</h1>
      <p>Filename: {prefix}_{filename}</p>
      <p>Text chunk: {textChunk}</p>
    </div>
  );
};





const ListFiles = (props) => {
  const [files, setFiles] = useState([]);
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




const Navigation = ({ prefix, chunkNum, setChunkNum, filename, chunkSize }) => {
  const [maxChunks, setMaxChunks] = useState(0);

  useEffect(() => {
    const fetchMaxChunks = async () => {
      console.log('navigation api call to fetch max chunks')
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

//-----------------------------------------------------------------------

const DownloadAudio = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setVideoUrl(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const youtubeVideoUrlPattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (!youtubeVideoUrlPattern.test(videoUrl)) {
      setErrorMessage("Invalid YouTube video URL");
      return;
    }

    axios
      .post("http://localhost:8000/download", { video_url: videoUrl })
      .then((response) => {
        console.log(response.data);
        setVideoUrl("");
        setErrorMessage("");
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while making the API call");
      });
  };

  return (
    <div>
      <h1>Download audio from YouTube video</h1>
      <p>videos, that are DRM protected, cannot be downloaded</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={handleChange}
          placeholder="Enter YouTube video URL"
        />
        <button type="submit">Download audio</button>
      </form>
      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}
      {status ? <div>{status}</div> : null}
    </div>
  );
};

//------------------------------------------------------------------------
const TranscribeAudio = () => {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setFileName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fileName.endsWith(".mp3")) {
      setStatus("File must be in .mp3 format");
      return;
    }
    axios
      .post("http://localhost:8000/transcribe", { file_name: fileName })
      .then((response) => {
        console.log(response.data);
        setFileName("");
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
        setStatus("Error while transcribing audio");
      });
  };

  return (
    <div>
      <h1>Transcribe audio file</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fileName}
          onChange={handleChange}
          placeholder="Enter file name"
        />
        <button type="submit">Transcribe audio</button>
      </form>
      {status ? <div>{status}</div> : null}
    </div>
  );
};

//------------------------------------------------------------------------

const SplitFile = () => {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setFileName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fileName.endsWith(".txt")) {
      setStatus("File must be in .txt format");
      return;
    }
    axios
      .post("http://localhost:8000/split", { filename: fileName })
      .then((response) => {
        console.log(response.data);
        setFileName("");
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
        setStatus("Error while splitting file");
      });
  };

  return (
    <div>
      <h1>Split file into chunks with length n</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fileName}
          onChange={handleChange}
          placeholder="Enter file name"
        />
        <button type="submit">Split file</button>
      </form>
      {status ? <div>{status}</div> : null}
    </div>
  );
};

// ------------------------------------------------------------------------

const ProcessSplitFiles = ({workType}) => {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setFileName(event.target.value);
  };

  const handleSubmit = (event) => {
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

// ------------------------------------------------------------------------





function App() {
  const [formValue1_1, setFormValue1_1] = useState('default');
  const [formValue2_1, setFormValue2_1] = useState('default');
  const [formValue3_1, setFormValue3_1] = useState('default');

  const [formValue1_2, setFormValue1_2] = useState('default');
  const [formValue2_2, setFormValue2_2] = useState('default');
  const [formValue3_2, setFormValue3_2] = useState('default');



  const handleFormSubmit_1 = (value1, value2, value3) => {
    setFormValue1_1(value1);
    setFormValue2_1(value2);
    setFormValue3_1(value3);
  };

  const handleFormSubmit_2 = (value1, value2, value3) => {
    setFormValue1_2(value1);
    setFormValue2_2(value2);
    setFormValue3_2(value3);
  };


  const [basicActive, setBasicActive] = useState('tab1');
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };


  // the other cards will be for vocabulary and grammar
  // think how to call associated content
  return (
    <div className="App">



<>
      <MDBTabs className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Tab 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Tab 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Tab 3
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab4')} active={basicActive === 'tab4'}>
            Tab 4
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === 'tab1'}>Tab 1 content  <ProcessSplitFiles workType="translation"/> </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab2'}>Tab 2 content <ProcessSplitFiles workType="summary"/> </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab3'}>Tab 3 content <ProcessSplitFiles workType="vocabulary"/> </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab4'}>Tab 4 content <ProcessSplitFiles workType="grammar"/> </MDBTabsPane>
      </MDBTabsContent>
    </>


    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>













      <MDBAccordion initialActive={1}>
        <MDBAccordionItem collapseId={1} headerTitle='Accordion Item #1 modified'>
          <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
          plugin adds the appropriate classes that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
          custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does limit overflow.
        </MDBAccordionItem>
        <MDBAccordionItem collapseId={2} headerTitle='Accordion Item #2'>
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
          custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does limit overflow.
        </MDBAccordionItem>
        <MDBAccordionItem collapseId={3} headerTitle='Accordion Item #3'>
          <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
          custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does limit overflow.
        </MDBAccordionItem>
      </MDBAccordion>
















      <h1>Video to text</h1>
      <p>FastAPI backend running on http://localhost:8000, provides option to download audio from youtube video and process it into text files</p>
      <p>eventually, there can be additional endpoints that take the whisper generated file and will slice it in memory,
        contact chat GPT to make translations on the fly and make summary of the text.
        So we have one big file with the text (15 minutes worth of video), chop it to blocks that chatGPT can handle. And process it accordingly.
      </p>


      <div>
        <DownloadAudio />
        <TranscribeAudio />
        <SplitFile />
        <ProcessSplitFiles workType="translation"/>
        <ProcessSplitFiles workType="vocabulary"/>
        <ProcessSplitFiles workType="grammar"/>
        <ProcessSplitFiles workType="summary"/>
      </div>




      <div className="card-container">
        <div>
          <Form prefix="" filename_prop="01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt" onFormSubmit={handleFormSubmit_1} />
          <Form prefix="translation" filename_prop="01一生のお願い教科書にない日本語9N_A7KEiXhg.mp3.txt" onFormSubmit={handleFormSubmit_2} />
          <Navigation prefix="original" filename={formValue1_1} chunkNum={Number(formValue2_1)} chunkSize={Number(formValue3_1)} setFilename={setFormValue1_1} setChunkNum={setFormValue2_1} setChunkSize={setFormValue3_1} />
          <Navigation prefix="translation" filename={formValue1_2} chunkNum={Number(formValue2_2)} chunkSize={Number(formValue3_2)} setFilename={setFormValue1_2} setChunkNum={setFormValue2_2} setChunkSize={setFormValue3_2} />
        </div>
        <FullTextCard prefix="youtube" filename={formValue1_1} />
        <ListFiles type="audio" />
        <ListFiles type="text" />
      </div>

      <div className="card-container">
        <Card prefix="" filename={formValue1_1} chunkNum={Number(formValue2_1)} chunkSize={Number(formValue3_1)} />
        <Card prefix="translation" filename={formValue1_2} chunkNum={Number(formValue2_2)} chunkSize={Number(formValue3_2)} />
        <div className="info-card-container">
          <FullTextCard prefix="vocab" filename={formValue1_1} />
          <FullTextCard prefix="grammar" filename={formValue1_1} />
          <FullTextCard prefix="summary" filename={formValue1_1} />
        </div>
      </div>

    </div>
  );
}

export default App;





