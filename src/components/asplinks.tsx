import React, { useEffect, useState } from 'react';
import { GetAspUrl } from './links';

interface AspLink {
    id: string;
    url: string;
    title: string;
    description: string;
}

const LinksSiteAsp: React.FC = () => {

    async function fetchAspLinks(): Promise<AspLink[]> {
        
        try {

            const response = await fetch(GetAspUrl());

            if(!response.ok) {
                throw new Error('Network response was not ok ${response.status} ' );
            }

            const data = await response.json();
            return data.links;
        
        } catch  (error: any) {
            console.error('Error fetching ASP links:', error);
            throw error;
        }

    }

    const [asplinks, setLinks] = useState<AspLink[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        fetchAspLinks()
            .then(fetchedLinks => setLinks(fetchedLinks))
            .catch(error => 
                {console.error('Error fetching ASP links:', error)
                    setError(error.message);
                });
        }, []);

    if(error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="link-manager">
            <h1>asp Link Manager</h1>
            <div>
                {asplinks.map(link => (
                    <div key={link.id}>
                        <h3><a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a></h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LinksSiteAsp;