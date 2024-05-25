'use strict';

import Task from '../models/task.js';

export const getIndex = (req, res, next) => {
    res.render('user/index', {
        pageTitle: 'ToDo | My day',
    });
};

export const postAddTask = async (req, res, next) => {
    const name = req.body.taskName;
    const creationDate = req.body.taskDate || new Date();
    console.log(creationDate);

    const task = new Task({
        name: name,
        creationDate: creationDate,
        userId: req.user._id,
    });
    console.log(task);
    try {
        await task.save();
        res.redirect('/user');
    } catch (error) {
        console.log(error);
    }
};

export const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await Task.find();
        res.render('user/tasksList', {
            pageTitle: 'ToDo | Tasks list',
            allTasks: allTasks,
        });
    } catch (error) {}
};
