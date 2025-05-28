//v2
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Importation du fichier CSS

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchUsers = () => {
    axios.get("http://localhost:5174/user-management-db")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Erreur lors du chargement des utilisateurs:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    if (!name || !email || !age || !role) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const userData = { name, email, age, role };

    if (editId) {
      axios.put(`http://localhost:5174/user-management-db/${editId}`, userData)
        .then(() => {
          fetchUsers();
          resetForm();
        })
        .catch(error => console.error("Erreur lors de la modification:", error));
    } else {
      axios.post("http://localhost:5174/user-management-db", userData)
        .then(response => {
          setUsers([...users, response.data]);
          resetForm();
        })
        .catch(error => console.error("Erreur lors de l'ajout:", error));
    }
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5174/user-management-db/${id}`)
      .then(() => fetchUsers())
      .catch(error => console.error("Erreur lors de la suppression:", error));
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
    setRole(user.role);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setEmail("");
    setAge("");
    setRole("");
  };

  return (
    <div className="container">
      <h1>Gestion des utilisateurs</h1>

      <div className="form-group">
        <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="number" placeholder="Âge" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="text" placeholder="Rôle (Admin/User)" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>

      <button onClick={handleSubmit} className="btn-add">
        {editId ? "Modifier" : "Ajouter"}
      </button>

      <h2>Liste des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Âge</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age} ans</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => startEdit(user)} className="btn-edit">✏️</button>
                <button onClick={() => deleteUser(user.id)} className="btn-delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
