const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/MongoDB_noteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connection successfully to database");
    })
}

module.exports = connectToMongo;