import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  render() {
    var { tasks } = this.props;
    var elmTasks = tasks.map((task, index) => {
      return <TaskItem key={tasks.id} index={index} task={task} onUpdateStatus={this.props.onUpdateStatus} />;
    });
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {/* TaskItem */}
          {elmTasks}
          {/* end TaskItem */}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
