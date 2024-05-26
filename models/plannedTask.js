import mongoose from 'mongoose';
import Task from './task.js';

const Schema = mongoose.Schema;

const plannedTaskSchema = new Schema({
    completionDate: {
        type: Date,
        required: true,
    },
});

const PlannedTask = Task.discriminator('planned', plannedTaskSchema);

export default PlannedTask;
