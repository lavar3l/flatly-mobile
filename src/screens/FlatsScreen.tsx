import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../common/types/types";
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Searchbar } from "react-native-paper";
import useFlats from "../modules/useFlats";

export default function FlatsScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const { flatsLoading, flats, fetchFlats } = useFlats();
  const [queryText, setQueryText] = useState("");
  const [fullQueryState, setFullQueryState] = useState(true);

  useEffect(() => {
    fetchFlats(null);
  }, []);

  const onPressHandler = (item: any) => {
    navigation.navigate("FlatDetails", item);
  };

  const renderItemHandler = ({ item }: any) => (
    <TouchableOpacity onPress={() => onPressHandler(item)} style={styles.item}>
      <Text style={styles.title}>
        {item.flag} {item.name.common}
      </Text>
    </TouchableOpacity>
  );

  const searchHandler = (query: string) => {
    setQueryText(query);
    if (query.length >= 3) fetchFlats(query);
    else if (fullQueryState === false) fetchFlats(null);
  };

  const refreshHandler = () => {
    if (queryText.length >= 3) fetchFlats(queryText);
    else if (fullQueryState === false) fetchFlats(null);
  };

  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search..." onChangeText={searchHandler} value={queryText} />
      {flatsLoading ? (
        <ActivityIndicator size="large" color="#101935" />
      ) : (
        <FlatList
          data={flats}
          renderItem={renderItemHandler}
          keyExtractor={(item) => "${item.id}"}
          ListHeaderComponent={<Text style={styles.fetchText}>Fetched flats: {flats.length}</Text>}
          onRefresh={refreshHandler}
          refreshing={flatsLoading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2FDFF",
    alignItems: "center",
  },
  content: {
    margin: 20,
    fontSize: 18,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#9AD4D6",
  },
  logo: {
    width: 84,
    height: 63,
  },
  title: {
    fontSize: 24,
  },
  fetchText: {
    fontSize: 12,
    textAlign: "center",
  },
});
