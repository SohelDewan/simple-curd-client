import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loaderUsers = useLoaderData();
  const [users, setUsers] = useState(loaderUsers);

  const handleDelete = (_id) => {
    console.log("delete", _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("delete", data);
        if (data.deletedCount > 0) {
          alert("It will delete", data);
          const remaining = users.filter((user) => user._id !== _id);
          setUsers(remaining);
        }
      });
  };
  return (
    <div>
      <h2>Total users: {users.length}</h2>

      {users.map((user) => (
        <div key={user._id}>
          <h3>
            {user.name}, {user.email},{user._id}
            <Link to={`/update/${user._id}`}>
              <button className="ml-5">Update</button>
            </Link>
            <button onClick={() => handleDelete(user._id)}>x</button>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Users;
