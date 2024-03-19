import path from "path";
import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import rootRoutes from "./routes/root";
import testRoutes from "./routes/test";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.set("views", path.join("backend", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join("backend", "static")));

app.use("/", rootRoutes);
app.use("/tests", testRoutes);

app.use((_request, _response, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
