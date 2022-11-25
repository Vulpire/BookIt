const express = require('express');
const apiRoute = require('./routes/apiRoutes');
const app = express();
const mongoose = require('mongoose');


let port = 3001;
let host = 'localhost';
const uri = "mongodb+srv://Vulpire:Kona1281-@cluster0.rzhd7re.mongodb.net/?retryWrites=true&w=majority"
app.set('view engine', 'ejs');

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

app.use('/api/', apiRoute);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));