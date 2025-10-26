import React, { useEffect, useState } from 'react';
import '../styles/linkmanager.css';

type Link = {
    id: number;
    title: string;
    url: string;
};

const API_URL = 'http://mfoijwtgcugfpx87.myfritz.net:5000/api/links';

const LinkManager: React.FC = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Links laden
    const fetchLinks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Fehler beim Laden der Links');
            const data = await res.json();
            if (!Array.isArray(data.data)) {
                throw new Error('Unerwartetes Datenformat');
            }
            setLinks(data.data);
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    // Link hinzufügen
    const addLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, url }),
            });
            if (!res.ok) throw new Error('Fehler beim Hinzufügen');
            setTitle('');
            setUrl('');
            fetchLinks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Link löschen
    const deleteLink = async (id: number) => {
        setError(null);
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Fehler beim Löschen');
            fetchLinks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="linkmanager-container">
            <h2>Linkverwaltung</h2>
            <form onSubmit={addLink} className="linkmanager-form">
                <input
                    type="text"
                    placeholder="Titel"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <input
                    type="url"
                    placeholder="URL"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    required
                />
                <button type="submit">Hinzufügen</button>
            </form>
            {error && <div className="linkmanager-error">{error}</div>}
            {loading ? (
                <div>Lade Links...</div>
            ) : (
                <ul className="linkmanager-list">
                    {links.map(link => (
                        <li key={link.id} className="linkmanager-list-item">
                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                            <button className="delete-btn" onClick={() => deleteLink(link.id)}>Löschen</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LinkManager;