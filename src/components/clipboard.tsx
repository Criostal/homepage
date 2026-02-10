import React, { useEffect, useState } from 'react';
import Toast from './Toast';
import '../styles/clipboard.css';


const Clipboard: React.FC = () => {

 const API_URL = 'http://mfoijwtgcugfpx87.myfritz.net:5010/text';

    async function fetchClipboardText(): Promise<string> {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Network response was not ok ${response.status}`);
            }
            const data = await response.text();
            return data;
        } catch (error: any) {
            console.error('Error fetching clipboard text:', error);
            throw error;
        }
    }

    async function updateClipboardText(text: string): Promise<void> {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: text,
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok ${response.status} ${response.statusText}`);
            }
        } catch (error: any) {
            console.error('Error updating clipboard text:', error);
            setToastMessage(`Fehler: ${error?.message ?? String(error)}`);
        }
    }

    const [clipboardText, setClipboardText] = useState<string>('Lade Clipboard...');
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    useEffect(() => {
        fetchClipboardText()
            .then(text => setClipboardText(text))
            .catch(error => {
                console.error('Error fetching clipboard text:', error);
                setClipboardText(`Fehler: ${error?.message ?? String(error)}`);
            });
    }, []);

    async function reloadClipboard(): Promise<void> {
        setIsLoading(true);
        try {
            const text = await fetchClipboardText();
            setClipboardText(text);
            setToastMessage('Clipboard neu geladen');
        } catch (error: any) {
            console.error('Error reloading clipboard text:', error);
            setClipboardText(`Fehler: ${error?.message ?? String(error)}`);
            setToastMessage(`Fehler: ${error?.message ?? String(error)}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="clipboard-container">
            <div className="clipboard-controls">
                <button
                    className="reload-button"
                    onClick={reloadClipboard}
                    disabled={isLoading}
                >
                    {isLoading ? 'Lädt…' : 'Neu laden'}
                </button>
            </div>
            <textarea 
                className="clipboard-text"
                value={clipboardText}
                onChange={(e) => {
                    const newText = e.target.value;
                    setClipboardText(newText);
                    updateClipboardText(newText);
                }}
            />
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        </div>
    );

}

export default Clipboard;
