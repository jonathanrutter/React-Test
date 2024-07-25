const React = require('react');
const ReactDOM = require('react-dom');

import App from'./App';

import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
	    <App />
	</React.StrictMode>,
	document.getElementById('react')
)