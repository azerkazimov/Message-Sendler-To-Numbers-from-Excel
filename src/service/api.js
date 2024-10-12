// service/api.js

const apiKey =
  "5faedcaafe6c93613a2c58fc25efe977-f97ed649-b313-4afe-8f8b-50930e1047bc";
const apiUrl = "https://pp3vee.api.infobip.com/sms/2/text/advanced";

export const sendSMS = async (phoneNumbers, message) => {
  const headers = new Headers();
  headers.append("Authorization", `App ${apiKey}`);
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const formattedPhoneNumbers = phoneNumbers.map((phone) => `+${phone}`);
  const raw = JSON.stringify({
    messages: [
      {
        destinations: formattedPhoneNumbers.map((phone) => ({ to: phone })),
        from: "ServiceSMS",
        text: message,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const result = await response.json();
    console.log("SMS отправлено:", result);
  } catch (error) {
    console.error("Ошибка отправки SMS:", error);
  }
};
