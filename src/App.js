import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import { connect } from "react-redux";
import * as actions from "./actions/index";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  onToggleForm = () => {
    var { itemEditing } = this.props;
    if (itemEditing && itemEditing.id !== "") {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: "",
      name: "",
      status: false,
    });
  };

  // onCloseForm = () => {
  //   this.setState({
  //     isDisplayForm: false,
  //   });
  // };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  // onSave = (data) => {
  //   var { tasks } = this.state;
  //   if (data.id === "") {
  //     data.id = this.generateId();
  //     tasks.push(data);
  //   } else {
  //     var index = this.findIndex(data.id);
  //     tasks[index] = data;
  //   }

  //   this.setState({
  //     tasks: tasks,
  //     taskEditing: null,
  //   });
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };

  // onUpdateStatus = (id) => {
  //   var { tasks } = this.state;
  //   var index = this.findIndex(id);
  //   if (index !== -1) {
  //     tasks[index].status = !tasks[index].status;
  //     this.setState({
  //       tasks: tasks,
  //     });
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }
  // };

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  // onDelete = (id) => {
  //   var { tasks } = this.state;
  //   var index = this.findIndex(id);
  //   if (index !== -1) {
  //     tasks.splice(index, 1);
  //     this.setState({
  //       tasks: tasks,
  //     });
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }
  //   this.onCloseForm();
  // };

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });
    this.onShowForm();
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
  };

  render() {
    var { sortBy, sortValue } = this.state;
    var { isDisplayForm } = this.props;

    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }
    //   tasks = tasks.filter((task) => {
    //     if (filter.status === -1) {
    //       return task;
    //     } else {
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   });
    // }

    // if(sortBy === 'name') {
    //   tasks.sort((a, b) => {
    //     if(a.name > b.name ) return sortValue;
    //      else if(a.name < b.name ) return -sortValue;
    //      else return 0;
    //   })
    // }else {
    //   tasks.sort((a, b) => {
    //     if(a.status > b.status ) return -sortValue;
    //      else if(a.name < b.name ) return sortValue;
    //      else return 0;
    //   })
    // }

    // var elmTaskForm = isDisplayForm ? <TaskForm task={taskEditing} /> : "";

    // if (keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    // }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {/* TaskForm */}
            {/* {elmTaskForm} */}
            <TaskForm />
            {/* end TaskForm  */}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            {/* Control  */}
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            {/* end Control  */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/* TaskList */}
                <TaskList />
                {/* end TaskList */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
