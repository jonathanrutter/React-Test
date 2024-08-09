import {useState, useEffect} from 'react';

function useFetch(url) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [shouldRefetch, refetch] = useState({});

    useEffect(() => {
		console.log('useEffect triggered');
        setTimeout(loadFromServer, 1000);
    }, [url, shouldRefetch]);

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
	        setError(false);
            setData(body);
            setIsLoading(false);
        }
        else {
            setError('Load failed at URL: ' + url + '. With error code: ' + response.status);
            setIsLoading(false);
        }
	}

    return {data, isLoading, error, refetch};
}
export default useFetch;