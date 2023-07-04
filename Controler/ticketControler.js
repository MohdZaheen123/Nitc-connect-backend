
const ticketModel = require('../database/Models/ticketModel')



async function getuserticket(req, res) {

    try {
        const user = req.params.user
        const data = await ticketModel.find({ createdby: user })
        if (data.length != 0) {
            res.json(data)
        }
        else {
            res.json([])
        }
    } catch (error) {
        res.json(error.message)
    }
}


async function getAllTickets(req, res) {
    try {
        const page = req.query.page;
        if (page) {
            const limit = 10;
            const skip = (page - 1) * limit;
            const count = await ticketModel.countDocuments();

            const data = await ticketModel.find().sort({ _id: -1 }).skip(skip).limit(limit);

            if (data.length > 0) {
                res.json({
                    message: "Data retrieved successfully",
                    data: data,
                    currentPage: page,
                    totalPages: Math.ceil(count / limit),
                    count: count
                });
            } else {
                res.json({
                    message: "Data not found",
                    count: count
                });
            }
        } else {
            const count = await ticketModel.countDocuments();
            const data = await ticketModel.find().sort({ _id: -1 })
            if (data.length > 0) {
                res.json({
                    message: "Data retrieved successfully",
                    data: data,
                    count: count
                });
            } else {
                res.json({
                    message: "Data not found",
                    count: count
                });
            }
        }

    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
}


async function createTicket(req, res) {
    try {
        let data = await req.body
        console.log(data)
        const newTicket = await new ticketModel(data)
        await newTicket.save()
        res.json(newTicket)
    } catch (error) {
        console.log(error)
    }
}



async function deleteTicket(req, res) {
    let id = req.params.id
    let data = await ticketModel.findById(id)
    if (data) {
        await ticketModel.findByIdAndDelete(id)
        res.json({ message: "Item deleted succesfully" })
    }
    else {
        res.json('No item found')
    }
}




async function getTicket(req, res) {
    const id = req.params.id
    const ticket = await ticketModel.findById(id)
    if (ticket) {
        res.json(ticket)
    }
    else {
        res.json("No ticket found")
    }
}




module.exports = { getAllTickets, createTicket, deleteTicket, getTicket, getuserticket }