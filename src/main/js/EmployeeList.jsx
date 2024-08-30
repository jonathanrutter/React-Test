import Employee from'./Employee';

function EmployeeList({props, employees, attributes, deleteFn, updateFn}) {

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
                    <th>Details</th>
                </tr>
                { employees.map(employee => (
                    <Employee key={employee.id}
                        employee={employee}
                        attributes={attributes}
                        deleteFn={deleteFn}
                        updateFn={updateFn}/>
                ))}
            </tbody>
        </table>
    )

}
export default EmployeeList;