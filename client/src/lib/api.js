import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL?.trim();

if (!baseURL) {
  throw new Error("Set VITE_BASE_URL to the deployed API URL.");
}

export default axios.create({
  baseURL: baseURL.replace(/\/+$/, ""),
});
