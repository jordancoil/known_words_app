import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import mediaRoutes from './routes/media';
import collectionsRoutes from './routes/collections';
import subtitleRoutes from './routes/subtitle';
import usersRoutes from './routes/users';
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from 'express-session';
import env from './util/validateEnv'
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 80 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}))

// Routes
app.use("/api/collections", collectionsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/subtitles", subtitleRoutes);
app.use("/api/users", usersRoutes);

// 404 Middleware
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
});

// Error Handler Middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errMsg = "An unknown error occurred";
    let statusCode = 500
    if (isHttpError(error)) {
        errMsg = error.message;
        statusCode = error.status;
    } 
    res.status(statusCode).json({ error: errMsg });
});

export default app;