import React, { Component } from 'react';
import ListControl from './ListControl';
import ListItem from './ListItem';

class List extends Component {

  render() {

    var { tasks, onCloseForm, onDelete, ToggleStatus, onUpdate, onFilter } = this.props; // var tasks = this.props.tasks;
    var elementTasks = tasks.map((task,index) =>{
        return <ListItem key = {task.id} 
                        index = { index } 
                        name = { task.name } 
                        status = { task.status }
                        taskId = { task.id }
                        onCloseForm = { onCloseForm }
                        onDelete = { onDelete }
                        ToggleStatus = { ToggleStatus }
                        onUpdate = { onUpdate }
                        />
    })
    return (
        <table className="table table-bordered table-hover">
            <thead> 
                <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <ListControl onFilter = { onFilter }/>
                { elementTasks }
            </tbody>
        </table>
    )
  }
}

export default List;