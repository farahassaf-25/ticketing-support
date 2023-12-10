const asynHandler = require ('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//@desc     get user tickets
//@route    get /api/tickets
//@access   private
const getTickets = asynHandler(async (req, res) => {
    //get user using id in jwt
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

//@desc     get user single ticket
//@route    get /api/tickets/:id
//@access   private
const getTicket = asynHandler(async (req, res) => {
    //get user using id in jwt
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket) {
        res.status(400)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('not authorized')  
    }

    res.status(200).json(ticket)
})

//@desc     create new tickets
//@route    post /api/tickets
//@access   private
const createTicket = asynHandler(async (req, res) => {
    const {product, description} = req.body
    if(!product || !description) {
        res.status(400)
        throw new Error('Please add a product and a description')
    }
    //get user
    const user = await User.findById(req.user.id)
    if(!user) {
        req.status(400)
        throw new Error('user not found')
    }
    //create ticket
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

//@desc     delete ticket
//@route    delete /api/tickets/:id
//@access   private
const deleteTicket = asynHandler(async (req, res) => {
    // get user using id in jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    // find and delete the ticket
    const ticketId = req.params.id;
    const deletedTicket = await Ticket.findOneAndDelete({ _id: ticketId, user: req.user.id });

    if (!deletedTicket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    res.status(200).json({ success: true });
});

//@desc     update ticket
//@route    put /api/tickets/:id
//@access   private
const updateTicket = asynHandler(async (req, res) => {
    //get user using id in jwt
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket) {
        res.status(400)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('not authorized')  
    }

    const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updateTicket)
})

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket,
}