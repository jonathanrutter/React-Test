import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AppNavbar from'./AppNavbar';
import Home from'./Home';
import EmployeePage from'./EmployeePage';
import EmployeeDetails from'./EmployeeDetails';

function App() {

    return (
        <BrowserRouter>
            <div>
                <AppNavbar title='Home'/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/help" element={<h1>Help Page</h1>} />
                        <Route path="/employees" element={<EmployeePage />} />
                        <Route path="/employee" element={<EmployeeDetails />} />
                        <Route path="/employee/:id" element={<EmployeeDetails />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )

}
export default App;