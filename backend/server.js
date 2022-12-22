const app = require("./app")

const dotenv = require('dotenv')



// handle uncounght 

process.on('uncaughtException', err=>{
    console.log(`ERORR : ${err.message}`);
    console,log(`shutting down server due to uncaught excption`)
    process.exit(1)
})


const connectDatabse = require('./databse')



dotenv.config({path:'backend/config.env'})

connectDatabse();

const server =    app.listen(process.env.PORT,()=>{
    console.log(`sever is running on ${process.env.PORT} `)
})


// handle unhandle promise rejection

process.on('unhandledRejection',err=>{
    console.log(`error : ${err.message}`)
    console.log("shutting down the server due to unhandle ")
    server.close(()=>{
        process.exit(1)
    })
})