const express = require('express');
const apiRoute = require('./routes/apiRoutes');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

let port = 3001;
let host = 'localhost';
const uri = "mongodb+srv://Vulpire:Kona1281-@cluster0.rzhd7re.mongodb.net/?retryWrites=true&w=majority"
app.set('view engine', 'ejs');

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    //app.use(cors(corsOptions));
})
.catch(err=>console.log(err.message));

app.use('/api/', apiRoute);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));