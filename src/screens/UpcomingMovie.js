import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation } from "@react-navigation/native";

export default function UpcomingMovie() {
  const navigation = useNavigation();

  const movies = [
    {
      id: 1,
      title: "The Batman",
      date: "March 2, 2022",
      genre: "Action",
      image: require("../../assets/img/Batman-poster.png"),
    },
    {
      id: 2,
      title: "Black Panther: Wakanda Forever",
      date: "November 11, 2022",
      genre: "Action",
      image: require("../../assets/img/black-panther-poster.png"),
    },
    {
      id: 3,
      title: "Minions",
      date: "July 1, 2022",
      genre: "Animation",
      image: require("../../assets/img/minion-poster.png"),
    },
  ];

  const categories = ["All", "Comedy", "Animation", "Dokument"];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Upcoming Movie</Text>

          <View style={{ width: 36 }} />
        </View>

        {/* CATEGORY */}
        <View style={styles.categoryWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryBtn,
                  index === 0 && styles.activeCategoryBtn,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    index === 0 && styles.activeCategoryText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* MOVIES */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.movieList}
        >
          {movies.map((movie) => (
            <TouchableOpacity key={movie.id} style={styles.movieCard}>
              <View style={styles.imageContainer}>
                <Image source={movie.image} style={styles.movieImage} />

                <TouchableOpacity
                  style={styles.playBtn}
                  onPress={() => navigation.navigate("Trailer")}
                >
                  <Ionicons name="play" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              <Text style={styles.movieTitle}>{movie.title}</Text>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Feather name="calendar" size={12} color="#92929D" />
                  <Text style={styles.infoText}>{movie.date}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.infoItem}>
                  <MaterialIcons name="movie" size={13} color="#92929D" />
                  <Text style={styles.infoText}>{movie.genre}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* BOTTOM TAB */}
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    paddingTop: 52,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#252836",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.12,
  },

  categoryWrapper: {
    marginTop: 24,
    height: 44,
  },

  categoryRow: {
    alignItems: "center",
    paddingRight: 24,
  },

  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  activeCategoryBtn: {
    backgroundColor: "#252836",
  },

  categoryText: {
    color: "#EBEBEF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.12,
  },

  activeCategoryText: {
    color: "#12CDD9",
  },

  movieList: {
    marginTop: 21,
    paddingBottom: 120,
  },

  movieCard: {
    marginBottom: 24,
  },

  imageContainer: {
    position: "relative",
  },

  movieImage: {
    width: "100%",
    height: 170,
    borderRadius: 16,
  },

  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -28 }, { translateY: -28 }],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  movieTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },

  separator: {
    width: 1,
    height: 12,
    backgroundColor: "#92929D",
    opacity: 0.5,
    marginHorizontal: 12,
  },
});
