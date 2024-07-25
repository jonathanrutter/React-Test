const React = require('react');
const ReactDOM = require('react-dom');

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateDialog extends React.Component {



	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = {
            modal: false
		};

		var nodeRefsMap = new Map();
		props.attributes.forEach(attribute => {
		    let myRef = React.createRef();
		    nodeRefsMap.set(attribute, myRef);
		}, this);
		console.log('nodeRefsMap Array size: ' + nodeRefsMap.size);

        this.state = {
            modal: false,
            nodeRefs: nodeRefsMap
        };

	}

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

	handleSubmit(e) {
		e.preventDefault();
		const employee = {};
		this.props.attributes.forEach(attribute => {
		    let ref = this.state.nodeRefs.get(attribute);
		    employee[attribute] = ref.current.value.trim();
		});

        if (this.props.isNew) {
		    this.props.createFn(employee);
        }
		else {
             this.props.updateFn(employee, this.props.employee.id);
		}

		// clear out the dialog's inputs
        this.state.nodeRefs.values().forEach(ref => {
            ref.current.value = '';
        });
//		this.props.attributes.forEach(attribute => {
//			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
//		});

		this.toggle();
	}

	render() {
	    const buttonLabel = this.props.isNew ? 'Create' : 'Update';
	    const modalTitle = this.props.isNew ? 'Create New Employee' : 'Update Employee';

		const inputs = this.props.attributes.map(attribute =>

			<p key={attribute}>
				<input type="text"
				    placeholder={attribute}
				    ref={this.state.nodeRefs.get(attribute)}
				    defaultValue={ this.props.isNew ? '' : this.props.employee[attribute]}
				    className="field"/>
			</p>
		);

		return (
			<div>
                <Button color="primary" onClick={this.toggle}>{buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
                  <ModalBody>
                    <form>
                        {inputs}
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>{buttonLabel}</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
			</div>
		)
	}
}
export default CreateDialog;