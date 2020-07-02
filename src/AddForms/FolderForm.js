import React from 'react';
import ApiContext from '../ApiContext';
import './Form.css';

export default class FolderForm extends React.Component {
	static contextType = ApiContext
	constructor(props) {
		super(props);
		this.state = {
			name: {
				value: '',
				touched: false
			},
			error: null
		}
	}

	addingFolder(event) {
		event.preventDefault();
		const name = this.state.name.value;
		const folder = { name }
		fetch(`http://localhost:9090/folders/<note-id>`, {method: 'POST', body: JSON.stringify(folder), headers: {'Content-Type': 'application/json'}})
	      .then(res => {
	        if (!res.ok) {
	          return res.json().then(error => {
	            throw new Error(error.message)
	          })
	        }
	        return res.json()
	      })
	      .then(data => {
	        this.context.addFolder(folder)
	      })	      
	      .catch(error => {
	      	console.log(error)
	      	const errorMessage = `Error: ${error}`
	        this.setState({ error: errorMessage })
	      })
	      .then(res => {
			  if (this.state.error === null) {
				  this.context.toggleFolder();
				  window.location.reload();
				}})
	}

	validateName() {
		const name = this.state.name.value.trim();
		if (name.length === 0) {
			return 'Add Name'
		}
	}

	render() {
		return(
			<div className='NewForm'>
				<form>
					<h2>Add Folder</h2>
					<input id='folder-name' type='text' placeholder='Folder Name' className='NewForm__input' onChange={(e) => this.setState({name: {value: e.target.value, touched: true}})}></input>
				</form>
				{this.state.name.touched && this.validateName()}
				{this.state.error}
				<div className='NewForm__buttons'>
					<button className='button' onClick={() => this.context.toggleFolder()}>Back</button>
					<button className='button' disabled={this.validateName()} onClick={(e) => this.addingFolder(e)}>Add</button>				
				</div>
			</div>
		);
	}
}