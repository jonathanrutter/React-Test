const React = require('react');

import CreateDialog from'./CreateDialog';

import { Button } from 'reactstrap';

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
				<td>{this.props.employee.firstName}</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.role}</td>
				<td>{this.props.employee.email}</td>
				<td>
					<CreateDialog employee={this.props.employee}
							attributes={this.props.attributes}
							updateFn={this.props.onUpdate}
							isNew={false}/>
				</td>
				<td>
				    <Button color="danger" onClick={this.handleDelete}>Delete</Button>
				</td>
			</tr>
		)
	}
}
export default Employee;