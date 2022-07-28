import AsyncStorage from "@react-native-async-storage/async-storage";

export const save = async (text, createdAt) => {
  const key = `${createdAt}`;
  const value = JSON.stringify({
    text,
    createdAt,
  });

  await AsyncStorage.setItem(key, value);
};
