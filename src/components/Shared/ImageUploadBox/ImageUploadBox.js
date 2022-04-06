import React, { useState, useEffect, useRef } from "react";
import "./style.css";

function removeItems(arr, item) {
  for (var i = 0; i < item; i++) {
    arr.pop();
  }
}

function useFiles({ initialState = [], maxFiles }) {
  const [state, setstate] = useState(initialState);
  function withBlobs(files) {
    const destructured = [...files];
    if (destructured.length > maxFiles) {
      const difference = destructured.length - maxFiles;
      removeItems(destructured, difference);
    }
    const blobs = destructured
      .map((file) => {
        if (file.type.includes("image")) {
          console.log("image");
          file.preview = URL.createObjectURL(file);
          return file;
        }
        console.log("not image");
        return null;
      })
      .filter((elem) => elem !== null);

    setstate(blobs);
  }
  return [state, withBlobs];
}

const ImageUploadBox=({ onDrop, maxFiles = 1 })=> {
  const [over, setover] = useState(false);
  const [files, setfiles] = useFiles({ maxFiles });
  const $input = useRef(null);
  useEffect(() => {
    if (onDrop) {
      onDrop(files);
    }
  }, [files]);
  return (
    <>
      {/* <div
        onClick={() => {
          $input.current.click();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.persist();
          setfiles(e.dataTransfer.files);
          setover(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setover(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setover(false);
        }}
        className={over ? "upload-container over" : "upload-container"}
      >
        <h2>Upload files here!</h2>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={$input}
          onChange={(e) => {
            setfiles(e.target.files);
          }}
          multiple={maxFiles > 1}
        />
      </div>
      <div className="blob-container ml-2 text-gray 800">
        <h2>File Previews</h2>
        {files.map((file) => (
          <img key={file.name + "file"} src={file.preview} alt="your file" />
        ))}
      </div> */}

      {/* aaa */}
      <div className="grid grid-cols-2">
        <div className="flex justify-center">
          <div
            onClick={() => {
              $input.current.click();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.persist();
              setfiles(e.dataTransfer.files);
              setover(false);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setover(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setover(false);
            }}
            className="max-w-2xl rounded-lg  bg-white/50 hover:bg-white filter backdrop-blur-sm transition-all"
          >
            <div className="m-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full border-4 border-blue-200 border-dashed  hover:border-[#FB5343] transition-all">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 hover:text-[#FB5343] group-hover:text-[#FB5343]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 hover:text-[#FB5343] group-hover:text-[#FB5343]">
                      Drop a file or Select
                    </p>
                  </div>
                  <input
                    //   style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    ref={$input}
                    onChange={(e) => {
                      setfiles(e.target.files);
                    }}
                    multiple={maxFiles > 1}
                    className="opacity-0"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="blob-container ml-2 text-gray-800 w-[20rem]">
          {files.map((file) => (
            <img key={file.name + "file"} src={file.preview} alt="your file" />
          ))}
        </div>
      </div>
    </>
  );
}

export default ImageUploadBox
