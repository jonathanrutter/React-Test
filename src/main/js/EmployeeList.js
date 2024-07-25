const React = require('react');

import Employee from'./Employee';

class EmployeeList extends React.Component{
	render() {
		const employees = this.props.employees.map(employee =>
			<Employee key={employee.id}
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
export default EmployeeList;