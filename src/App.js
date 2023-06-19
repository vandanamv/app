import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Navbar = styled.nav`
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.h1`
  margin: 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const UserCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
`;

const UserCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const UserCardName = styled.h2`
  margin: 0;
`;

const UserCardInfo = styled.p`
  margin-bottom: 5px;
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://reqres.in/api/users?per_page=12"
      );
      const usersWithInfo = response.data.data.map((user) => ({
        ...user,
        imageUrl: `https://source.unsplash.com/random/200x200/?person=${user.id}`,
        city: "City " + user.id,
        country: "Country " + user.id,
        phone: "Phone " + user.id
      }));
      setUsers(usersWithInfo);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Navbar>
        <Brand>My App</Brand>
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <UserCardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <UserCardImage src={user.imageUrl} alt={user.first_name} />
              <UserCardName>
                {user.first_name} {user.last_name}
              </UserCardName>
              <UserCardInfo>Email: {user.email}</UserCardInfo>
              <UserCardInfo>City: {user.city}</UserCardInfo>
              <UserCardInfo>Country: {user.country}</UserCardInfo>
              <UserCardInfo>Phone: {user.phone}</UserCardInfo>
            </UserCard>
          ))}
        </UserCardGrid>
      )}
    </div>
  );
};

export default App;
