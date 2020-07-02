import React from 'react';
import ApiContext from '../ApiContext'
import '../App.css'


export default class NoteForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				value: '',
				touched: false
			},
			content: '',
			folder: {
				value: '',
				touched: false
			},
			error: null,
		}
	}

	static contextType = ApiContext;

    findFolderId() {
		const folderName = this.state.folder.value;
		const folder = this.context.folders.find(e => e.name.trim() === folderName.trim());
		return Number(folder.id);
    }
    
	goBack(event) {
		event.preventDefault();
		this.props.history.goBack();
	}
	
	validateFolder() {
		const folder = this.state.folder.value.trim();
		if (folder.length === 0) {
			return 'Add Folder'
		}
	}

	validateName() {
		const name = this.state.name.value.trim();
		if (name.length === 0) {
			return 'Add Name'
		}
	}

	addingNote(event) {
		event.preventDefault();
		const { content } = this.state;
		const name = this.state.name.value;
		const folder_id = this.findFolderId();
		const note = { name, folder_id, content }
		fetch(`http://localhost:9090/notes/<note-id>`, {method: 'POST', body: JSON.stringify(note), headers: {'Content-Type': 'application/json'}})
	      .then(res => {
	        if (!res.ok) {
	          return res.json().then(error => {
	            throw new Error(error.message)
	          })
	        }
	        return res.json()
	      })
	      .then(data => {
	        this.context.addNote(note)
	      })      
	      .catch(error => {
	      	const errorMessage = `Error: ${error}`
	        this.setState({ error: errorMessage })
	      })
	      .then(res => {if (this.state.error === null) {  
			this.props.history.push('/');
			window.location.reload();
		  }})
	}

	render() {
		return(
			<div className='NoteForm'>
				<form className='NoteForm__content'>
					<h2>Add Note</h2>
					{this.state.error}
					<div className='NoteForm__details'>
						<div>
							<label htmlFor='note-name'>Title: </label>
							<input id='note-name' type='text' onChange={(e) => this.setState({name: {value: e.target.value, touched: true}})}></input>
						</div>
						<div>
							<label htmlFor='note-folder'>Folder: </label>
							<select id='note-content' onChange={(e) => this.setState({folder: {value: e.target.value, touched: true}})}>
								<option></option>
								{this.context.folders.map((folder) => <option key={folder.id}>{folder.name}</option>)}
							</select>
						</div>
					</div>
					{this.state.folder.touched && this.validateFolder()}{'\n'}
					{this.state.name.touched && this.validateName()}
					<div className='NoteForm__textarea'>
						<label htmlFor='note-content'>Note: </label>
						<textarea id='note-content' onChange={(e) => this.setState({content: e.target.value})}></textarea>
					</div>
					<div className='NoteForm__buttons'>
						<button className='button' onClick={e => this.goBack(e)}>Back</button>
						<button className='button' disabled={this.validateName() || this.validateFolder()} onClick={e => this.addingNote(e)}>Save</button>
					</div>
				</form>
			</div>
		);
	}
}