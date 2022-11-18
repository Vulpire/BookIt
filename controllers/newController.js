const newM = require('../models/new');
const Appointment = require('../models/appointment');

exports.index = (req, res, next)=>{
    user = req.session.user;
    res.render('./new/AddAppointment', {user});
};

exports.new = (req, res, next)=>{
    let appointment = new Appointment(req.body);
    appointment.author = req.session.user;
    appointment.save()
    .then(res.redirect('/'))
    .catch(err=>next(err));
};

exports.id = (req, res, next)=>{
    let id = req.params.id;
    Appointment.findById(id)
    .then(appointment=>{
        if(appointment){
            user = req.session.user;
            console.log(appointment);
            return res.render('./view', {appointment, user});
        } else {
            let err = new Error('Cannot find a appointment with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
};
