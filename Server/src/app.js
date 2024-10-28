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
import categoriesRouter from "./routers/category.router.js"
import emailRouter from "./routers/email.router.js"
import paymentRouter from "./routers/payment.router.js";
import bookingRouter from "./routers/bookPackage.router.js";

//routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoriesRouter);
app.use("/api/v1",emailRouter);
app.use("/api/v1",paymentRouter);
app.use("/api/v1", bookingRouter);
export default app;