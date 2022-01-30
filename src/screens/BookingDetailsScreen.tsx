import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image, Dimensions } from "react-native";
import { firstLine, secondLine } from "../common/helpers/addressConverter";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

export default function BookingDetailsScreen({ route }: any) {
  const booking = route.params;

  const [indexSelected, setIndexSelected] = useState(0);
  const onSelect = (indexSelected: number) => {
    setIndexSelected(indexSelected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{booking.userData}</Text>
      <Text style={styles.content}>Check-in date: {booking.startDateTime}</Text>
      <Text style={styles.content}>Flat</Text>
      <View style={styles.gallery}>
        <Carousel
          layout="default"
          data={booking.flat.images}
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
          dotsLength={booking.flat.images.length}
          animatedDuration={150}
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
    flex: 1,
    backgroundColor: "#F2FDFF",
    alignItems: "center",
    justifyContent: "center",
  },
  gallery: {
    width: 0.9 * width,
    height: 300,
    backgroundColor: "#F2FDFF",
    alignSelf: "center",
  },
  content: {
    margin: 5,
    fontSize: 20,
  },
  title: {
    fontSize: 24,
  },
  fetchText: {
    fontSize: 12,
    textAlign: "center",
  },
});
