import axios from "axios";

export const tls = async (data) => {
  const responce = await axios.post("http://localhost:3000/sms", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return responce.data;
};
