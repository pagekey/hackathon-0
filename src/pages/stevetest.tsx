import { getContributions } from '@/lib/contributions';
import { useEffect } from 'react';


export default function SteveTestPage() {
    const runTest = async () => {
        console.log('sending request')
        const response = await fetch('/api/contributions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([
                // {
                //     provider: 'gitlab',
                //     username: 'jonstr.osdev',
                // },
                {
                    provider: 'github',
                    username: 'stephengrice',
                },
            ])
        });

        if (!response.ok) {
            throw new Error('Failed to fetch contributions');
        }

        const data = await response.json();
        console.log(data);
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
