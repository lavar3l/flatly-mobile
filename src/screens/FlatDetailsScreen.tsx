import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image } from "react-native";

const FLAG_SOURCE = "https://flagcdn.com/84x63/";

export default function FlatDetailsScreen({ route }: any) {
  const item = route.params;
  const flag_uri = FLAG_SOURCE + item.cca2.toLowerCase() + ".png";

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: flag_uri }}></Image>
      <Text style={styles.title}>{item.name.common}</Text>
      <Text style={styles.content}>Official name: {item.name.official}</Text>
      <Text style={styles.content}>Region: {item.region}</Text>
      <Text style={styles.content}>Subregion: {item.subregion}</Text>
      <Text style={styles.content}>Capital: {item.capital}</Text>
      <Text style={styles.content}>Area: {item.area} km²</Text>
      <Text style={styles.content}>Population: {item.population}</Text>
      <Text style={styles.content}>Start of the week: {item.startOfWeek}</Text>
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
