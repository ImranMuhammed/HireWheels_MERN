const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser')
const mongoSanitize=require('express-mongo-sanitize');
const MongoDB=require('./db/mongo')
const config=require('./config/config')

const routes=require('./routes/routes.js')

const app=express();

const PORT=config.server.port;


MongoDB.connectDB().then((success)=>{
    app.listen(PORT,()=>{
        console.log("Server started at PORT:"+PORT)
    })
}).catch((error)=>{
    console.log(error)
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(mongoSanitize()); 

app.use('/',routes);

