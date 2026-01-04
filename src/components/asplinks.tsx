import React, { useEffect, useState } from 'react';
import Toast from './Toast';
import { GetAspUrl } from './links';
import '../styles/asplinks.css';
import { BugOff } from 'lucide-react';
import { AspLink } from './AspLink';

const LinksSiteAsp: React.FC = () => {

    const [asplinks, setLinks] = useState<AspLink[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
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
            .catch(error => {
                console.error('Error fetching ASP links:', error);
                const msg = error?.message ?? String(error);
                setError(msg);
                // show unobtrusive toast message
                setToastMessage(`Fehler beim Laden der Links: ${msg}`);
            });
    }, []);

    // deterministic pastel background color generator based on category string
    function categoryToBg(category: string) {
        if (!category) return '#ffffff';
        let hash = 0;
        for (let i = 0; i < category.length; i++) {
            hash = category.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash) % 360;
        return `hsl(${hue}, 70%, 92%)`;
    }



    if(error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="link-manager">
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
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
