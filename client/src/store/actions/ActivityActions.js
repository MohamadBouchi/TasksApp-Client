  export const getActivity = (date) => {
    return (dispatch) => {
      const request = {
            query: `
              query{
                activity(date:"${date}") {
                    _id,
                    status,
                    changeDate,
                    taskTitle,
                    userName
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
          return dispatch({ type: "RECEIVE_ACTIVITY", payload: res });
        })
        .catch(err => {
          dispatch({type:'RECEIVE_ACTIVITY_ERROR', payload: err});
      });
    };
  };
  
  export const createActivity = (date, status, changeDate, userName, taskTitle) => {
    return (dispatch) => {
        const request = {
          query: `
            mutation{
                createActivity(createActivityInput:{
                date: "${date}"
                status:"${status}",
                changeDate:"${changeDate}",
                userName:"${userName}",
                taskTitle:"${taskTitle}"
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
        }).then(data => {
            return data.json();
          }).then(res => {
            dispatch({ type: "ACTIVITY_CREATED", payload: res });
          })
        .catch(err => {
          dispatch({type:'ACTIVITY_CREATE_ERROR', payload: err});
        });
      };
  };