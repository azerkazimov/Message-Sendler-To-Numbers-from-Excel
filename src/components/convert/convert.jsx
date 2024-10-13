import { useState } from "react";
// import { sendSMS } from "../../service/api";

import { ConvertTable } from "@/components";

import { useTableStore } from "@/store";
import { sheetConvertToJson } from "@/utils";
import { sendTextMessage } from "@/service/textlinksms";

export const Convert = () => {
  const { setTableData } = useTableStore();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSheetFileUpload = async () => {
    const datas = await sheetConvertToJson(selectedFile);
    setTableData(datas);

    // // NOTE: for sending SMS uncomment next line
    // // sendSmsMessages(datas);

    const phoneNumbers = datas.map((item) => item.Telefon);
    const message = "Welcome to our SIGORTA!";
    sendTextMessage(phoneNumbers, message);
  };

  // const sendWhatsAppMessages = (data) => {
  //   // Extract phone numbers from the data
  //   const phoneNumbers = data.map((item) => item.Telefon);

  //   // Send welcome message to each phone number
  //   phoneNumbers.map((phoneNumber) => {
  //     const message = "Welcome to our SIGORTA!";

  //     axios
  //       .post("http://localhost:5000/send-whatsapp", {
  //         phoneNumber,
  //         message,
  //       })
  //       .then(() => {
  //         console.log(`Message sent to ${phoneNumber}`);
  //       })
  //       .catch((error) => {
  //         console.error(`Failed to send message to ${phoneNumber}:`, error);
  //       });
  //   });
  // };

  // const sendSmsMessages = (data) => {
  //   const phoneNumbers = data.map((item) => item.Telefon);
  //   const message = "Welcome to our SIGORTA!";

  //   sendSMS(phoneNumbers, message); // Используем функцию из service/api.js
  // };

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-center text-2xl mb-12 font-bold text-[#d79921]">
        Convert Excel for Message
      </h3>

      <div className="flex flex-row px-8 gap-12 items-center justify-center mb-20">
        <div>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg h-[50px] cursor-pointer"
            type="file"
            onChange={handleFileChange}
            accept=".xls,.xlsx"
          />
        </div>
        <div>
          <button
            className="border border-gray-300 px-4 py-2 rounded-lg bg-[#d79921] h-[50px] hover:transition-all duration-500 hover:bg-[#d79921]/80 text-[#121212]"
            onClick={onSheetFileUpload}
          >
            Convert & Send WhatsApp Message
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1400px]">
        <ConvertTable />
      </div>
    </div>
  );
};
