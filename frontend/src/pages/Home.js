import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Table from "react-bootstrap/Table";


function Home() {
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchUsers = async () => {
    try {
      const url = "http://localhost:8080/api/users";
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      const usersWithSerial = data.map((user, index) => ({
        ...user,
        serialNumber: index + 1,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));
      setUsers(usersWithSerial);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="homepage">
      {loading ? (
        <div className="loading-message">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="userData">
          <h1>Welcome {loggedInUser}</h1>
          <button onClick={handleLogout}>Logout</button>
          <div className="userTable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr no.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.serialNumber}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.dateofbirth}</td>
                    <td>{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default Home;
