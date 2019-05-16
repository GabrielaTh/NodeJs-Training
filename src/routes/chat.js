const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');
const Message = require('../models/Messages');

router.get('/users/chat', isAuthenticated, (req, res) => {
    res.redirect('/users/chat/messages');

});


router.post('/users/chat/message', isAuthenticated, async(req, res) => {
   const {message} = req.body;
   const errors = [];

   if(!message){
       errors.push({text:'Please enter a message'})
   } else {
    const newMessage = new Message({message});
    newMessage.user = req.user.name;
    await newMessage.save();
    res.redirect('/users/chat/messages');
   }
});


router.get('/users/chat/messages', isAuthenticated, async(req, res) => {
    const messages = await Message.find({}, (err, messages) => {
        res.render('users/chat', {messages});
    });
});



module.exports = router;