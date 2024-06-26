import axios from "axios";

const app = axios.create({ baseURL: "http://localhost:4055" });
export default app;
