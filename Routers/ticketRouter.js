const express = require('express')
const { getAllTickets, createTicket, deleteTicket, getTicket, getuserticket } = require('../Controler/ticketControler')

const ticketRouter = express.Router()


ticketRouter.get('/alltickets', getAllTickets)
ticketRouter.get('/usertickets/:user', getuserticket)


ticketRouter.post('/createticket', createTicket)
ticketRouter.delete('/deleteticket/:id', deleteTicket)

ticketRouter.get('/:id', getTicket)


module.exports = ticketRouter