import React from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image } from "react-native";
import { firstLine, secondLine } from "../common/helpers/addressConverter";
import { Flat } from "../common/types/Flat";

export default function FlatDetailsScreen({ route }: any) {
  const flat = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{flat.name}</Text>
      <Image style={styles.image} source={flat.images[0]} />
      <Text style={styles.content}>Address</Text>
      <Text style={styles.content}>{firstLine(flat.address)}</Text>
      <Text style={styles.content}>{secondLine(flat.address)}</Text>
      <Text style={styles.content}>Details</Text>
      <Text style={styles.content}>Rooms: {flat.rooms}</Text>
      <Text style={styles.content}>Area: {flat.area}</Text>
      <Text style={styles.content}>
        Facilites: {flat.facilities.map((item: Flat) => item.name).join(", ")}
      </Text>
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
