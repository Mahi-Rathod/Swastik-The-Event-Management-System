import dotenv from 'dotenv';
import connectDB from './db/index.js'
import app from './app.js'

dotenv.config({
    path:'./env'
});

connectDB()
.then(()=>{
    const port = process.env.PORT || 3000;
    app.listen(port, ()=>{
        console.log(`Server is Runnig at Port => ${port} !!!`);
    })
})
.catch((error)=>{
    console.log("Problem in MongoDB Connection !!!", error);
})