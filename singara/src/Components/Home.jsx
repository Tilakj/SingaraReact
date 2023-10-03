import React, { useState, useEffect } from "react";

const Home = () => {
    const [values, setValues] = useState([]);
    const [newValue, setNewValue] = useState(""); 
    const [editValue, setEditValue] = useState(""); 
    const [editIndex, setEditIndex] = useState(-1); 
    const baseUrl = "https://singaraapi.com/singaraapi"
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
                body:JSON.stringify({ Value: newValue }),
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

    const handleEdit = (index) => {
        if (editValue && index >= 0) {
            fetch(`${baseUrl}/api/home/${index}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Value: editValue }),
            })
                .then(() => {
                    fetchData();
                    setEditValue("");
                    setEditIndex(-1);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleDelete = (index) => {
        console.log(index)
        if (index >= 0) {
            fetch(`${baseUrl}/api/home/${index}`, {
                method: "DELETE",
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
        <div>
            <ul>
                {console.log(values)}
                <input
                    type="text"
                    placeholder="New Value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                />
                <button onClick={handleCreate}>Create</button>
                {values.map((item,i)=>(
                    <li key={i}>
                        {item.Value}
                        <button onClick={()=>handleDelete(item.Id)}>Delete</button>
                        </li>
                      
                    ))}
             </ul>
        </div>
    );
};

export default Home;
