import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { View, StyleSheet, FlatList } from "react-native";
import { FAB, List } from "react-native-paper";

const memos = [
  { text: "メモメモメモ", createdAt: 1658971800000 },
  { text: "メモメモメモ", createdAt: 1658979000000 },
  {
    text: "長いメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ",
    createdAt: 1658806200000,
  },
  { text: "メモメモメモ", createdAt: 1658719800000 },
  { text: "メモメモメモ", createdAt: 1658707200000 },
];

export const MainScreen = () => {
  const navigation = useNavigation();
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
