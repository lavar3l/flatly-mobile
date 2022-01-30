import React, { useState, useRef } from "react";
import { Text, View } from "../components/Themed";
import { firstLine, secondLine } from "../common/helpers/addressConverter";
import { Flat } from "../common/types/Flat";
import { StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const IMAGES = {
  image1: require("./images/1.jpg"),
  image2: require("./images/2.jpg"),
  image3: require("./images/3.jpg"),
  image4: require("./images/4.jpg"),
};

export default function FlatDetailsScreen({ route }: any) {
  const flat = route.params;

  const [images, setImages] = useState([
    { id: "1", image: IMAGES.image1 },
    { id: "2", image: IMAGES.image2 },
    { id: "3", image: IMAGES.image3 },
    { id: "4", image: IMAGES.image4 },
  ]);

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
          data={images}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => onSelect(index)}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
              source={item.image}
            />
          )}
        />
        <Pagination
          inactiveDotColor="gray"
          dotColor={"orange"}
          activeDotIndex={indexSelected}
          dotsLength={images.length}
          animatedDuration={150}
          inactiveDotScale={1}
        />
      </View>
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
    flex: 0,
    backgroundColor: "#F2FDFF",
  },
  gallery: {
    width: width,
    height: 300,
    backgroundColor: "#F2FDFF",
    alignSelf: "center",
  },
  content: {
    margin: 5,
    paddingLeft: 30,
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
  },
});
