from __future__ import unicode_literals
from fastapi import FastAPI, HTTPException
import youtube_dl
import re
import asyncio
import os
import sys
import whisper  # pip install openai-whisper
import subprocess
import threading
import urllib.parse
from starlette.middleware.cors import CORSMiddleware
import logging
import psutil
import subprocess
import multiprocessing

app = FastAPI(port=8000)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/download")
async def transcribe_audio(payload: dict):
    video_url = payload.get("video_url")
    if not video_url:
        raise HTTPException(status_code=400, detail="video_url is required")
    if "youtube.com" not in video_url and "youtu.be" not in video_url:
        raise HTTPException(
            status_code=400, detail="The provided URL is not a valid YouTube video URL"
        )

    async def clean_filename(filename):
        # removes all whitespaces, special characters and emojis from the youtube filename
        # keeps dots for '.mp3'
        filename = re.sub(r"[^\w\d\.]+", "", filename)
        filename = re.sub(r"\s+", "_", filename)
        return filename

    async def download_video(url: str):
        class MyLogger(object):
            def debug(self, msg):
                pass

            def warning(self, msg):
                pass

            def error(self, msg):
                print(msg)

        def my_hook(d):
            if d["status"] == "finished":
                print("Done downloading, now converting ...")

        cleaned_filename = await clean_filename(
            youtube_dl.YoutubeDL({}).prepare_filename(
                youtube_dl.YoutubeDL({}).extract_info(video_url, download=False)
            )
        )

        # make text file that contains the youtube video link
        youtube_cleaned_filename = 'youtube_' + cleaned_filename + '.txt'
        with open(youtube_cleaned_filename, 'w') as file:
            file.write(video_url)

        ydl_opts = {
            "format": "bestaudio/best",
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }
            ],
            "logger": MyLogger(),
            "progress_hooks": [my_hook],
            "outtmpl": cleaned_filename,
        }

        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, youtube_dl.YoutubeDL(ydl_opts).download, [url])
        
    try:
        await download_video(video_url)
        return {"status": "download started"}
    except Exception as exc:
        raise HTTPException(status_code=422, detail="File not found")









@app.get("/files/audio")
async def get_files():
    import os

    path = "./"  # directory containing .mp3 files
    files = [f for f in os.listdir(path) if f.endswith(".mp3")]
    return {"files": files}


@app.get("/files/text")
async def get_files():
    import os

    path = "./"  # directory containing .mp3 files
    files = [f for f in os.listdir(path) if f.endswith(".txt")]
    return {"files": files}


# @app.post("/transcribe")
# def transcribe_audio(payload: dict):
#    file_name = payload.get("file_name")
#    if not file_name:
#        raise HTTPException(status_code=400, detail="file_name is required")
#
#    file_path = os.path.join('./', file_name)
#    if not os.path.exists(file_path):
#        raise HTTPException(status_code=400, detail="file not found")
#
#    print('file_name: ', file_name)
#
#    # https://github.com/openai/whisper
#    # Run some long running AI transcription process on the .mp3 file
#    # ...
#    #model = whisper.load_model("tiny")     # 1GB RAM
#    #model = whisper.load_model("base")     # 1GB RAM
#    #model = whisper.load_model("small")    # 2GB RAM
#    #model = whisper.load_model("medium")   # 5GB RAM
#    #model = whisper.load_model("large")    # 10GB RAM
#    # we need to use threading,
#    # using asyncio did not like that we are using the model
#    # and the process kept crashing
#    import threading
#    def run_transcription():
#        model = whisper.load_model("tiny")
#        result = model.transcribe(file_name)
#        print(result["text"])
#        text = result["text"]
#        print(text)
#        text_file_name = file_name.replace(".mp3", ".txt")
#        with open(text_file_name, "w") as f:
#            f.write(text)
#        print("Transcription result saved to output.txt")
#
#    thread = threading.Thread(target=run_transcription)
#    thread.start()
#
#    return {"status": "transcription started"}





# @app.post("/transcribe")
# def transcribe_audio(payload: dict):
#    file_name = payload.get("file_name")
#    if not file_name:
#        raise HTTPException(status_code=400, detail="file_name is required")
#
#    if not file_name.endswith(".mp3"):
#        raise HTTPException(status_code=400, detail="File must be of type .mp3")
#
#    logging.info(f"Starting transcription for file: {file_name}")
#
#    # 100% CPU approach
#    #thread = threading.Thread(target=transcribe_audio_as_thread, args=(file_name,))
#    #thread.start()
#
#   # low process priority approach
#    #thread = threading.Thread(target=transcribe_audio_as_thread, args=(file_name,))
#    #process = psutil.Process(thread.ident)
#    #process.nice(psutil.IDLE_PRIORITY_CLASS)
#    #thread.start()
#
#    thread = threading.Thread(target=transcribe_audio_as_thread, args=(file_name,))
#    p = psutil.Process(thread.ident)  # GPT says that thread does not have the .ident, so psutil does not help here
#    p.nice(19) # 19 is the nicest
#    p.ionice(psutil.IOPRIO_CLASS_IDLE)
#    thread.start()
#
#    logging.info(f"Transcription started for file: {file_name}")
#    return {"status": "transcription started"}


@app.post("/transcribe")
def transcribe_audio(payload: dict):

    def transcribe_audio_as_thread(file_name):
        file_path = os.path.join("./", file_name)
        if not os.path.exists(file_path):
            raise HTTPException(status_code=400, detail="file not found")

        result_file = file_name.replace(".mp3", ".txt")
        result_file_path = os.path.join("./", result_file)

        command = f"whisper {file_path} --model tiny > {result_file_path}"
        process = subprocess.Popen(command, shell=True)
        process.wait()


    file_name = payload.get("file_name")
    if not file_name:
        raise HTTPException(status_code=400, detail="file_name is required")

    if not file_name.endswith(".mp3"):
        raise HTTPException(status_code=400, detail="File must be of type .mp3")

    logging.info(f"Starting transcription for file: {file_name}")
    process = multiprocessing.Process(
        target=transcribe_audio_as_thread, args=(file_name,)
    )

    p = psutil.Process(process.pid)
    p.nice(19)  # 19 is the nicest
    p.ionice(psutil.IOPRIO_CLASS_IDLE)

    process.start()
    logging.info(f"Transcription started for file: {file_name}")
    return {"status": "transcription started"}


# @app.get("/text_chunks/{file_name}")
# async def get_text_chunks(file_name: str, chunk_num: int = 0, chunk_size: int = 30):
#    file_path = os.path.join('./', file_name)
#    if not os.path.exists(file_path):
#        raise HTTPException(status_code=400, detail="file not found")
#
#    with open(file_path, 'r') as file:
#        text = file.read()
#        text_lines = text.splitlines()
#        total_chunks = len(text_lines) // chunk_size + 1
#        start_index = chunk_num * chunk_size
#        end_index = min(start_index + chunk_size, len(text_lines))
#        chunk = '\n'.join(text_lines[start_index:end_index])
#
#    return {"total_chunks": total_chunks, "chunk_num": chunk_num, "chunk": chunk}


@app.get("/text_chunks/{file_name}")
async def get_text_chunks(file_name: str, chunk_num: int = 0, chunk_size: int = 30):
    file_name_decoded = urllib.parse.unquote(file_name)
    file_path = os.path.join("./", file_name_decoded)

    print("file_name: ", file_name)
    print("chunk_num: ", chunk_num)
    print("chunk_size: ", chunk_size)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=400, detail="file not found")
    with open(file_path, "r") as file:
        text = file.read()
        text_lines = text.splitlines()
        total_chunks = len(text_lines) // chunk_size + 1
        start_index = chunk_num * chunk_size
        end_index = min(start_index + chunk_size, len(text_lines))
        chunk = "\n".join(text_lines[start_index:end_index])

    response = {"total_chunks": total_chunks, "chunk_num": chunk_num, "chunk": chunk}
    print(response)

    return response


@app.get("/textfiles/{filename}")
async def read_textfile(filename: str):
    # returns full contents of a file, preserves newlines
    # automatically looks for files in current dir
    try:
        with open(filename, "r") as file:
            content = file.read()
        return {"file_contents": content}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")


@app.post("/split")
async def split_file(payload: dict):
    # function receives name of the file and splits it into smaller files
    # each containing max n lines
    # this limits chunk size so GPT can translate it properly
    filename = payload.get("filename")
    num_lines = 5  # split into files per 30 lines

    try:
        with open(filename, "r") as file:
            lines = file.readlines()
            for i in range(0, len(lines), num_lines):
                with open("output_" + str(i // num_lines) + ".txt", "w") as outfile:
                    outfile.writelines(lines[i : i + num_lines])
        return {"status": "Splitting job started."}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))


# @app.post("/process_split_files")
# async def process_files(payload: dict):
#    filename = payload.get("filename")
#    #call like
#    #curl -X POST http://localhost:8000/process_files -H "Content-Type: application/json" -d '{"filename": "output.txt"}'
#
#    #We send post payload as 'output.txt' (more like 'somejapanesestring.mp3.txt')
#    #we will recognize that we want to process all related split files
#    #At this point we have multiple files output_0.txt, output_1.txt, output_2.txt, ...
#    #that we want to translate with chat GPT, each original text file will have related translation file
#    try:
#        prefix, suffix = filename.split('.')
#        for file in os.listdir():
#            if file.startswith(prefix) and file.endswith(suffix):
#                os.system(f"python3 app_openai_api.py {file} translation_{file}")
#        return {"status": "Processing job started."}
#    except Exception as e:
#        print(e)
#        raise HTTPException(status_code=400, detail=str(e))


@app.post("/process_split_files")
async def process_files(payload: dict):
    # How to get around token limits
    # https://blog.devgenius.io/how-to-get-around-openai-gpt-3-token-limits-b11583691b32

    # call like
    # curl -X POST http://localhost:8000/process_files -H "Content-Type: application/json" -d '{"filename": "output.txt", "worktype": "translation"}'

    # We send post payload as 'output.txt' (more like 'somejapanesestring.mp3.txt')
    # we will recognize that we want to process all related split files
    # At this point we have multiple files output_0.txt, output_1.txt, output_2.txt, ...
    # that we want to translate with chat GPT, each original text file will have related translation file

    # This way, the processing of the files will happen asynchronously in the background,
    # and the API call will return immediately with the response "Processing job started."
    # without waiting for the processing to complete.
    # Ok, now I understand, so we needed to define additional asynchronous functions.
    # Yes, that's correct. To make sure that the API returns the response immediately,
    # you need to run the processing of the files in an asynchronous manner.
    # The added process_file function allows for that.



    async def process_file(file, worktype):
        os.system(f"python3 app_openai_api.py {worktype} {file} {worktype}_{file}")

    async def join_files(prefix, suffix, worktype):
        await asyncio.gather(*tasks)
        with open(f"{worktype}_{prefix}.{suffix}", "w") as outfile:
            # we need to join the files in sequence
            for file in sorted(os.listdir()):
                if file.startswith(f"translation_{prefix}"):
                    with open(file, "r") as infile:
                        outfile.write(infile.read())

    filename = payload.get("filename")
    worktype = payload.get("worktype") # translation, summary, vocabulary, grammar


    try:
        prefix, suffix = filename.split(".")
        tasks = []
        for file in sorted(os.listdir()):
            if file.startswith(prefix) and file.endswith(suffix):
                print(f"Processing file: {file}")
                task = asyncio.create_task(process_file(file, worktype))
                tasks.append(task)
                asyncio.create_task(join_files(prefix, suffix, worktype))
        return {"status": "Processing job started."}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))
