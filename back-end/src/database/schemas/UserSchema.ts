import mongoose from 'mongoose';
import IUser from '../../contracts/IUser';
const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
});

export = mongoose.model('User', userSchema);
