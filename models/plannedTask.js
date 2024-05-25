import mongoose from 'mongoose';
import Task from './task.js';

const Schema = mongoose.Schema;

const plannedTaskSchema = new Schema({
    realizationDate: {
        type: Date,
        required: true,
    },
});

const PlannedTask = Task.discriminator('planned', plannedTaskSchema);

export default PlannedTask;
