import React, { Component } from 'react';

class ListControl extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      filterName: '',
      filterStatus: 'all'
    }
  }

  InTableChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus,
    )
  }

  render() {
    return (
        <tr>
            <td></td>
            <td>
                <input type="text" 
                       name="filterName" 
                       className="form-control"
                       onChange = {this.InTableChange}
                />
            </td>
            <td>
                <select name="filterStatus" 
                        id="input" 
                        className="form-control" 
                        required="required"
                        onChange = {this.InTableChange}
                >
                <option value="all">Tất cả</option>
                <option value="active">Kích hoạt</option>
                <option value="deactive">Ẩn</option>
                </select>
            </td>
            <td></td>
        </tr>
    )
  }
}

export default ListControl;