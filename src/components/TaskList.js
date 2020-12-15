import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from 'react-redux';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1,
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { tasks } = this.props;
    var { filterName, filterStatus } = this.state;
    var elmTasks = tasks.map((task, index) => {
      return (
        <TaskItem
          key={tasks.id}
          index={index}
          task={task}
          onUpdate={this.props.onUpdate}
          // onDelete={this.props.onDelete}
          // onUpdateStatus={this.props.onUpdateStatus}
        />
      );
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
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                onChange={this.onChange}
                value={filterStatus}
                name="filterStatus"
              >
                <option value={-1}>Tat ca</option>
                <option value={0}>An</option>
                <option value={1}>Kich hoat</option>
              </select>
            </td>
          </tr>
          {/* TaskItem */}
          {elmTasks}
          {/* end TaskItem */}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps) (TaskList);
