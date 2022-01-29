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
      <Text style={styles.content}>
        Address
        <br />
        {firstLine(flat.address)}
        <br />
        {secondLine(flat.address)}
      </Text>
      <Text style={styles.content}>
        Details
        <br />
        Rooms: {flat.rooms}
        <br />
        Area: {flat.area}
        <br />
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
