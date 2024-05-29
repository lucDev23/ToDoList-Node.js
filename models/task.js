import moment from 'moment';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
            enum: ['high', 'medium', 'low'],
            default: 'low',
        },
        category: {
            type: String,
            required: true,
            enum: ['general', 'work', 'personal', 'study', 'health'],
            default: 'general',
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'finished', 'expired'],
            default: 'pending',
        },
        dueToDate: Date,
        type: {
            type: String,
            required: true,
            enum: ['normal', 'planned'],
            default: 'normal',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
