import * as types from "../constants/ActionTypes";

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const generateId = () => {
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4();
};

var findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var myReducers = (state = initialState, action) => {
  var id, index;
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SAVE_TASK:
      var task = {
        id: action.task.id,
        name: action.task.name,
        status: action.task.status,
      };
      if (!task.id) {
        task.id = generateId();
        state.push(task);
      } else {
        index = findIndex(state, task.id);
        state[index] = task;
      }

      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS_TASK:
      id = action.id;
      index = findIndex(state, id);
      state[index] = {
        ...state[index],
        status: !state[index].status,
      };
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.DELETE_TASK:
      id = action.id;
      index = findIndex(state, id);
      state.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
  return state;
};

export default myReducers;
