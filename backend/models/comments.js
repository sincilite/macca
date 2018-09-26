import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    name: String,
    squad_number: Number,
}, {timestamps: false});

export default mongoose.model('Comment', CommentsSchema);