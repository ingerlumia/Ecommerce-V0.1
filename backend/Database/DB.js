import mongoose from "mongoose";

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('Database Connected!!!');
    } catch (error) {
        console.log(error)
    }
};






export default connectdb;