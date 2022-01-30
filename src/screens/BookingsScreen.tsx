import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../common/types/types";
import React, { useEffect } from "react";
import { StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import useBookings from "../modules/useBookings";

export default function BookingsScreen({ navigation }: RootTabScreenProps<"TabTwo">) {
  const { bookingsLoading, bookings, fetchBookings } = useBookings();

  useEffect(() => {
    fetchBookings(null);
  }, []);

  const onPressHandler = (booking: undefined) => {
    navigation.navigate("BookingDetails", booking);
  };

  const renderItemHandler = ({ item }: any) => (
    <TouchableOpacity onPress={() => onPressHandler(item)} style={styles.item}>
      <Image style={styles.image} source={item.flat.images[0]} />
      <Text style={styles.title}>{item.userData}</Text>
      <Text style={styles.content}>Flat: {item.flat.name}</Text>
      <Text style={styles.content}>Check-in date: {item.startDateTime}</Text>
    </TouchableOpacity>
  );

  const refreshHandler = () => {
    fetchBookings(null);
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
