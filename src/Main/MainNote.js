import React from 'react';
import {Link} from 'react-router-dom';
import ApiContext from '../ApiContext';
import './Main.css';

const DateTimeFormat = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric' 
});

export default class MainNote extends React.Component {
	deleteNote(noteId, callback) {
		fetch(`http://localhost:9090/notes/${noteId}`, {method: 'DELETE'})
	    .then(res => {
	      if (!res.ok) {
	        return res.json().then(error => {
	          throw error
	        })
	      }
	      return res.json()
	    })
	    .then(data => {
	      callback(noteId)
	    })
	    .then(this.props.history.push('/'))
	    .catch(error => {
	      console.log(error)
	    })
	}

    static contextType = ApiContext;
    
	render() {
		const note = this.context.notes.find(note => note.id === this.props.match.params.noteId)
		return(
		<div className='Main'>
			<ul className='Main__note-list'>
				<li className='Main__note-item' key={note.id}>
					<div className='Main__note-info'>
						<Link to={`/note/${note.id}`}>
							<h2 className='Main__note-title'>{note.name}</h2>
						</Link>
						<p className='Main__note-date'>Last Modified {DateTimeFormat(note.modified)}</p>
					</div>
					<button className='Main__delete-note' onClick={() => this.deleteNote(note.id, this.context.deleteNote)}>Delete</button>
				</li>
			</ul>
			<div className='Main__note-content'>{note.content}</div>
		</div>
		)
	}
	
}