import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from'./App';

import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("react");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
	    <App />
	</StrictMode>
)