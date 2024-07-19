const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('./client');

import EmployeeList from'./employeeList';
import CreateDialog from'./createDialog';

/**
 * React components have two types of data:
 * - state (changing values)
 * - properties (fixed)
 */
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			employees: [],
			attributes:['firstName', 'lastName', 'role', 'email']
		};
		// this makes sure the scope is correct so it can call loadFromServer
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	componentDidMount() {
		this.loadFromServer();
	}

	loadFromServer() {
		client({
			method: 'GET',
			path: '/api/employees'
		})
		.then(employeeCollection => {
			return employeeCollection.entity._embedded.employees.map(employee =>
					client({
						method: 'GET',
						path: employee._links.self.href
					})
			);
		})
		.then(employeePromises => {
			return when.all(employeePromises);
		})
		.done(employees => {
			this.setState({
				employees: employees,
				attributes: this.state.attributes
			});
		});
	}
	
	render() {
		return (
			<div>
				<h1>All Employees</h1>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				<EmployeeList employees={this.state.employees}
						attributes={this.state.attributes}
						onUpdate={this.onUpdate}
						onDelete={this.onDelete}/>
			</div>
		)
	}
	
	onCreate(newEmployee) {
		client({
			method: 'POST',
			path: '/api/employees',
			entity: newEmployee,
			headers: {'Content-Type': 'application/json'}
		}).done(response => {
			this.loadFromServer();
		});
	}
	
	onUpdate(employee, updatedEmployee) {
		client({
			method: 'PUT',
			path: employee.entity._links.self.href,
			entity: updatedEmployee,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': employee.headers.Etag
			}
		}).done(response => {
			this.loadFromServer();
		}, response => {
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' +
					employee.entity._links.self.href + '. Your copy is stale.');
			}
		});
	}

	onDelete(employee) {
		client({
		    method: 'DELETE',
		    path: employee.entity._links.self.href
		})
		.done(response => {
			this.loadFromServer();
		});
	}
}

ReactDOM.render(
    <React.StrictMode>
	    <App />
	</React.StrictMode>,
	document.getElementById('react')
)