import path from "path";
import express from "express";
import createError from "http-errors";
import connectLiveReload from "connect-livereload";
import morgan from "morgan";

import rootRoutes from "./routes/root";
import { setUpDevelopmentEnvironment } from "./utilities/set-up-development-environment";

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
  setUpDevelopmentEnvironment();
  connectLiveReload();
}

app.use(morgan("dev"));

app.set("views", path.join("backend", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join("backend", "static")));

app.use("/", rootRoutes);

app.use((_request, _response, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
