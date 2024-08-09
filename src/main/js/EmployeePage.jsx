import EmployeeList from'./EmployeeList';
import useFetch from'./useFetch';
import {Container} from 'reactstrap';
import CreateDialog from'./CreateDialog';


function EmployeePage() {
    const {data: employees, isLoading, error, refetch} = useFetch('/rest/employees');

    const attributes = ['firstName', 'lastName', 'role', 'email'];

	async function onCreate(newEmployee) {
        const response = await fetch('/rest/employees', {
              method: "POST",
              body: JSON.stringify(newEmployee),
              headers: {
                "Content-Type": "application/json",
              },
        });
        const body = await response.json();
        if (response.ok) {
            refetch({});
        }
        else {
            alert('Delete failed ' + path + '. With error code: ' + response.status.code);
        }
	}

	async function onUpdate(updatedEmployee, employeeId) {
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
            refetch({});
        }
        else {
            alert('Update failed ' + path + '. With error code: ' + response.status.code);
        }
	}

	async function onDelete(employee) {
	    let path = '/rest/employees/' + employee.id;
        const response = await fetch(path, {
              method: "DELETE",
        });
        const body = await response.json();

        if (response.status.code === 412) {
            alert('DENIED: Unable to update ' + path + '. Your copy is stale.');
        }
        else if (response.ok) {
            refetch({});
        }
        else {
            alert('Delete failed ' + path + '. With error code: ' + response.status.code);
        }
	}

    return (
        <Container fluid>
            <h1>All Employees</h1>
            { !isLoading && error }
            { !isLoading && !error &&
            <div>
                <CreateDialog
                    attributes={attributes}
                    createFn={onCreate}
                    isNew={true} />
                <EmployeeList employees={employees}
                        attributes={attributes}
                        updateFn={onUpdate}
                        deleteFn={onDelete}/>
            </div>
            }
            {isLoading && <div>Loading Data...</div> }
        </Container>
    )
}
export default EmployeePage;