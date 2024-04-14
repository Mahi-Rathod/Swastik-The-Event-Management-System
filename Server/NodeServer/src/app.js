import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
    exposedHeaders: ['Content-Length', 'Authorization', 'Set-Cookie'],  
}));

app.use(express.json({
    limit:'16kb',
}));

app.use(express.urlencoded({
    extended:true,
    limit:'16kb',
}));

app.use(express.static("public"));

app.use(cookieParser());


//import routes

import userRouter from "./routers/user.router.js";
import productRouter from "./routers/product.router.js"

//routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);

export default app;