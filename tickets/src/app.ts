import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

require("express-async-errors");

import { errorHandler, NotFoundError } from "@deyzito/commom";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
