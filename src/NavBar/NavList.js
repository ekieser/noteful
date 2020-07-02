import React from 'react';
import { NavLink } from 'react-router-dom'
import ApiContext from '../ApiContext'
import AddFolder from './AddFolder';
import FolderForm from '../AddForms/FolderForm';
import ErrorBoundary from '../ErrorBoundary';
import './NavBar.css';

export default class MainNavigation extends React.Component {
	static contextType = ApiContext;
	getNavLink = (path) => {
	   return this.props.location.pathname === path ? 'active' : '';
	}
	render() {	
		return(
		    <div className='Navigation'>
		    	<ul className='Navigation__folder-list'>
		    		{this.context.folders.map((folder) => {
		    			const newClass = this.getNavLink(`/folders/${folder.id}`)
		    			return (
		    				<li className={`Navigation__folder-item ${newClass}`} key={folder.id}>
		    					<ErrorBoundary>	
		    						<NavLink to={`/folders/${folder.id}`}>																		
		    								<h2 className='Navigation__folder-title'>{folder.name}</h2>										
		    						</NavLink>
		    					</ErrorBoundary>
		    				</li>	
		    			)
		    		})}
		    	</ul>
		    	<AddFolder />
		    	{this.context.folderPopup ? <FolderForm /> : ''}
		    </div>
	    )
	}
	
}