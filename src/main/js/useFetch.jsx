import {useState, useEffect} from 'react';

function useFetch(url) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const [error, setError] = useState([]);

    useEffect(() => {
		console.log('useEffect triggered');
        setTimeout(loadFromServer, 1000);
    }, [url]);

	async function loadFromServer() {
	    console.log("starting data loading");
	    const response = await fetch(url)
	        // this catch on catches network errors, not response errors
	        .catch(err => {
	            setError(err.message);
                setIsLoading(false);
	        });
        if (response.ok) {
            const body = await response.json();
            setData(body);
            setIsLoading(false);
        }
        else {
            setError('Load failed at URL: ' + url + '. With error code: ' + response.status);
            setIsLoading(false);
        }
	}

    return {data, isLoading, error};
}
export default useFetch;