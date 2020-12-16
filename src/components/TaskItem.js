import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };

  onDelete = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm();
  };

  onUpdate = () => {
    // this.props.onUpdate(this.props.task.id);
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  };

  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            onClick={this.onUpdateStatus}
            className={
              task.status === true
                ? "label label-danger"
                : "label label-success"
            }
          >
            {task.status === true ? "Kich hoat" : "An"}
          </span>
        </td>
        <td className="text-center">
          <button
            onClick={this.onUpdate}
            type="button"
            className="btn btn-warning"
          >
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button
            onClick={this.onDelete}
            type="button"
            className="btn btn-danger"
          >
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(actions.updateStatus(id));
    },
    onDeleteTask: (id) => {
      dispatch(actions.deleteTask(id));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onEditTask: (task) => {
      dispatch(actions.editTask(task));
    },
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
