import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: String,
    positions: Array,
    total_minutes: Number
}, { timestamps: false, collection: 'players' });

export default mongoose.model('Player', PlayerSchema);