import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image, Dimensions } from "react-native";
import { firstLine, secondLine } from "../common/helpers/addressConverter";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const IMAGES = {
  image1: require("./images/1.jpg"),
  image2: require("./images/2.jpg"),
  image3: require("./images/3.jpg"),
  image4: require("./images/4.jpg"),
};

export default function BookingDetailsScreen({ route }: any) {
  const booking = route.params;

  const [indexSelected, setIndexSelected] = useState(0);
  const onSelect = (indexSelected: number) => {
    setIndexSelected(indexSelected);
  };
  const [images, setImages] = useState([
    { id: "1", image: IMAGES.image1 },
    { id: "2", image: IMAGES.image2 },
    { id: "3", image: IMAGES.image3 },
    { id: "4", image: IMAGES.image4 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{booking.userData}</Text>
      <Text style={styles.content}>Check-in date: {booking.startDateTime}</Text>
      <Text style={styles.header}>Flat</Text>
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
          inactiveDotColor="#263238"
          dotColor={"#C2185B"}
          activeDotIndex={indexSelected}
          dotsLength={images.length}
          animatedDuration={200}
          inactiveDotScale={1}
        />
      </View>
      <Text style={styles.content}>Rooms: {booking.flat.rooms}</Text>
      <Text style={styles.content}>{firstLine(booking.flat.address)}</Text>
      <Text style={styles.content}>{secondLine(booking.flat.address)}</Text>
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
