import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    name: String
})

const HomeModel = mongoose.model('Home', homeSchema);

export default HomeModel;