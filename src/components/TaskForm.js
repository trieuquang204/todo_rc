import React, { Component } from 'react';


class TaskForm extends Component {
  onCloseForm = () => {
    this.props.onCloseForm();
  }

  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="panel-title">Thêm Công Việc</h3>
          <span
            onClick={ this.onCloseForm}
          ><i class="fa fa-times-circle" aria-hidden="true"></i></span>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control" />
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" required="required">
              <option value="1">Kích Hoạt</option>
              <option value="0">Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                    <button type="submit" className="btn btn-danger">Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TaskForm;