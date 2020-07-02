import React from 'react';
import './NavBar.css';
import ApiContext from '../ApiContext'

export default class NoteNavigation extends React.Component {
	static contextType = ApiContext;
	render() {
		const target = this.context.notes.find(note => note.id.toString() === this.props.match.params.note_id)
		const folderId = target.folder_id;
		const foundFolder = this.context.folders.find(folder => folder.id === folderId)
		const back = () => {
			this.props.history.goBack()
		}
		return(
			<div className='Navigation'>
				<button className='Navigation__back-button' onClick={back}>Back</button>
				<h2>{foundFolder.name}</h2>
			</div>
		)
	}	
}