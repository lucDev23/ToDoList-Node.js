import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        finished: {
            type: Boolean,
            required: true,
            default: false,
        },
        finishDate: Date,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['normal', 'planned'],
            default: 'normal',
        },
    },
    { discriminatorKey: 'type', timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
