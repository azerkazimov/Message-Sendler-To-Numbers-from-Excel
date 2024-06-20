// src/Convert/index.jsx
import { useState } from "react";
import { read, utils } from "xlsx";
import axios from "axios";
import "./style.scss";

function Convert() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleConvert = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event) => {
        const data = event.target.result;
        const workbook = read(data, { type: "binary" });
        const allSheetsData = [];

        workbook.SheetNames.forEach((sheet) => {
          const rowObject = utils.sheet_to_json(workbook.Sheets[sheet]);
          allSheetsData.push(...rowObject);
        });
        setJsonData(allSheetsData);

        // Send WhatsApp messages
        sendWhatsAppMessages(allSheetsData);
      };
    }
  };

  const sendWhatsAppMessages = (data) => {
    // Extract phone numbers from the data
    const phoneNumbers = data.map((item) => item.Telefon);

    // Send welcome message to each phone number
    phoneNumbers.forEach((phoneNumber) => {
      const message = "Welcome to our service!";

      axios
        .post("http://localhost:5174/send-whatsapp", {
          phoneNumber,
          message,
        })
        .then((response) => {
          console.log(`Message sent to ${phoneNumber}`);
        })
        .catch((error) => {
          console.error(`Failed to send message to ${phoneNumber}:`, error);
        });
    });
  };

  const getTableHeaders = () => {
    if (jsonData.length > 0) {
      return Object.keys(jsonData[0]).map((key) => <th key={key}>{key}</th>);
    }
    return null;
  };

  const getTableRows = () => {
    return jsonData.map((item, index) => (
      <tr key={index}>
        {Object.values(item).map((value, i) => (
          <td key={i}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <h3 className="text-center">Convert Excel for Message</h3>
        <div className="col-md-3"></div>
        <div className="col-md-4">
          <input
            className="form-control"
            type="file"
            onChange={handleFileChange}
            accept=".xls,.xlsx"
          />
        </div>
        <div className="col-md-2">
          <button className="btn" onClick={handleConvert}>
            Convert & Send WhatsApp Message
          </button>
        </div>
        <div className="col-md-12">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>{getTableHeaders()}</tr>
            </thead>
            <tbody>{getTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Convert;
