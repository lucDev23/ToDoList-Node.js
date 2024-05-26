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

    try {
        await task.save();
        res.redirect('/user/add-task');
    } catch (error) {
        console.log(error);
    }
};

export const getImportantTasks = async (req, res, next) => {
    try {
        const importantTasks = (await Task.find({ important: true })).map(
            (task) => ({
                name: task.name,
                completionDate: moment
                    .utc(task.completionDate)
                    .format('DD/M/YYYY'),
                createdAt: moment.utc(task.createdAt).format('DD/M/YYYY'),
            })
        );

        res.render('user/important', {
            pageTitle: 'ToDo | Important Tasks',
            menuOption: 'important',
            allTasks: importantTasks,
        });
    } catch (error) {
        console.log('l46 user.js, ', error);
    }
};

export const getDayTasks = async (req, res, next) => {
    try {
        const todayDate = new Date();
        const dayTasks = (await Task.find({ createdAt: todayDate })).map(
            (task) => ({
                name: task.name,
                completionDate: moment
                    .utc(task.completionDate)
                    .format('DD/M/YYYY'),
                createdAt: moment.utc(task.createdAt).format('DD/M/YYYY'),
            })
        );

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
