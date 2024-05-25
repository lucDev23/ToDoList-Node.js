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
        creationDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        finishDate: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { discriminatorKey: 'type' }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
