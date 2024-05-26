import moment from 'moment';
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
        completionDate: {
            type: String,
            default: moment().format('DD/M/YYYY'),
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        important: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            required: true,
            enum: ['normal', 'planned'],
            default: 'normal',
        },
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
