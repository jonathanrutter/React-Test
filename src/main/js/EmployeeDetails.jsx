import {useState, useEffect} from 'react';

import {Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import {useParams, useNavigate} from 'react-router-dom';

import useFetch from'./useFetch';

function EmployeeDetails () {

    const{ id } = useParams();
    const navigate = useNavigate();

    const {data: employee, isLoading, error, refetch} = useFetch('/rest/employee/' + id, id === null || id === undefined);

    const [updatedEmployee, setUpdatedEmployee] = useState(employee);

    useEffect(() => {
        setUpdatedEmployee(employee);
    }, [employee]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (id) {
            onUpdate(updatedEmployee);
        }
        else {
            onCreate(updatedEmployee);
        }
    };

    const handleOnChange = (evt) => {
//         let tmpEmployee = updatedEmployee;
//         tmpEmployee[evt.target.name] = evt.target.value.trim();
//         setUpdatedEmployee(tmpEmployee);

        setUpdatedEmployee({...updatedEmployee, [evt.target.name] : evt.target.value});
    };

	async function onUpdate(updatedEmployee) {
	    let path = '/rest/employee/' + updatedEmployee.id;
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
            console.log('Saving complete');
            navigate('/employees');
        }
        else {
            alert('Update failed ' + path + '. With error code: ' + response.status.code);
        }
	}

	async function onCreate(newEmployee) {
        const response = await fetch('/rest/employee', {
              method: "POST",
              body: JSON.stringify(newEmployee),
              headers: {
                "Content-Type": "application/json",
              },
        });
        const body = await response.json();
        if (response.ok) {
            console.log('Saving complete');
            navigate('/employees');
        }
        else {
            Alert('Delete failed ' + path + '. With error code: ' + response.status.code);
        }
	}

    return (
        <div className='container'>
        <div className='ms-5 ml-5'>
            <h2>Employee Details - {id}</h2>
            { isLoading && <div>Loading...</div>}
            { error && <div>{error}</div> }
            { employee && "Employee:" + JSON.stringify(employee)}
            <br /> {updatedEmployee && "updatedEmployee:" + JSON.stringify(updatedEmployee)}
            { !isLoading && (
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input className="w-25" name="firstName"
                        name="firstName" placeholder="first name" type="text"
                        defaultValue={employee ? employee.firstName : ""}
                        onChange= {handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input className="w-25" name="lastName"
                        name="lastName" placeholder="last name" type="text"
                        defaultValue={employee ? employee.lastName : ""}
                        onChange= {handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Role</Label>
                    <Input className="w-25" name="role"
                        name="role" placeholder="role" type="text"
                        defaultValue={employee ? employee.role : ""}
                        onChange= {handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input className="w-25" name="email"
                        name="email" placeholder="email" type="email"
                        defaultValue={employee ? employee.email : ""}
                        onChange= {handleOnChange}
                    />
                </FormGroup>
                <Button color="primary">Add Employee</Button>
            </Form>
            )}
        </div>
        </div>
    )

}
export default EmployeeDetails;