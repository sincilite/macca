import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    name: String,
    squad_number: Number,
}, {timestamps: false, collection: 'players'});

export default mongoose.model('Comment', CommentsSchema);