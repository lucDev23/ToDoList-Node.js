'use strict';

import moment from 'moment';
import Task from '../models/task.js';
import PlannedTask from '../models/plannedTask.js';

export const getAddTask = async (req, res, next) => {
    res.render('user/index', {
        pageTitle: 'ToDo | Add task',
        menuOption: 'addTask',
    });
};

export const postAddTask = async (req, res, next) => {
    const name = req.body.taskName;
    const completionDate = req.body.completionDate;
    let task;

    if (!completionDate || completionDate === new Date()) {
        task = new Task({
            name: name,
            userId: req.user._id,
        });
    } else {
        task = new PlannedTask({
            name: name,
            userId: req.user._id,
            type: 'planned',
            completionDate: completionDate,
        });
    }

    console.log(task);
    try {
        await task.save();
        res.redirect('/user/add-task');
    } catch (error) {
        console.log(error);
    }
};

export const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = (await Task.find()).map((task) => ({
            name: task.name,
            completionDate: moment.utc(task.completionDate).format('DD/M/YYYY'),
            createdAt: moment.utc(task.createdAt).format('DD/M/YYYY'),
        }));

        res.render('user/tasksList', {
            pageTitle: 'ToDo | Tasks list',
            allTasks: allTasks,
            menuOption: 'tasksList',
        });
    } catch (error) {
        console.log('l44 user.js: ', error);
    }
};

export const logout = (req, res, next) => {
    res.redirect('/');
};
