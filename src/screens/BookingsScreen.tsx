import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../common/types/types";
import React, { useEffect } from "react";
import { StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import useBookings from "../modules/useBookings";

export default function BookingsScreen({ navigation }: RootTabScreenProps<"TabTwo">) {
  const { bookingsLoading, bookings, fetchBookings, currentPage, totalPages } = useBookings();

  useEffect(() => {
    fetchBookings(null);
  }, []);

  const onPressHandler = (booking: undefined) => {
    navigation.navigate("BookingDetails", booking);
  };

  const renderItemHandler = ({ item }: any) => (
    <TouchableOpacity onPress={() => onPressHandler(item)} style={styles.item}>
      <Image style={styles.image} source={require("./images/1.jpg")} />
      <View style={styles.description}>
        <Text style={styles.title}>{item.userData}</Text>
        <Text style={styles.content}>Flat: {item.flat.name}</Text>
        <Text style={styles.content}>Check-in date: {item.startDateTime}</Text>
      </View>
    </TouchableOpacity>
  );

  const refreshHandler = () => {
    fetchBookings(null);
  };

  const loadMoreHandler = () => {
    if (currentPage < totalPages) {
      fetchBookings(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      {bookingsLoading ? (
        <ActivityIndicator size="large" color="#101935" />
      ) : (
        <FlatList
          style={{ width: "100%" }}
          data={bookings}
          renderItem={renderItemHandler}
          keyExtractor={(booking) => (booking.id ? booking.id.toString() : "0")}
          ListHeaderComponent={
            <Text style={styles.fetchText}>Fetched bookings: {bookings.length}</Text>
          }
          onRefresh={refreshHandler}
          refreshing={bookingsLoading}
          onEndReached={loadMoreHandler}
          onEndReachedThreshold={0.5}
          initialNumToRender={0}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#E0E0E0",
    borderColor: "#C2185B",
    borderWidth: 2,
    borderRadius: 10,
  },
  description: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
  image: {
    width: 84,
    height: 63,
  },
  title: {
    fontSize: 20,
  },
  content: {
    fontSize: 12,
  },
  fetchText: {
    fontSize: 12,
    textAlign: "center",
  },
});
