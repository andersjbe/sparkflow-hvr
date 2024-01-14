import { Hono } from "hono";
import auth from "./auth";

// Always register routes in an index.ts file.
// Must use chaining syntax, otherwise `hc` will lose types.
const api = new Hono().route("/", auth);

export default api;
