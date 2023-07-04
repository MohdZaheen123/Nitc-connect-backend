const mongoose = require('mongoose')
async function dbconnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
}
module.exports = dbconnection