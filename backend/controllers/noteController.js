const asynHandler = require ('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

//@desc     get note for ticket
//@route    get /api/tickets/:ticketId/notes  
//@access   private
const getNotes = asynHandler(async (req, res) => {
    //get user using id in jwt
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const ticketId = req.params.ticketId;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
    }

    const notes = await Note.find({ ticket: req.params.ticketId })
    res.status(200).json(notes)
})

//@desc     create ticket note
//@route    post /api/tickets/:ticketId/notes  
//@access   private
const createNote = asynHandler(async (req, res) => {
    //get user using id in jwt
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    const note = await Note.create({ 
        text: req.body.text, 
        isStaff: false, 
        ticket: req.params.ticketId, 
        user: req.user.id 
    })
    res.status(200).json(note)
})  

module.exports = {
    getNotes,
    createNote,
}