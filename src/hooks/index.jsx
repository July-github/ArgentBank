import {useState, useEffect} from 'react'

function useFetch(url){
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        if(!url){
            return setIsDataLoading(true)
        }
        try {
            setIsDataLoading(true)
            fetch(url)
                .then(res => res.json())
                .then(res => res.data)
                .then((data) => setData(data))
                .then(() => {setError(false); setIsDataLoading(false)})
        } 
        catch (error) {
            return setError(true)
        }

        setIsDataLoading(false)

    }, [url])

    return(isDataLoading, error, data)
}

export default useFetch