import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../common/types/types";
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Searchbar } from "react-native-paper";
import useBookings from "../modules/useBookings";

export default function BookingsScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const { bookingsLoading, bookings, fetchBookings } = useBookings();
  const [queryText, setQueryText] = useState("");
  const [fullQueryState, setFullQueryState] = useState(true);

  useEffect(() => {
    fetchBookings(null);
  }, []);

  const onPressHandler = (item: any) => {
    navigation.navigate("BookingDetails", item);
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
    if (query.length >= 3) fetchBookings();
    else if (fullQueryState === false) fetchBookings(null);
  };

  const refreshHandler = () => {
    if (queryText.length >= 3) fetchBookings();
    else if (fullQueryState === false) fetchBookings(null);
  };

  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search..." onChangeText={searchHandler} value={queryText} />
      {bookingsLoading ? (
        <ActivityIndicator size="large" color="#101935" />
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderItemHandler}
          keyExtractor={(item) => "${item.id}"}
          ListHeaderComponent={
            <Text style={styles.fetchText}>Fetched bookings: {bookings.length}</Text>
          }
          onRefresh={refreshHandler}
          refreshing={bookingsLoading}
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
