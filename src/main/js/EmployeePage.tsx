import {Alert} from 'reactstrap';

import EmployeeList from'./EmployeeList';
import useFetch from'./useFetch';
import {Container} from 'reactstrap';
import CreateDialog from'./CreateDialog';


function EmployeePage() {
    const {data: employees, isLoading, error, refetch} = useFetch('/rest/employees', false);

    const attributes = ['firstName', 'lastName', 'role', 'email'];

	async function onCreate(newEmployee:any) {
	    let path = '/rest/employee';
        const response = await fetch(path, {
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
            new Alert(<div>'Delete failed ' + path + '. With error code: ' + response.status</div>);
        }
	}

	async function onUpdate(updatedEmployee: any, employeeId: number) {
	    let path = '/rest/employee/' + employeeId;
        const response = await fetch(path, {
              method: "PUT",
              body: JSON.stringify(updatedEmployee),
              headers: {
                "Content-Type": "application/json",
              },
        });
        const body = await response.json();

        if (response.status === 412) {
            new Alert(<div>'DENIED: Unable to update ' + path + '. Your copy is stale.'</div>);
        }
        else if (response.ok) {
            refetch({});
        }
        else {
            new Alert(<div>'Update failed ' + path + '. With error code: ' + response.status</div>);
        }
	}

	async function onDelete(employee) {
	    let path = '/rest/employee/' + employee.id;
        const response = await fetch(path, {
              method: "DELETE",
        });
        const body = await response.json();

        if (response.status === 412) {
            new Alert(<div>'DENIED: Unable to update ' + path + '. Your copy is stale.'</div>);
        }
        else if (response.ok) {
            refetch({});
        }
        else {
            new Alert(<div>'Delete failed ' + path + '. With error code: ' + response.status</div>);
        }
	}

    return (
        <Container fluid>
            <h1>All Employees</h1>
            { !isLoading && error }
            { !isLoading && !error &&
            <div>
                <CreateDialog
                    isNew={true}
                    attributes={attributes}
                    createFn={onCreate}
                />
                <EmployeeList
                        employees={employees}
                        attributes={attributes}
                        deleteFn={onDelete}
                        updateFn={onUpdate}
                />
            </div>
            }
            {isLoading && <div>Loading Data...</div> }
        </Container>
    )
}
export default EmployeePage;