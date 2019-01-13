const initState = {
    tasks: [],
    open: [],
    inProcess: [],
    waiting: [],
    finished: []
};

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVE_TASKS':
            const tasks = action.payload.data.tasks;
            const userTasks = action.payload.data.userTasks;
            const open = userTasks.filter(userTask => {
                if (userTask.status === 'open') return userTask;
                else return null;
            });
            const inProcess = userTasks.filter(userTask => {
                if (userTask.status === 'inProcess') return userTask;
                else return null;
            });
            const waiting = userTasks.filter(userTask => {
                if (userTask.status === 'waiting') return userTask;
                else return null;
            });
            const finished = userTasks.filter(userTask => {
                if (userTask.status === 'finished') return userTask;
                else return null;
            });
            return {
                ...state, tasks: tasks
                ,open: open
                ,inProcess: inProcess
                ,waiting: waiting
                ,finished: finished
            };
        case 'TASK_CREATED':
            const created_task = action.payload.data.createTask;
            return {
                ...state,
                tasks:[...state.tasks, created_task]
            };
        case 'RECEIVE_TASKS_ERROR':
            console.log('receive_tasks_error');
            break;
        default: return state;
    }
    return state;
}

export default taskReducer;