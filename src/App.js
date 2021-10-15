import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import List from './components/List';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddTask: false,
            tasks: [],
            taskEditing: null,
            filter: {
                name: '',
                status: 'all'
            },
            searchInput: '',
            sortBy: 'name',
            sortValue: 1,
        }
    }
    
    handleAddTaskClick = () => {
        if (this.state.isAddTask && this.state.taskEditing !== null) {
            this.setState({
                isAddTask: true,
                taskEditing: null
            })
        }
        else{
            this.setState ({
                isAddTask: !this.state.isAddTask,
                taskEditing: null
            })
        }
    }

    onCloseForm = () => {
        this.setState({
            isAddTask: false,
            taskEditing: null
        })
    }

    onShowForm = () => {
        this.setState({
            isAddTask: true,
        })
    }
    
    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks,
            })
        }
    }

    s4(){
        return Math.floor((Math.random() + 1) * 0x10000).toString(16).substring(1);
    }

    GenerateID(){
        return this.s4() + '-' + this.s4() + '-' + 
        this.s4() + '-' + this.s4() + '-' + this.s4() + 
        this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() +  '-' + this.s4();
    }

    handleOnSubmit = (data) => {
        var {tasks} = this.state;
        if (data.id === ''){
            var task = {
                id: this.GenerateID(),
                name: data.InputName,
                status: data.InputOptions
            }
            tasks.push(task);
        }else{
            let task = {
                id: data.id,
                name: data.InputName,
                status: data.InputOptions
            }
            var index = tasks.indexOf(tasks.find((task) => task.id === data.id))
            tasks[index] = task;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var task = tasks.find(function(task){
            return task.id === id;
        })
        tasks.splice(tasks.indexOf(task), 1)
        this.setState({
            tasks: tasks,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    ToggleStatus = (id) => {
        var { tasks } = this.state;
        var task = tasks.find(task => task.id === id);
        task.status = !task.status;
        this.setState({
            tasks: tasks,
        })
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        var task = tasks.find(task => task.id === id);
        this.setState({
            taskEditing: task
        })
        this.onShowForm()
    }

    onSearch = (data) => {
        this.setState({
            searchInput: data,
        })
    }

    onFilter = (filterName, filterStatus) => {
        this.setState({
            filter: {
                name: filterName,
                status: filterStatus,
            }
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState ({
            sortBy: sortBy,
            sortValue: sortValue,
        })
    }

  render() {
    var { tasks, 
          isAddTask, 
          taskEditing, 
          filter, 
          searchInput,
          sortBy,
          sortValue
        } = this.state; // var tasks = this.state.tasks
    if (filter.name) {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().includes(filter.name.toLowerCase());
        })
    }
    if (filter.status) {
        tasks = tasks.filter((task) => {
            if (filter.status === 'all') {
                return task;
            }
            else {
                return task.status === (filter.status === 'active' ? true : false);
            }
        })
    }

    if (searchInput) {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().includes(searchInput.toLowerCase());
        })
    }

    if (sortBy === 'name') {
        tasks.sort((a,b) =>{
            if (a.name > b.name) return sortValue;
            else if (a.name < b.name) return -sortValue;
            else return 0;
        });
    }else{
        tasks.sort((a,b) =>{
            if (a.status > b.status) return -sortValue;
            else if (a.status < b.status) return sortValue;
            else return 0;
        });  
    }

    var FormElement = isAddTask ? <TaskForm isAddTask = {isAddTask} 
              onCloseForm = {this.onCloseForm} 
              handleOnSubmit = {this.handleOnSubmit}
              taskEditing = { taskEditing }
              /> : ''
    return (
        <div className="container">
            <div className = "text-center">
                <h1>Quản lý công việc</h1>
            </div>
            <hr/>
            <div className="row">
                {FormElement}
                <div className= {isAddTask ? 
                                        "col-xs-8 col-sm-8 col-md-8 col-lg-8" : 
                                        "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick = {this.handleAddTaskClick}>
                                <i className="fa fa-plus" aria-hidden="true"></i> Thêm công việc
                            </button> 
                        </div>
                    </div>
                    <br/>
                    <Control onSearch={this.onSearch} 
                             onSort = { this.onSort }
                             sortBy = { sortBy }
                             sortValue = { sortValue }
                    />
                    <br/>
                    <List tasks = { tasks } 
                          onCloseForm = { this.onCloseForm }
                          onDelete = { this.onDelete}
                          ToggleStatus = { this.ToggleStatus }
                          onUpdate = { this.onUpdate } 
                          onFilter = { this.onFilter }
                          />
                </div>
            </div>
        </div>
    )
  }
}

export default App;