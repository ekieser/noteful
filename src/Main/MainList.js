import React from 'react';
import ApiContext from '../ApiContext';
import AddNote from './AddNote';
import MainNote from './MainNote';
import ErrorBoundary from '../ErrorBoundary';
import './Main.css';

const getNotesForFolder = (notes, folderId) => (!folderId) ? notes : notes.filter(note => note.folder_id === Number(folderId))

const DateTimeFormat = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric' 
});

export default class MainPage extends React.Component {
	static contextType = ApiContext;
	render() {
		const folderId = this.props.match.params.folder_id;
		const notes = this.context.notes;
		const notesForFolder = getNotesForFolder(notes, folderId)
		return(
			<div className='Main'>
				<ul className='Main__note-list'>
					{notesForFolder.map((note) => {
						return( 							
							<li className='Main__note-item' key={note.id}>
								<ErrorBoundary>
									<MainNote id={note.id} name={note.name} modified={`Date modified on ${DateTimeFormat(note.modified)}`} />
								</ErrorBoundary>
							</li>							
						)
					})}
				</ul>
				<AddNote />
			</div>
		)
	}
	
}