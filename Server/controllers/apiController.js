const Event = require('../models/event');

exports.index = (req,res)=>{
    Event.find()
    .then(events=>{
        console.log(events);
        res.send(events);
    })
    .catch(err=>next(err))
}