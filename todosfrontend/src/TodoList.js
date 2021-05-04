import React, {Component} from 'react';
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import * as apiCalls from './api';

class TodoList extends Component{
	constructor(props){
		super(props);
		this.state = {
			todos: []
		}
	}
	
	componentWillMount(){
		this.loadTodos();
	}
	
	loadTodos = async ()=>{
		let todos = await apiCalls.getTodos();
		this.setState({todos});
	}
	
	addTodo = async val =>{
		let newTodo = await apiCalls.createTodo(val);
		this.setState({todos: [...this.state.todos, newTodo]});
	}
	
	deleteTodo = async id=>{
		await apiCalls.deleteTodo(id);
		const todos = this.state.todos.filter(t => t._id!==id);
		this.setState({todos});
	}
	
	toggleTodo = async (id, completed) =>{
		let upTodo = await apiCalls.toggleTodo(id, completed);
		const todos = this.state.todos.map(t => (t._id === upTodo._id) ? {...t, completed: !t.completed}: t);
		this.setState({todos});
	}
	
	render(){
		const todos = this.state.todos.map(t => (
			<TodoItem 
				key={t._id}
				{...t}
				onDelete={this.deleteTodo}
				onToggle={this.toggleTodo}
			/>
		))
		
		return(
			<div>
				<h1>TodoL ist</h1>
				<TodoForm 
					addTodo={this.addTodo}
				/>
				<ul> {todos} </ul>
			</div>
		)
	}
}

export default TodoList;