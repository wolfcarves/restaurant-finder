import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number) {
    const [debouceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouceValue;
}
