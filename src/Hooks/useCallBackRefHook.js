import { useCallback, useState } from 'react';

export default function useCallbackRefHook() {
    const [ref, setRef] = useState(null);

    const callbackRef = useCallback(node => {
        if (node) {
            setRef(node);
        }
    }, []);

    return { ref, callbackRef };
}