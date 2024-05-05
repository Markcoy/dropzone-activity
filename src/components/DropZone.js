import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaRegImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DropZone() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onDrop = (acceptedFiles) => {
    // Check if the uploaded file is an image type
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      // Notify user if no image is uploaded
      toast.error("Not an image file!");
      return;
    }

    // Process uploaded image files and update state
    const newImages = imageFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages([...uploadedImages, ...newImages]);

    // Show success toast
    toast.success("Image uploaded successfully!");
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDownload = (url) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "image.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const openModal = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="py-5 text-white bg-[@232325] h-auto flex justify-center">
      <div className="card-form bg-neutral-700 px-5 py-5 rounded-lg border  w-[1200px]  border-gray-900">
        <div className="flex justify-center items-center h-200px mt-10">
          <div className="flex justify-center items-center h-[250px] w-[400px] border border-dashed rounded-md border-white">
            <div
              {...getRootProps()}
              className="flex flex-col justify-center items-center p-5"
            >
              <input {...getInputProps()} />
              <FaRegImage size={150} className="text-white mb-1" />
              <button className="bg-gray-200 hover:opacity-80 p-2 rounded-md text-gray-800 text-sm">
                Upload Image
              </button>
              <h3 className="text-gray-400 mb-4">or Drag & Drop</h3>
            </div>
          </div>
        </div>
        <div className="">
          <div className="mt-8 flex items-center justify-center mb-10 ">
            <span className="text-xl text-green-500">Uploaded Images</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 mt-5 sm:grid-cols-2">
          {uploadedImages.map((image, index) => (
            <div key={index} className="flex flex-col items-center pr-10 pl-10">
              <img
                src={image.url}
                alt={image.name}
                className="max-w-[200px] max-h-[200px] h-auto mb-4 hover:opacity-80 rounded-md  cursor-pointer"
                onClick={() => openModal(image.url)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-10"
                onClick={() => handleDownload(image.url)}
              >
                Download
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed top-0 left-0 z-auto w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white p-4 max-w-3xl relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-[400px] max-h-[400px]"
              />
              <button
                className="absolute top-2 right-3 text-gray-600 hover:text-gray-300"
                onClick={closeModal}
              >
                x
              </button>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default DropZone;
