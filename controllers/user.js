'use strict';

import moment from 'moment';
import Task from '../models/task.js';
import * as helpers from '../utils/helpers.js';

export const getAddTask = async (req, res, next) => {
    res.render('user/index', {
        pageTitle: 'ToDo | Add task',
        menuOption: 'addTask',
    });
};

export const postAddTask = async (req, res, next) => {
    const name = req.body.task_name;
    const priority = req.body.task_priority;
    const category = req.body.task_category;
    const type = req.body.task_due_to ? 'planned' : 'normal';
    let dueToDate = req.body.task_due_to;
    console.log(name, priority, category, dueToDate);

    const task = new Task({
        name: name,
        priority: priority,
        category: category,
        dueToDate: dueToDate,
        userId: req.user._id,
        type: type,
    });

    try {
        await task.save();
        res.redirect('/user/add-task');
    } catch (error) {
        console.log(error);
    }
};

export const getDayTasks = async (req, res, next) => {
    try {
        const dayTasks = await helpers.getTasks({
            completionDate: moment().format('DD/M/YYYY'),
        });

        res.render('user/myDay', {
            pageTitle: 'ToDo | My day',
            menuOption: 'myDay',
            todayDate: moment().format('dddd, MMMM DD'),
            allTasks: dayTasks,
        });
    } catch (error) {
        console.log('l46 user.js, ', error);
    }
};

export const getImportantTasks = async (req, res, next) => {
    try {
        const importantTasks = await helpers.getTasks({ important: true });

        res.render('user/important', {
            pageTitle: 'ToDo | Important Tasks',
            menuOption: 'important',
            allTasks: importantTasks,
        });
    } catch (error) {
        console.log('l46 user.js, ', error);
    }
};

export const getPlannedTasks = async (req, res, next) => {
    try {
        const plannedTasks = await helpers.getTasks({ type: 'planned' });

        res.render('user/planned', {
            pageTitle: 'ToDo | Planned tasks',
            allTasks: plannedTasks,
            menuOption: 'planned',
        });
    } catch (error) {}
};

export const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await helpers.getTasks({});

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
