// import io from 'socket.io-client';

// const socket = io("http://192.168.0.234:3000");


export const getTasks = () => {
  return (dispatch) => {
    dispatch({ type: "GET_TASK_START" });
    const request = {
          query: `
            query{
              tasks{
                  _id,
                  title,
                  description,
                  date,
                  deadline
                },
              userTasks(userTaskInput:{
                                      status:"",
                                      taskId:"",
                                      userId:"",
                                      changeDate:""}) {
                  _id,
                  status,
                  changeDate,
                  taskId {
                    title,
                    description,
                    date,
                    deadline
                  },
                  userId {
                    userName
                  }
                }
              }
          `
        };
    fetch("http://192.168.0.234:3000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => {
        return data.json();
      }).then(res => {
       return dispatch({ type: "RECEIVE_TASKS", payload: res });
      })
      .catch(err => {
        dispatch({type:'RECEIVE_TASKS_ERROR', payload: err});
    });
  };
};

export const createTask = () => {
  return (dispatch) => {
    const request = {
      query: `
          mutation{
            createTask(taskInput:{title:"test5",description:"test5",date:"2019-01-05T14:56:38.550Z",deadline:"2019-01-05T14:56:38.550Z"})
            {
              title,
              description,
              _id,
              date,
              deadline
            }
          }
          `
        };
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => {
        return data.json();
      }).then(res => {
        dispatch({ type: "TASK_CREATED", payload: res });
      })
    .catch(err => {
      dispatch({type:'RECEIVE_TASKS_ERROR', payload: err});
    });
  };
};


export const updateUserTask = (id,status,date) => {
  return (dispatch) => {
    const request = {
      query: `
        mutation{
          updateUserTask(updateUserTask:{
            id:"${id}",
            status:"${status}",
            changeDate:"${date}"
          })
        }
          `
        };
    fetch("http://192.168.0.234:3000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => {
        return data.json();
      }).then(() => {
        dispatch(getTasks());
        //socket.emit('updated', null);
        // dispatch({ type: "RECEIVE_TASKS", payload: res });
      })
      .catch(err => {
        alert(err)
      dispatch({type:'UPDATE_TASKS_ERROR', payload: err});
    });
  };
};