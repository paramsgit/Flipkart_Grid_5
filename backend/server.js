const app=require("./app");
const dotenv = require("dotenv").config({path:"backend/config/config.env"});
const cloudinary=require("cloudinary");
cloudinary.config({ 
    cloud_name: 'dcbyjkq82', 
    api_key: '352722554315285', 
    api_secret: 'gYoSOtFJ3TZmfF6ypf_bqPLkDFs' 
  });
const connectDatabase = require("./config/database");
connectDatabase();
//Jaise console.log(youtube) likh diya to error aayega ki youtube is not defined. to this is known as uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled server Rejection");
    process.exit(1);
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled server Rejection");
    server.close(()=>{
        process.exit(1);
    })
})
