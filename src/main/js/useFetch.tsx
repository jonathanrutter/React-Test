import {useState, useEffect} from 'react';

function useFetch(url, ignoreLoad) {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [shouldRefetch, refetch] = useState({});

    useEffect(() => {
		console.log('useEffect triggered');
		if (ignoreLoad) {
		    setIsLoading(false);
		}
		else {
            const abortController = new AbortController();
            const signal = abortController.signal;

            //1sec delay to simulate remote server
            setTimeout(() => (loadFromServer(signal)), 1000);
            return () => abortController.abort();
        }
    }, [url, shouldRefetch]);

	async function loadFromServer(signal) {
	    console.log("starting data loading");
	    const response = await fetch(url, {signal: signal})
	        // this catch on catches network errors, no response errors
	        .catch(err => {
	            if (err.name === 'AbortError') {
	                console.log('useFetch aborted');
	            }
	            else {
                    setError(err.message);
                    setIsLoading(false);
                }
	        });
        if (response && response.ok) {
            const body = await response.json();
	        setError(false);
            setData(body);
            setIsLoading(false);
        }
        else if (response) {
            setError('Load failed at URL: ' + url + '. With error code: ' + response.status);
            setIsLoading(false);
        }
	}

    return {data, isLoading, error, refetch};
}
export default useFetch;