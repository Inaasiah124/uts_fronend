import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [npm, setNpm] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getMahasiswa();
  }, []);

  const getMahasiswa = async () => {
    try {
      const token = localStorage.getItem('token'); // Ensure token is set
      const response = await axios.get('http://localhost:4000/api/mahasiswa', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Fetched mahasiswa:", response.data); // Log the entire response
      setMahasiswa(response.data.mahasiswa); // Adjust this line based on the actual response structure
    } catch (error) {
      console.error("Error fetching mahasiswa:", error);
    }
  };
  const addMahasiswa = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/mahasiswa', { npm, nama, kelas }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getMahasiswa();
      setNpm("");
      setNama("");
      setKelas("");
    } catch (error) {
      console.error("Error adding mahasiswa:", error);
    }
  };

  const editMahasiswa = (id) => {
    setEditingId(id);
    const student = mahasiswa.find(m => m.id === id);
    setNpm(student.npm);
    setNama(student.nama);
    setKelas(student.kelas);
  };

  const updateMahasiswa = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/mahasiswa/${editingId}`, { npm, nama, kelas }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getMahasiswa();
      setEditingId(null);
      setNpm("");
      setNama("");
      setKelas("");
    } catch (error) {
      console.error("Error updating mahasiswa:", error);
    }
  };

  const deleteMahasiswa = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/mahasiswa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getMahasiswa();
    } catch (error) {
      console.error("Error deleting mahasiswa:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={editingId !== null ? updateMahasiswa : addMahasiswa}>
          <div className="field">
            <label className="label">NPM</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={npm}
                onChange={(e) => setNpm(e.target.value)}
                placeholder="NPM"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Kelas</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                placeholder="Kelas"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                {editingId !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>

        <table className="table is-striped is-fullwidth mt-5">
          <thead>
            <tr>
              <th>No</th>
              <th>NPM</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.npm}</td>
                <td>{student.nama}</td>
                <td>{student.kelas}</td>
                <td>
                  <button onClick={() => editMahasiswa(student.id)} className="button is-small is-info mr-1">Edit</button>
                  <button onClick={() => deleteMahasiswa(student.id)} className="button is-small is-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;