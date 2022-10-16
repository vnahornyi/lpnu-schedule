import { useEffect, useState } from 'react';

const useBrowser = () => {
    const [isBrowser, setBrowser] = useState(false);

    useEffect(() => setBrowser(true), []);

    return isBrowser;
}

export default useBrowser;
