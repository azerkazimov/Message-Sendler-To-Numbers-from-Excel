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
