import { useState, useEffect } from 'react';
const useFetch = (url) => {

    const [data, setblogs] = useState(null)
    const [isPending, setisPending] = useState(true)
    const [error, seterror] = useState(null)


    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
        .then(res => {
            if (!res.ok){
                throw Error('Could not fetch data');
            }
            return res.json();
        })
        .then(data => {
            setblogs(data);
            setisPending(false);
            seterror(false);
        })
        .catch(err => {
            if (err.name === 'AbortErro'){
                console.log('fetch aborted')
            } else {
            setisPending(false);
            seterror(err.message);
            }
        })
        return () => abortCont.abort();
    }, [url]);
    return { data, isPending, error }
}

export default useFetch;