'use strict';

import moment from 'moment';
import Task from '../models/task.js';
import * as helpers from '../utils/helpers.js';
import { validationResult } from 'express-validator';

export const getAddTask = async (req, res, next) => {
    res.render('user/index', {
        pageTitle: 'ToDo | Add task',
        menuOption: 'addTask',
        errorMessage: undefined,
        oldInputs: {
            email: '',
            password: '',
        },
    });
};

export const postAddTask = async (req, res, next) => {
    const name = req.body.task_name;
    const priority = req.body.task_priority;
    const category = req.body.task_category;
    const type = req.body.task_due_to ? 'planned' : 'normal';
    const dueToDate = req.body.task_due_to;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('user/index', {
            pageTitle: 'ToDo | Add task',
            menuOption: 'addTask',
            errorMessage: errors.array()[0].msg,
            oldInputs: {
                priority: priority,
                category: category,
                dueToDate: dueToDate,
            },
        });
    }

    const task = new Task({
        name: name,
        priority: priority,
        category: category,
        dueToDate: dueToDate
            ? moment(dueToDate).format('DD/MM/YYYY - hh:mm a')
            : null,
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
    const datePrefix = moment().format('DD/MM/YYYY');
    const regex = new RegExp(`^${datePrefix}`);
    try {
        const dayTasks = await helpers.getTasks({
            userId: req.user._id,
            dueToDate: regex,
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
        const importantTasks = await helpers.getTasks({
            userId: req.user._id,
            priority: 'high',
        });

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
        const plannedTasks = await helpers.getTasks({
            userId: req.user._id,
            type: 'planned',
        });

        res.render('user/planned', {
            pageTitle: 'ToDo | Planned tasks',
            allTasks: plannedTasks,
            menuOption: 'planned',
        });
    } catch (error) {}
};

export const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await helpers.getTasks({ userId: req.user._id });

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
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};

export const deleteTask = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ message: 'Success!' });
    } catch (error) {
        console.log(error);
    }
};

export const postEditTask = async (req, res, next) => {
    const taskId = req.body.taskId;
    const name = req.body.task_name;
    const priority = req.body.task_priority;
    const category = req.body.task_category;
    const status = req.body.task_status;
    const dueToDate = req.body.task_due_to;

    try {
        await Task.findByIdAndUpdate(taskId, {
            name: name,
            priority: priority,
            category: category,
            status: status,
            dueToDate: dueToDate
                ? moment(dueToDate).format('DD/MM/YYYY - hh:mm a')
                : null,
        });
        const task = await Task.findById(taskId);
        return res.status(200).json({
            updatedTask: task,
        });
    } catch (error) {
        console.log(error);
    }
};
