import express, { Application } from "express";
import cros from "cors";
import mount from "./routes";
// import { pasrseToken } from "./middleWare/pasrseToken";

const app: Application = express();

app.use(cros({ optionsSuccessStatus: 200 }));
app.use(express.json());

// validate token and assign its property to req.body.token {}
// app.use(pasrseToken);
// set routes
mount(app);

export default app;
