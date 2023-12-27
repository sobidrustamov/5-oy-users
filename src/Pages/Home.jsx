import { Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      let { data } = await axios.get("http://localhost:3000/users");

      if (isUnmounted) return;
      setUsers(data);
    })();
    return () => {
      isUnmounted = true;
    };
  }, [setUsers]);

  async function deleteUser(id) {
    await axios.delete(`http://localhost:3000/users/${id}`);

    let { data } = await axios.get("http://localhost:3000/users");
    setUsers(data);
    console.log(data);
  }

  async function createUser(e) {
    // e.preventDefault();
    let first_name = e.target[0].value;
    let last_name = e.target[1].value;
    let email = e.target[2].value;
    let newUser = { first_name, last_name, email };

    let { data } = await axios.post("http://localhost:3000/users", newUser);
    console.log(data);
    setUsers(data);
  }

  return (
    <div className="bg-secondary-subtle">
      <h1 className="text-center py-3 display-2">Users</h1>
      <Container className="d-flex ">
        <table className="table w-75">
          <thead>
            <tr>
              <th>T/r</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td className="d-flex gap-3">
                    <button className="btn btn-success">Edit</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <form className="p-2 w-25" onSubmit={createUser}>
          <h2 className="text-center">Create User</h2>
          <input
            type="text"
            placeholder="First Name"
            className="form-control my-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="form-control my-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="form-control my-2"
          />
          <button type="submit" className="btn btn-warning my-2">
            Create
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Home;
