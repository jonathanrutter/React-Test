const React = require('react');

import {Container} from 'reactstrap';

import EmployeeList from'./EmployeeList';
import CreateDialog from'./CreateDialog';
import AppNavbar from'./AppNavbar';

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

	async loadFromServer() {
	    const response = await fetch('/rest/employees');
        if (response.ok) {
            const body = await response.json();
            this.setState({
                employees: body,
                attributes: this.state.attributes
            });
        }
        else {
            alert('Load failed ' + path + '. With error code: ' + response.status.code);
        }
	}
	
	render() {
		return (

			<div>
		        <AppNavbar/>
                <Container fluid>
                    <h1>All Employees</h1>
                    <CreateDialog
                        attributes={this.state.attributes}
                        createFn={this.onCreate}
                        isNew={true} />
                    <EmployeeList employees={this.state.employees}
                            attributes={this.state.attributes}
                            onUpdate={this.onUpdate}
                            onDelete={this.onDelete}/>
                </Container>
			</div>
		)
	}
	
	async onCreate(newEmployee) {
        const response = await fetch('/rest/employees', {
              method: "POST",
              body: JSON.stringify(newEmployee),
              headers: {
                "Content-Type": "application/json",
              },
        });
        const body = await response.json();
        if (response.ok) {
            this.loadFromServer();
        }
        else {
            alert('Delete failed ' + path + '. With error code: ' + response.status.code);
        }
	}
	
	async onUpdate(updatedEmployee, employeeId) {
	    let path = '/rest/employees/' + employeeId;
        const response = await fetch(path, {
              method: "PUT",
              body: JSON.stringify(updatedEmployee),
              headers: {
                "Content-Type": "application/json",
              },
        });
        const body = await response.json();

        if (response.status.code === 412) {
            alert('DENIED: Unable to update ' + path + '. Your copy is stale.');
        }
        else if (response.ok) {
            this.loadFromServer();
        }
        else {
            alert('Update failed ' + path + '. With error code: ' + response.status.code);
        }
	}

	async onDelete(employee) {
	    let path = '/rest/employees/' + employee.id;
        const response = await fetch(path, {
              method: "DELETE",
        });
        const body = await response.json();

        if (response.status.code === 412) {
            alert('DENIED: Unable to update ' + path + '. Your copy is stale.');
        }
        else if (response.ok) {
            this.loadFromServer();
        }
        else {
            alert('Delete failed ' + path + '. With error code: ' + response.status.code);
        }
//		client({
//		    method: 'DELETE',
//		    path: employee.entity._links.self.href
//		})
//		.done(response => {
//			this.loadFromServer();
//		});
	}
}
export default App;