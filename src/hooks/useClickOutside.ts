import { useEffect, useRef } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement>(handler: Handler): React.RefObject<T | null> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref.current;

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [handler]);

    return ref;
}
