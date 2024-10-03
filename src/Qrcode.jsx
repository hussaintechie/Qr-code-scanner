import { useState } from "react";

export const Qrcode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrdata] = useState("www.linkedin.com/in/rajhussain12");
  const [size, setSize] = useState("150");

  async function generateqr() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    } catch (error) {
      console.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }
  function download(){
    fetch(img)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Qrcode.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.error("Something went wrong. Please try again later."));
}
  

  return (
    <div className="appcontainer">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} className="image" alt="QR Code" />}
      <div>
        <label htmlFor="datainput" className="data">Data for Qrcode:</label>
        <input
          type="text"
          id="text"
          value={qrdata}
          placeholder="Enter data for Qr code"
          onChange={(e) => setQrdata(e.target.value)}
        />
        <label htmlFor="sizeinput" className="data">Image size (e.g., 150):</label>
        <input
          type="text"
          id="text1"
          value={size}
          placeholder="Enter image size"
          onChange={(e) => setSize(e.target.value)}
        />
        <button className="generate" disabled={loading} onClick={generateqr} >Generate Qr code</button>
        <button className="download" onClick={ download}>Download Qr code</button>
        <p className="footer">Developed by Hussain</p>
      </div>
    </div>
  );
};
