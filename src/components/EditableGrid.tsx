import React, { useState } from 'react';

const EditableGrid = () => {
    const initialData = [
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 34 },
        { id: 3, name: 'Alice Johnson', age: 25 },
    ];

    const [data, setData] = useState(initialData);
    const [editingItem, setEditingItem] = useState<{ id: number; name: string; age: number } | null>(null);

    const handleEdit = (id: number, field: string, value: string) => {
        const updatedData = data.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setData(updatedData);
    };

    const openEditForm = (item: { id: number; name: string; age: number }) => {
        setEditingItem(item);
    };

    const closeEditForm = () => {
        setEditingItem(null);
    };

    const handleFormChange = (field: string, value: string) => {
        if (editingItem) {
            setEditingItem({ ...editingItem, [field]: value });
        }
    };

    const saveChanges = () => {
        if (editingItem) {
            handleEdit(editingItem.id, 'name', editingItem.name);
            handleEdit(editingItem.id, 'age', editingItem.age.toString());
            closeEditForm();
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>age</th>
                        <th>edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>
                                <button onClick={() => openEditForm(item)}>Bearbeiten</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingItem && (
                <div className="edit-form">
                    <h3>Bearbeiten</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={editingItem.name}
                            onChange={(e) => handleFormChange('name', e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Alter:
                        <input
                            type="number"
                            value={editingItem.age}
                            onChange={(e) => handleFormChange('age', e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={saveChanges}>Speichern</button>
                    <button onClick={closeEditForm}>Abbrechen</button>
                </div>
            )}
        </div>
    );
};

export default EditableGrid;