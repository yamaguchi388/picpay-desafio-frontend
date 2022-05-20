import { create } from "./index";

const baseURL = process.env.API_URL;

const { instance: request, interceptors } = create({ baseURL });

export { request, interceptors };
