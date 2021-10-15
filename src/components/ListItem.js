import React, { Component } from 'react';

class ListItem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
        }
    }

    ToggleStatus = (id) => {
        this.props.ToggleStatus(this.props.taskId)
    }

    onCloseForm = () => {
        this.props.onCloseForm()
    }

    onDelete = () => {
        this.props.onDelete(this.props.taskId)
    }

    onUpdate = (id) => {
        this.props.onUpdate(this.props.taskId)
    }


    render() {

        var { index, name, status } = this.props;  // var index = this.props.index;

    return (
        <tr>
            <td>{ index + 1 }</td>
            <td>{ name }</td>
            <td className = "text-center">
                <button type="button"
                        onClick = {this.ToggleStatus}
                        className= { status ? "btn btn-xs btn-success" : "btn btn-xs btn-danger"}>
                        { status ? 'Kích hoạt' : 'Ẩn'}
                </button>
            </td>
            <td>
                <div className="text-center">
                    <button type="button" 
                            className="btn btn-warning"
                            onClick = {this.onUpdate}
                            style={{marginRight: 5}}>
                        <i className="fa fa-pencil" aria-hidden="true"></i> Sửa
                    </button>
                    <button type="button" 
                            className="btn btn-danger"
                            onClick = {this.onDelete}>
                        <i className="fa fa-trash" aria-hidden="true"></i> Xóa
                    </button>
                </div>
            </td>
        </tr>
    )
  }
}

export default ListItem;