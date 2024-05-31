'use strict';

import moment from 'moment';
import Task from '../models/task.js';

export async function getTasks(findCondition) {
    return (await Task.find(findCondition)).map((task) => ({
        _id: task._id,
        name: task.name,
        priority: task.priority,
        category: task.category,
        status: task.status,
        dueToDate: task.dueToDate || 'not specified',
    }));
}
