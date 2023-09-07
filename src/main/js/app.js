const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('./client');

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
		client({method: 'DELETE', path: employee.entity._links.self.href}).done(response => {
			this.loadFromServer();
		});
	}
}

class EmployeeList extends React.Component{
	render() {
		const employees = this.props.employees.map(employee =>
			<Employee key={employee.entity._links.self.href} 
				employee={employee} 
				attributes={this.props.attributes}
				onDelete={this.props.onDelete}
				onUpdate={this.props.onUpdate}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Role</th>
						<th>Email</th>
						<th>Update</th>
						<th>Delete</th>
					</tr>
					{employees}
				</tbody>
			</table>
		)
	}
}

class Employee extends React.Component{

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.employee);
	}

	render() {
		return (
			<tr>
				<td>{this.props.employee.entity.firstName}</td>
				<td>{this.props.employee.entity.lastName}</td>
				<td>{this.props.employee.entity.role}</td>
				<td>{this.props.employee.entity.email}</td>
				<td>
					<UpdateDialog employee={this.props.employee}
							attributes={this.props.attributes}
							onUpdate={this.props.onUpdate}/>
				</td>
				<td>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newEmployee = {};
		this.props.attributes.forEach(attribute => {
			newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newEmployee);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<a href="#createEmployee">Create</a>

				<div id="createEmployee" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new employee</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const updatedEmployee = {};
		this.props.attributes.forEach(attribute => {
			updatedEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.employee, updatedEmployee);
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={this.props.employee.entity[attribute]}>
				<input type="text" placeholder={attribute}
					defaultValue={this.props.employee.entity[attribute]}
					ref={attribute} className="field"/>
			</p>
		);

		const dialogId = "updateEmployee-" + this.props.employee.entity._links.self.href;

		return (
			<div key={this.props.employee.entity._links.self.href}>
				<a href={"#" + dialogId}>Update</a>
				<div id={dialogId} className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Update an employee</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Update</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
};
ReactDOM.render(
	<App />,
	document.getElementById('react')
)