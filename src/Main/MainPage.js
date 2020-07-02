import React from 'react';
import {Link} from 'react-router-dom';
import ApiContext from '../ApiContext';
import './Main.css';

const DateTimeFormat = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric' 
});

function deleteNote(noteId, callback) {
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
      .catch(error => {
        console.log(error)
      })
  }

export default class MainPage extends React.Component {
	static contextType = ApiContext;
	render() {
		return(
		<div className='Main'>
			<ul className='Main__note-list'>
				{this.context.notes.map((note) => {
					return( 
						<li className='Main__note-item' key={note.id}>
							<div className='Main__note-info'>
								<Link to={`/note/${note.id}`}>
									<h2 className='Main__note-title'>{note.name}</h2>
								</Link>
								<p className='Main__note-date'>Date modified on {DateTimeFormat(note.modified)}</p>
							</div>
							<button className='Main__delete-note' onClick={() => deleteNote(note.id, this.context.deleteNote)}>Delete</button>
						</li>
					)
				})}
			</ul>
		</div>
		)
	}
	
}