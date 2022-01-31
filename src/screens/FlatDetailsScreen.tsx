import React, { useState, useRef } from "react";
import { Text, View } from "../components/Themed";
import { firstLine, secondLine } from "../common/helpers/addressConverter";
import { Flat } from "../common/types/Flat";
import { StyleSheet, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

export default function FlatDetailsScreen({ route }: any) {
  const flat = route.params;

  const [indexSelected, setIndexSelected] = useState(0);
  const onSelect = (indexSelected: number) => {
    setIndexSelected(indexSelected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{flat.name}</Text>
      <View style={styles.gallery}>
        <Carousel
          layout="default"
          data={flat.images}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => onSelect(index)}
          renderItem={({ item, index }: any) => (
            <Image
              key={index}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
              source={{ uri: item.path }}
            />
          )}
        />
        <Pagination
          inactiveDotColor="#263238"
          dotColor={"#C2185B"}
          activeDotIndex={indexSelected}
          dotsLength={flat.images.length}
          animatedDuration={200}
          inactiveDotScale={1}
        />
      </View>
      <Text style={styles.header}>Address</Text>
      <Text style={styles.content}>{firstLine(flat.address)}</Text>
      <Text style={styles.content}>{secondLine(flat.address)}</Text>
      <Text style={styles.header}>Details</Text>
      <Text style={styles.content}>Rooms: {flat.rooms}</Text>
      <Text style={styles.content}>Area: {flat.area} m²</Text>
      <Text style={styles.content}>
        Facilites: {flat.facilities.map((item: Flat) => item.name).join(", ")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
  },
  gallery: {
    paddingTop: 10,
    width: width,
    height: 300,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
  },
  header: {
    marginTop: 5,
    paddingLeft: 30,
    fontSize: 20,
  },
  content: {
    marginBottom: 2,
    paddingLeft: 30,
    fontSize: 16,
  },
});
