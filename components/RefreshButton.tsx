import { Pressable, Text } from "react-native";

export default function RefreshButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable testID='id_refresh_button'
      onPress={onPress}
      className="bg-blue-500 rounded-2xl px-4 py-3 active:bg-blue-600"
      android_ripple={{ color: "#2563eb", borderless: false }}
    >
      {({ pressed }) => (
        <Text
          className={`text-white font-semibold text-lg text-center ${
            pressed ? "opacity-80" : ""
          }`}
        >
          🔄 Refresh Users
        </Text>
      )}
    </Pressable>
  );
}
