const Event = require('../models/event');
const session = require('express-session');

exports.index = (req,res)=>{
    Event.find()
    .then(events=>{
        res.send(events);
    })
    .catch(err=>next(err))
}

exports.newEvent = (req,res)=>{
    let event = new Event(req.body);
    event.save();
    res.status = 200;
    res.send();
}

exports.getUser = (req,res)=>{
    console.log(req.session.user)
    if(req.session.user){
        res.status(200)
        res.send()
    } else {
        res.status(206)
        res.send()
    }
}