import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native"; // for React Native

// (reusing the User type we defined earlier)
type User = {
  id: number;
  name: string;
  email: string;
};

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ reusable function to load users
  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers();
    setUsers(data);
    setLoading(false);
  };

  // runs once when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button title="Refresh Users" onPress={loadUsers} />

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        users.map((user) => (
          <Text key={user.id}>
            {user.name} – {user.email}
          </Text>
        ))
      )}
    </View>
  );
};

export default UsersList;
