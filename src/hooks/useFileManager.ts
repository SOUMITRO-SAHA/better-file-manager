import * as React from "react";

interface UseSystemProps {
    // Define props here
}

interface UseSystemReturn {
    // Define return type here
}

const useFileManager = (props: UseSystemProps): UseSystemReturn => {
    const [state, setState] = React.useState<Type | null>(null);

    // --- Effects
    React.useEffect(() => {}, []);

    return state;
};

export default useFileManager;
