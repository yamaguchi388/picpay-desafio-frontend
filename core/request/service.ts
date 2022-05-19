import { create } from "./index";

const baseURL = "http://localhost:3004";

const { instance: request, interceptors } = create({ baseURL });

export { request, interceptors };
