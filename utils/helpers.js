'use strict';

import moment from 'moment';
import Task from '../models/task.js';

export async function getTasks(findCondition) {
    return (await Task.find(findCondition)).map((task) => ({
        name: task.name,
        completionDate: task.completionDate,
        createdAt: moment.utc(task.createdAt).format('DD/M/YYYY'),
    }));
}
