import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NavList from './NavBar/NavList';
import NavNote from './NavBar/NavNote';
import MainList from './Main/MainList';
import MainNote from './Main/MainNote';
import NoteForm from './AddForms/NoteForm';
import ApiContext from './ApiContext';
import './App.css';
{/*import dummyStore from './dummy-store';*/}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      error: null,
    };
  }

  retrieveData() {
    const url = 'http://localhost:9090'
    const options = {
      method: 'GET'
    } 
  }

  componentDidMount() {
    this.retrieveData()
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({ notes: newNotes }) 
  }

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ],
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ],
    })
  }

  toggleFolder = () => {
    this.state.folderPopup === false ? this.setState({ folderPopup: true }) : this.setState({ folderPopup: false })
  }
 
  retrieveFolders(url, options) {
    fetch(`${url}/folders`, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Error: Something went wrong')
        }
        return res.json()
      })
      .then(response => this.setState({ folders: response}))
      .catch(error => {
        console.log(error)
      })
  }

  retrieveNotes(url, options) {   
    fetch(`${url}/notes`, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Error: Something went wrong')
        }
        return res.json()
      })
      .then(response => this.setState({ notes: response}))
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder,
      toggleFolder: this.toggleFolder,
      folderPopup: this.state.folderPopup
    }
    return (
      <main className='App'>
      <header>
        <Link to='/'>
          <h1>Noteful</h1>
        </Link>
      </header>
      {this.state.error}
      <ApiContext.Provider value={contextValue}>    
        <div className='content'>
          <Route exact path='/' component={NavList} />
          <Route exact path='/' component={MainList} />
          <Route path='/folders/:folder_id' component={NavList} />
          <Route path='/folders/:folder_id' component={MainList} />
          <Route path='/notes/:note_id' component={NavNote} />
          <Route path='/notes/:note_id' component={MainNote} />
          <Route path='/add-note' component={NoteForm} />
        </div>
      </ApiContext.Provider> 
    </main>
    );
  }
};

export default App;