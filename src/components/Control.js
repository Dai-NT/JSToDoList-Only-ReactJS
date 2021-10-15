import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
  render() {

    var { onSort, onSearch, sortBy, sortValue } = this.props;

    return (
        <div className="row">
            <Search onSearch = { onSearch }/>
            <Sort onSort = { onSort } 
                  sortBy = { sortBy }
                  sortValue = { sortValue }
                  />
        </div>
    )
  }
}

export default Control;