import React, { useEffect, useState } from 'react';
import { GetAspUrl } from './links';
import '../styles/asplinks.css';
import { BugOff } from 'lucide-react';

interface AspLink {
    id: string;
    url: string;
    title: string;
    description: string;
    createdAt: Date;
}

const LinksSiteAsp: React.FC = () => {

    const [asplinks, setLinks] = useState<AspLink[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [count, setCount] = useState(0);

    async function fetchAspLinks(): Promise<AspLink[]> {
        

        try {
            const response = await fetch(GetAspUrl());
            if(!response.ok) {
                throw new Error(`Network response was not ok ${response.status}`);
            }
            const data = await response.json();
            return data;
        
        } catch  (error: any) {
            console.error('Error fetching ASP links:', error);
            throw error;
        }
    }

    async function addUrl(title: string, url: string, description: string) {
        // Placeholder function for adding a URL
        alert('Add Bookmark functionality is not implemented yet.');
    }

    
    useEffect(() => {
        fetchAspLinks()
            .then(fetchedLinks => setLinks(Array.isArray(fetchedLinks) ? fetchedLinks : []))
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
            <div className="text">
            <h1>bookmarks</h1>
            </div>
            <div className="input-box">
                <div className="item-content">
                    <div className = "Text">
                        <p className="desc">enter url</p>
                        <input id="title-input" type="text" placeholder="title" />
                        <input id="url-input" type="text" placeholder="https://example.com" />
                        <input id="description-input" type="text" placeholder="description" />
                        <button className='button' >Add Bookmark</button>
                        <p>Count: {count}</p>
                        <button className='button' onClick={() => setCount(count +1)} />
                    </div>
                </div>
            </div>
            <div className="link-grid">
                {asplinks.length === 0 ? (
                    <p>Keine Links gefunden.</p>
                ) : (
                    <div className="grid">
                        {asplinks.map((link, idx) => (
                            <div className="grid-item" key={link.id}>
                                <div className="item-content">
                                    <div className="text">
                                        <h3>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                                        </h3>
                                        {link.description && <p className="desc">{link.description}</p>}
                                    </div>
                                    <div className="actions">
                                        <a className="open-btn" href={link.url} target="_blank" rel="noopener noreferrer">Öffnen</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LinksSiteAsp; 
