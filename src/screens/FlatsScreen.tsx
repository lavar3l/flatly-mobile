import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../common/types/types";
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Searchbar } from "react-native-paper";
import useFlats from "../modules/useFlats";
import { firstLine, secondLine } from "../common/helpers/addressConverter";

export default function FlatsScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const { flatsLoading, flats, fetchFlats, currentPage, totalPages } = useFlats();
  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    fetchFlats(null);
  }, []);

  const onPressHandler = (flat: undefined) => {
    navigation.navigate("FlatDetails", flat);
  };

  const renderItemHandler = ({ item }: any) => (
    <TouchableOpacity onPress={() => onPressHandler(item)} style={styles.item}>
      <Image style={styles.image} source={item.images[0]} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.content}>{item.rooms} rooms</Text>
      <Text style={styles.content}>{firstLine(item.address)}</Text>
      <Text style={styles.content}>{secondLine(item.address)}</Text>
    </TouchableOpacity>
  );

  const searchHandler = (query: string) => {
    setQueryText(query);
    if (query.length >= 3) {
      fetchFlats({
        page: 1,
        name: query,
        street: "",
        city: "",
      });
    } else fetchFlats(null);
  };

  const refreshHandler = () => {
    if (queryText.length >= 3)
      fetchFlats({
        page: 1,
        name: queryText,
        street: "",
        city: "",
      });
    else fetchFlats(null);
  };

  const loadMoreHandler = () => {
    if (currentPage < totalPages) {
      fetchFlats({
        page: currentPage + 1,
        name: queryText,
        street: "",
        city: "",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search..." onChangeText={searchHandler} value={queryText} />
      {flatsLoading ? (
        <ActivityIndicator size="large" color="#101935" />
      ) : (
        <FlatList
          style={{ width: "100%" }}
          data={flats}
          renderItem={renderItemHandler}
          keyExtractor={(flat) => (flat.id ? flat.id.toString() : "0")}
          ListHeaderComponent={<Text style={styles.fetchText}>Fetched flats: {flats.length}</Text>}
          onRefresh={refreshHandler}
          refreshing={flatsLoading}
          onEndReached={loadMoreHandler}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
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
  image: {
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
