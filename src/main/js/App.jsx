import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AppNavbar from'./AppNavbar';
import EmployeePage from'./EmployeePage';

function App() {

    return (
        <div>
            <AppNavbar title='Home'/>
            <div className="content">
                <EmployeePage></EmployeePage>
            </div>
        </div>
    )

}
export default App;