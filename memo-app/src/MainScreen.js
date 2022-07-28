import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FAB, List } from "react-native-paper";
import { loadAll } from "./store";

export const MainScreen = () => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    const initialize = async () => {
      const newMemos = await loadAll();
      setMemos(newMemos);
    };
    const unsubscribe = navigation.addListener("focus", initialize);
    return unsubscribe;
  }, [navigation]);
  const onPressAdd = () => {
    navigation.navigate("Compose");
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos}
        keyExtractor={(item) => `${item.createdAt}`}
        renderItem={({ item }) => (
          <List.Item
            title={item.text}
            titleNumberOfLines={5}
            description={`作成日時: ${format(
              item.createdAt,
              "yyyy.MM.dd HH:mm"
            )}`}
            descriptionStyle={{ textAlign: "right" }}
          />
        )}
      />
      <FAB
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
