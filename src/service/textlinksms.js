// import textlink from "textlink-sms";
// const apiKey =
//   "Ahft5dbagupzDfdRI02fDkLIGd8R3jPq3YsgyLi1vBM2MXOMM7cB6GggAeml8gXB";
// textlink.useKey(apiKey);

// export const sendTextMessage = async (phoneNumbers, message) => {
//   const results = await Promise.allSettled(
//     phoneNumbers.map(async (phoneNumber) => {
//       const formatedNumber = phoneNumber.toString().startWith("+")
//         ? phoneNumber.toString()
//         : `+${phoneNumber}`;

//       try {
//         const response = await textlink.sendSMS({
//           phone: formatedNumber,
//           message,
//         });
//         console.log(`Message sent to ${formatedNumber}`, response);
//         return { status: "fulfilled", phoneNumber: formatedNumber };
//       } catch (error) {
//         console.error(
//           `Failed to sent SMS to ${formatedNumber}`,
//           error.response || error
//         );
//         return {
//           status: "rejected",
//           phoneNumber: formatedNumber,
//           error: error,
//         };
//       }
//     })
//   );
//   const successful = results.filter((r) => r.status === "fulfilled").length;
//   const failed = results.filter((r) => r.status === "rejected").length;

//   console.log(
//     `SMS sending complete. Successful: ${successful}, Failed: ${failed}`
//   );
//   return { successful, failed, results };
// };


import { instance } from "./instance";

export const sendTextMessage = async (phoneNumbers, message) => {
  const sendSMS = async (phoneNumber) => {
    try {
      const responce = await instance.post("/send-sms", {
        phone_number: phoneNumber,
        text: message,
      });
      console.log(`Message send to ${phoneNumber}`, responce.data);
      return { status: "fulfilled", phoneNumber };
    } catch (error) {
      console.error(
        `Failed to send SMS to ${phoneNumber}`,
        error.message || error
      );
      return { status: "rejected", phoneNumber, error };
    }
  };

  const results = await Promise.allSettled(phoneNumbers.map(sendSMS));

  const successful = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  console.log(
    `SMS sending complete. Successful: ${successful}, Failed: ${failed}`
  );
  return { successful, failed, results };
};