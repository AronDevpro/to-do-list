import mongoose from "mongoose";

// database connection
export const mongoDB = () => {
    const uri = 'mongodb://localhost:27017/to-do-list'
    mongoose.connect(uri)
        .then(() => {
            console.log("MongoDb database is connected!");
        })
        .catch((error) => {
            console.log(error);
        });
}