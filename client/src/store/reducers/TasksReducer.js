const initState = {
    tasks: [],
    open: [],
    inProcess: [],
    waiting: [],
    finished: [],
    loading: true,
    notification: 0,
    userTasks: []
};

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: state.notification+1 
            };
            case 'RESET_NOTIFICATION':
            return {
                ...state,
                notification: 0 
            };
        case 'RECEIVE_TASKS':
            state = {
                ...state,
                loading: true
            }
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
                ...state
                ,tasks: tasks
                ,open: open
                ,inProcess: inProcess
                ,waiting: waiting
                ,finished: finished,
                loading: false,
                userTasks: userTasks
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