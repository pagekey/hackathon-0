import { getContributions } from '@/lib/contributions';
import { useEffect } from 'react';


export default function SteveTestPage() {
    const runTest = async () => {
        const contribs = await getContributions('gitlab', 'stephengrice');
        console.log(contribs);
    };
    useEffect(() => {
        runTest();
    }, []);
    return (
        <>
            Steve test page
        </>
    );
}
