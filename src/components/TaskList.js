import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "../actions/index";

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
    var filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status: name === "filterStatus" ? value : this.state.filterStatus,
    };
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { tasks, filterTable, keyword } = this.props;
    // Filter start
    if (filterTable) {
      if (filterTable.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filterTable.status === -1) {
          return task;
        } else {
          return task.status === (filterTable.status === 1 ? true : false);
        }
      });
    }
    // Filter end

    // Search
    tasks = tasks.filter((task) => {
      return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });
    // End search
    var { filterName, filterStatus } = this.state;
    var elmTasks = tasks.map((task, index) => {
      return <TaskItem key={tasks.id} index={index} task={task} />;
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
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTask(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
