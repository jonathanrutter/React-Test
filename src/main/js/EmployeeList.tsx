import Employee from'./Employee';

function EmployeeList({employees, attributes, deleteFn, updateFn}: {employees: any, attributes: any, deleteFn: any, updateFn: any}) {

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