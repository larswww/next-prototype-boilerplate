import Canary from "./Canary";
import {useEffect, useState} from "react";

export const CanaryController = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/canary`);
                const json = await res.json();
                setLoading(false)
                setData(json);
            } catch (e) {
                setError(true)
            }
        };
        fetchData();
    }, [setData, setLoading]);

    return (
        <div>
            {loading && <p>Loading...</p>}

            {data && !loading && !error && <Canary message={data.message}/>}

            {error && <p>Error</p>}
        </div>
    )
}

export default CanaryController