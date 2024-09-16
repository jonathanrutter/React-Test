import * as React from 'react';
import { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function CreateDialog({isNew, attributes, createFn, employee, updateFn}:{isNew: boolean, attributes: any, createFn?:any, employee?: any, updateFn?:any}) {

    const [show, setShow] = useState(false);

    var nodeRefsMap = new Map();
    attributes.forEach(attribute => {
        let myRef = React.createRef();
        nodeRefsMap.set(attribute, myRef);
    }, this);

    const buttonLabel = isNew ? 'Create' : 'Update';
    const modalTitle = isNew ? 'Create New Employee' : 'Update Employee';

    function toggle() {
        setShow(!show);
    }

	function handleSubmit(e) {
		e.preventDefault();
		const updateEmployee = {};
		attributes.forEach(attribute => {
		    let ref = nodeRefsMap.get(attribute);
		    updateEmployee[attribute] = ref.current.value.trim();
		});

        if (isNew) {
		    createFn(updateEmployee);
        }
		else {
             updateFn(updateEmployee, employee.id);
		}

		// clear out the dialog's inputs
//         nodeRefsMap.values().forEach(ref => {
//             ref.current.value = '';
//         });
        for (let ref of nodeRefsMap.values()) {
            ref.current.value = '';
        }

		toggle();
	}

    const inputs = attributes.map(attribute =>

        <p key={attribute}>
            <input type="text"
                placeholder={attribute}
                ref={nodeRefsMap.get(attribute)}
                defaultValue={ isNew ? '' : employee[attribute]}
                className="field"/>
        </p>
    );

    return (
        <div>
            <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={show} toggle={toggle}>
              <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
              <ModalBody>
                <form>
                    {inputs}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>{buttonLabel}</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>
    )

}
export default CreateDialog;