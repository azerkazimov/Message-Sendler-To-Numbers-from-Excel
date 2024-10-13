import axios from "axios";

const API_KEY =
  "Z48bvkmdL9I9sjXwVMaqMKox2doalHQmEGwwpJybpjOv2UeEPcTHnn3DLeGgCMOd";

export const instance = axios.create({
  baseURL: "https://textlinksms.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});
