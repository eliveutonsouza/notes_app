import mongoose from 'mongoose';

import IPost from '../../contracts/Post';
const { Schema } = mongoose;

const postSchema = new Schema<IPost>({
    description: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export = mongoose.model('Post', postSchema);
