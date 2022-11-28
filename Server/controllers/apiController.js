const Event = require('../models/event');
const session = require('express-session');
const User = require('../models/user');
const Group = require('../models/group');
const mongoose = require('mongoose')

exports.index = (req,res)=>{
    let userId = req.session.user;
    if(userId){
        User.findById(userId).populate('appointments')
        .then(user=>{
            console.log(user)
            console.log(appointments)
            let events = user.appointments;
            res.send(events)
        })
    } else {
        Event.find()
        .then(events=>{
            res.send(events);
        })
        .catch(err=>next(err))
    }    
};

exports.newEvent = (req,res)=>{
    let event = new Event(req.body);
    event.save();
    res.status = 200;
    res.send();
};

exports.getUser = (req,res)=>{
    if(req.session.user){
        res.status(200)
        res.send()
    } else {
        res.status(206)
        res.send()
    }
};

exports.newUser = (req,res)=>{
    let user = new User(req.body);
    user.save()
    .then(()=>{
        res.status(200).send()
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            res.status(400).send()
        }

        if(err.code === 11000){
            res.status(400).send()
        }
        next(err)
    })
};

exports.login = (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({email: email})
    .then(user=>{
        if(user){
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id;
                    res.status(200).send()
                }else{
                    res.status(400).send()
                }
            })
        } else {
            res.status(400).send()
        }
    })
    .catch(err=>next(err));
};

exports.logout = (req,res)=>{
    req.session.destroy(err=>{
        if(err){            
            res.status(400).send()
        }            
        else{
            console.log("deleted")
            res.status(200).send()
        }            
    })
}

exports.newGroup = (req,res)=>{
    let group = new Group();
    group.groupName = req.body.groupName;
    group.description = req.body.description;
    group.author = req.session.user;
    let emails = req.body.emails; //get emails from response
    emails = emails.replace(/\s/g, ''); //remove spaces
    const emailArray = emails.split(',') //split emails at each ,
    let ids = [];
    let success = [];
    User.find().where('email').in(emailArray) //find users in email array
    .then(users=>{
        users.forEach(user => {
            ids.push(user._id);
            success.push(user.email);
        });
        let failed = emailArray.filter(x => !success.includes(x));
         if(failed.length > 0){
             res.status(400).send("There was an error adding some users")
         } else {
             group.invited = ids;
            User.updateMany(
                { _id: { $in: ids } },
                { $push: {groups: group._id} },
                {multi: true}
            ).then(()=>{
                group.save()
                res.status(200).send()
            }).catch()
         }
     })
     .catch(err=>next(err));
}

exports.groupsAdmin = (req,res, next)=>{
    let userId = req.session.user;
    let userIdObj = mongoose.Types.ObjectId(userId)
    let adminGroups = [];
    if(userId){
        Group.find({ invited: { "$in" : [userIdObj]}}).where('author').equals(userIdObj)
        .then(groups=>{
            res.send(groups);
        })
        .catch(err=>next(err))
    } else {
        res.status(400).send();
    }
}