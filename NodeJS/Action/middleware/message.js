const express = require('express');

function message(req) {
    return (msg, type) => {
        type = type || 'info';
        let sess = req.session;
        sess.messages = sess.messages || [];
        sess.messages.push({type: type, string: msg});
    }
}

// to add session support 
// const session = require('express-session)
// app.use(session({
//    secret: 'secret',
//    resave: false, saveUnitialized: true
//    }))

// To add session info to all the page

// module.exports = (req, res, next) => {
//     req.message = message(req);
//     res.error = (msg) => {
//         return res.message(msg, 'error');
//     }
//     res.locals.messages = req.session.messages || [];
//     res.locals.removeMessages = () => {
//         req.session.messages = [];
//     };
//     next();
// };

