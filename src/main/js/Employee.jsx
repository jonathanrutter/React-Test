import { Button } from 'reactstrap';

import CreateDialog from'./CreateDialog';

function Employee({employee, attributes, deleteFn, updateFn}) {
	function handleDelete() {
		deleteFn(employee);
	}

    return (
        <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.role}</td>
            <td>{employee.email}</td>
            <td>
                <CreateDialog employee={employee}
                        attributes={attributes}
                        updateFn={updateFn}
                        isNew={false}/>
            </td>
            <td>
                <Button color="danger" onClick={() => deleteFn(employee)}>Delete</Button>
            </td>
        </tr>
    )

}
export default Employee;