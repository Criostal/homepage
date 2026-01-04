import React, { useEffect, useState } from 'react';
import { GetAspUrl } from './links';
import '../styles/asplinks.css';
import { AspLink } from './AspLink';
import Toast from './Toast';

const LinksSiteAdd: React.FC = () => {

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const addBookmark = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const titleInput = form.querySelector('#title-input') as HTMLInputElement;
        const urlInput = form.querySelector('#url-input') as HTMLInputElement;
        const descriptionInput = form.querySelector('#description-input') as HTMLInputElement;

        const title = titleInput.value;
        const url = urlInput.value;
        const description = descriptionInput.value;

        const newBookmark: AspLink = {
            id: '',
            url: url,
            title: title,
            description: description,
            createdAt: new Date(),
            category: ''
        };

        await PostBookmark(newBookmark);

        // Clear form fields after submission
        titleInput.value = '';
        urlInput.value = '';
        descriptionInput.value = '';
    };

    async function PostBookmark(params:AspLink) {
      try  {
        const response = await fetch(GetAspUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            setToastMessage(`Fehler beim Hinzufügen des Lesezeichens. ${response.statusText}`);
            throw new Error(`Error adding bookmark: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Bookmark added successfully:', data);
    } catch (error) {
        console.error('Error adding bookmark:', error);
      }
    }
    

return (

      <div className="link-manager">
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

            <div className="text">
            <h1>Add bookmark</h1>
            </div>

            <form onSubmit={addBookmark} className="input-form">

                <div className="form-group">
                    <label htmlFor="title-input">Title</label>
                    <input id="title-input" type="text" placeholder="Enter title" />
                </div>

                <div className="form-group">
                    <label htmlFor="url-input">URL</label>
                    <input id="url-input" type="text" placeholder="https://example.com" />
                </div>

                <div className="form-group">
                    <label htmlFor="description-input">Description</label>
                    <input id="description-input" type="text" placeholder="Enter description" />
                </div>
                <button type="submit" className='button'>Add Bookmark</button>
            </form>

            
        </div>
    );
}

export default LinksSiteAdd;