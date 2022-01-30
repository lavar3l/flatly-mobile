import React from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image } from "react-native";
import { firstLine, secondLine } from "../common/helpers/addressConverter";

export default function BookingDetailsScreen({ route }: any) {
  const booking = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{booking.userData}</Text>
      <Text style={styles.content}>Check-in date: {booking.startDateTime}</Text>
      <Text style={styles.content}>Flat</Text>
      <Image style={styles.image} source={booking.flat.images[0]} />
      <Text style={styles.content}>Rooms: {booking.flat.rooms}</Text>
      <Text style={styles.content}>{firstLine(booking.flat.address)}</Text>
      <Text style={styles.content}>{secondLine(booking.flat.address)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2FDFF",
    alignItems: "center",
    justifyContent: "center",
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
