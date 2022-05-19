import { create } from "./index";

const baseURL = "";

const { instance: request, interceptors } = create({ baseURL });

export { request, interceptors };
