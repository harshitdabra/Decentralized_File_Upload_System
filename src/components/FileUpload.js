import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";


const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("not selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `e84124e00d8e357bea76`,
            pinata_secret_api_key: `6b1485df1d7be8340e847080d1c7d1733d3f544af6cff348c0efc62b7f83b089`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account,ImgHash);

        alert("Image Uploaded");
        setFileName("No image selected");
        setFile(null);

      } catch (e) {
        alert("Unable to upload image.");
      }
    }
    alert("Image Uploaded");
    setFileName("No image selected ");
    setFile(null);
  };



  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose a file 
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload file
        </button>
      </form>
    </div>
  );
};
export default FileUpload;
