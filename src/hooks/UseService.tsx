import { useState, useEffect } from "react";


export function useService<T>(serviceFn: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const result = await serviceFn();
                if (mounted) setData(result);
            } catch (err) {
                if (mounted) setError(err as Error);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };

    }, [serviceFn]);

    return { data, loading, error };
}