import moment from 'moment';

// Fake database
let tasks = [
    {
        'id': 1,
        'description' : 'Complete Lab 3',
        'important': true,
        'privateTask': false,
        'deadline': moment('2020-04-03T11:00:00'),
        'project': 'WebApp I',
        'completed': true
    },
    {
        'id': 2,
        'description' : 'Watch Mr. Robot',
        'important': false,
        'privateTask': true,
        'deadline': moment('2020-05-31T18:59:00'),
        'project': 'Personal',
        'completed': false
    },
    {
        'id': 3,
        'description' : 'Go for a walk',
        'important': true,
        'privateTask': true,
        'deadline': moment('2020-04-18T08:00:00'),
        'project': 'Personal',
        'completed': false
    }];

// Check if a task is scheduled for today
const isToday = (date) => {
    return date.isSame(moment(), 'day');
}

// Check if a task is scheduled for the next week
const isNextWeek = (date) => {
    const nextWeek = moment().add(1, 'weeks');
    const tomorrow = moment().add(1, 'days');
    return date.isAfter(tomorrow) && date.isBefore(nextWeek);
}

// Return the fake database (this is async for simulating a db read)
async function getTasks() {
    return tasks;
}

// Return the fake database filtered by "important" (this is async for simulating a db read)
async function getImportantTasks() {
    return tasks.filter((el) => {
        return el.important;
    });
}

// Return the fake database filtered by "today" (this is async for simulating a db read)
async function getTodayTasks() {
    return tasks.filter((el) => {
        if(el.deadline)
            return isToday(el.deadline);
        else
            return false;
    });
}

// Return the fake database filtered by "next week" (this is async for simulating a db read)
async function getWeeklyTasks() {
    return tasks.filter((el) => {
        if(el.deadline)
            return isNextWeek(el.deadline);
        else
            return false;
    });
}

// Return the fake database filtered by "private" (this is async for simulating a db read)
async function getPrivateTasks() {
    return tasks.filter((el) => {
        return el.privateTask;
    });
}

// Return the fake database filtered by not "private" (this is async for simulating a db read)
async function getSharedTasks() {
    return tasks.filter((el) => {
        return !el.privateTask;
    });
}

// Return all the tasks of a given project (this is async for simulating a db read)
async function getByProject(project) {
    return tasks.filter((el) => {
        return el.project === project;
    });
}

// I'll save all the API in an object and I'll export it
const API = { getTasks,getImportantTasks, getTodayTasks,getWeeklyTasks,getPrivateTasks,getSharedTasks, getByProject} ;
export default API;
