const mongoose = require('mongoose')



mongoose.set("strictQuery", false);
const db = () => {

    try {
        const URL=process.env.MongoURL
        mongoose.connect(URL);
    
        const connection = mongoose.connection
        
        connection.once('open', () => {
            console.log("DataBase Connected...");
        })
    }
    catch (err)
    {
        console.log("Error in dataBase Connection : ",err);
    }
    
}
module.exports = db;