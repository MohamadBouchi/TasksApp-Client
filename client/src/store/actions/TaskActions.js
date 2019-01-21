export const setNotification = () => {
  return (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION" });
  }
}

export const resetNotification = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_NOTIFICATION" });
  }
}
export const getTasks = () => {
  return (dispatch) => {
    const request = {
          query: `
            query{
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
                },
                tasks(assigned:false){
                  _id,
                  title,
                  description,
                  date,
                  deadline
                }
              }
          `
        };
    fetch("http://10.10.11.70:3000/graphql", {
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

export const updateUserTask = (id, status, date, userId) => {
  return (dispatch) => {
    const request = {
      query: `
        mutation{
          updateUserTask(updateUserTask:{
            id:"${id}",
            status:"${status}",
            changeDate:"${date}",
            userId:"${userId}"
          })
        }
          `
        };
    fetch("http://10.10.11.70:3000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(data => {
        if(data.status === 200)
          return dispatch(getTasks());
        else
          return false;
      })
      // .then(() => {
      //   return dispatch(getTasks());
      // })
      .catch(err => {
        dispatch({type:'UPDATE_TASKS_ERROR', payload: err});
    });
  };
};

export const createUserTask = (taskId, userId, status, date) => {
  return (dispatch) => {
    const request = {
      query: `
      mutation{
        createUserTask(userTaskInput:{
          taskId:"${taskId}",
          userId:"${userId}",
          status:"${status}",
          changeDate:"${date}"
        })
        {
          status
        }
        updateTask(assigned:true, id:"${taskId}")
      }
          `
        };
    fetch("http://10.10.11.70:3000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => {
        return data.json();
      }).then(() => {
        dispatch(getTasks());
      })
      .catch(err => {
        dispatch({type:'UPDATE_TASKS_ERROR', payload: err});
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
    fetch("http://10.10.11.70:3000/graphql", {
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