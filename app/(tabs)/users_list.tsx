import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native"; // for React Native
import "../../global.css"; // for Tailwind CSS

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
        <View className="flex-1 bg-gray-100 p-5">
            {/* Refresh Button */}
            <View className="mb-4">
                <Button title="🔄 Refresh Users" onPress={loadUsers} />
            </View>

            {/* Loading State */}
            {loading ? (
                <Text className="text-blue-500 text-center text-lg font-semibold">
                    Loading...
                </Text>
            ) : (
                <ScrollView className="space-y-3">
                    {users.map((user) => (
                        <View
                            key={user.id}
                            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"
                        >
                            <Text className="text-lg font-bold text-gray-800">
                                {user.name}
                            </Text>
                            <Text className="text-gray-500">{user.email}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default UsersList;
