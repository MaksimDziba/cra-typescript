import { useState, useCallback, useEffect } from "react";

export interface UseAsyncProps {
    asyncFn: () => Promise<any>;
}

const useAsync = ({ asyncFn }: UseAsyncProps) => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoadingStatus] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetch = useCallback(() => {
        return asyncFn()
            .then((data) => {
                setData(data);
                setLoadingStatus(false);
            })
            .catch((err) => {
                setError(err.response?.message);
                setLoadingStatus(false);
            });
    }, [asyncFn]);

    useEffect(() => {
        setLoadingStatus(true);
        fetch();
    }, [fetch]);

    return {
        data: data,
        error: error,
        isLoading: isLoading,
        loadData: fetch,
    };
};

export default useAsync;
