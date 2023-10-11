import React, { useState, useEffect } from "react";
import '../Styles/Components/Home.scss'

const Home = () => {
    const [values, setValues] = useState([]);
    const [newValue, setNewValue] = useState(""); 
    const [editedValue, setEditedValue] = useState(""); 
    const [editMode, setEditMode] = useState(null);
    const baseUrl = "https://backend.singara.org";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`${baseUrl}/api/home`)
            .then((res) => res.json())
            .then((res) => {
                setValues(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCreate = () => {
        if (newValue) { 
            fetch(`${baseUrl}/api/home`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Value: newValue }),
            })
                .then(() => {
                    fetchData();
                    setNewValue("");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleEdit = (id, value) => {
        // Check if the item is already in edit mode
        if (editMode === id) {
            // Save the edited value and exit edit mode
            fetch(`${baseUrl}/api/home/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Value: editedValue }),
            })
                .then(() => {
                    fetchData();
                    setEditedValue("");
                    setEditMode(null);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // Enter edit mode
            setEditMode(id);
            setEditedValue(value);
        }
    };

    const handleDelete = (id) => {
        if (id) {
            fetch(`${baseUrl}/api/home/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(() => {
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="container">
            <ul>
                <input
                    type="text"
                    placeholder="New Value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                />
                <button className={"save"} onClick={handleCreate}>Create</button>
                {values.map((item, i) => (
                    <li key={i}>
                        {editMode === item.Id ? (
                            <input
                                type="text"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                            />
                        ) : (
                            item.Value
                        )}
                        <button  className={editMode === item.Id ? "save":"edit"} onClick={() => handleEdit(item.Id, item.Value)}>
                            {editMode === item.Id ? "Save" : "Edit"}
                        </button>
                        <button className={"delete"}onClick={() => handleDelete(item.Id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
