import React from 'react';
import ApiContext from '../ApiContext'
import '../App.css'

export default class AddFolder extends React.Component {
	static contextType = ApiContext;
	clickAddFolder(event) {
		event.preventDefault();
		this.context.toggleFolder();
	}
	render() {
		return (
			<button className="button" onClick={e => this.clickAddFolder(e)}>Add Folder</button>
		);
	}
}