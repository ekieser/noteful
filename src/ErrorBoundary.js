import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false }
	}
	static recieveError(error) {
		return { hasError: true }
	}
	catchError(error, info) {
		console.log(error, info)
	}
	render() {
		if (this.state.hasError) {
			return <p>Something Went Wrong</p>
		}
		return this.props.children;
	}
}