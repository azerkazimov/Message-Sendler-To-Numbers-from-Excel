import axios from "axios";

const API_KEY =
  "Ahft5dbagupzDfdRI02fDkLIGd8R3jPq3YsgyLi1vBM2MXOMM7cB6GggAeml8gXB";

export const instance = axios.create({
  baseURL: "https://textlinksms.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});
