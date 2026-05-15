import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation } from "@react-navigation/native";

const MOVIES = [
  {
    id: "1",
    title: "Spider-Man No Way..",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/spider-man-poster.png"),
  },
  {
    id: "2",
    title: "Riverdale",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    badge: "Free",
    badgeColor: "#12CDD9",
    poster: require("../../assets/img/spider-man-poster.png"),
  },
  {
    id: "3",
    title: "Life of PI",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/life-poster.png"),
  },
  {
    id: "4",
    title: "Movie Dotcase",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    poster: require("../../assets/img/dot-poster.png"),
  },
  {
    id: "5",
    title: "The Jungle waiting",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    badge: "Free",
    badgeColor: "#12CDD9",
    poster: require("../../assets/img/jungle-poster.png"),
  },
];

export default function MostPopularMovie() {
  const navigation = useNavigation();

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate("MovieDetail", { movie: item })}
      activeOpacity={0.8}
    >
      {/* POSTER */}
      <View style={styles.posterWrapper}>
        <Image source={item.poster} style={styles.poster} />
        {/* RATING BADGE */}
        <View style={styles.ratingBadge}>
          <FontAwesome name="star" size={10} color="#FF8700" />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>
      </View>

      {/* INFO */}
      <View style={styles.movieInfo}>
        {/* BADGE */}
        <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>

        {/* TITLE */}
        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title}
        </Text>

        {/* YEAR */}
        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/calendar-icon.png")} />
          <Text style={styles.metaText}>{item.year}</Text>
        </View>

        {/* DURATION + PG-13 */}
        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/clock-icon.png")} />
          <Text style={styles.metaText}>{item.duration}</Text>
          <View style={styles.pgBadge}>
            <Text style={styles.pgText}>PG-13</Text>
          </View>
        </View>

        {/* GENRE + TYPE */}
        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/film-icon.png")} />
          <Text style={styles.metaText}>{item.genre}</Text>
          <View style={styles.separator} />
          <Text style={[styles.metaText, styles.metaTextBold]}>
            {item.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Most Popular Movie</Text>
        {/* Placeholder for symmetry */}
        <View style={{ width: 26 }} />
      </View>

      {/* MOVIE LIST */}
      <FlatList
        data={MOVIES}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    paddingTop: 52,
    paddingHorizontal: 24,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  headerTitle: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
  },

  /* LIST */
  listContent: {
    paddingBottom: 120,
  },

  /* MOVIE CARD */
  movieCard: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "transparent",

    overflow: "hidden",
  },

  /* POSTER */
  posterWrapper: {
    position: "relative",
  },

  poster: {
    width: 112,
    height: 147,
    borderRadius: 8,
  },

  ratingBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(37, 40, 54, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },

  ratingBadgeText: {
    color: "#FF8700",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,

    fontWeight: "600",
  },

  /* MOVIE INFO */
  movieInfo: {
    flex: 1,
    paddingHorizontal: 16,

    justifyContent: "flex-start",
    gap: 13,
  },

  badge: {
    width: 72,
    borderRadius: 6,
    paddingVertical: 4,

    alignItems: "center",
  },

  badgeText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "500",
  },

  movieTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metaText: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
  },
  metaTextBold: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
  },
  pgBadge: {
    borderWidth: 1,
    borderColor: "#12CDD9",
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginLeft: 12,
  },

  pgText: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 12,

    fontWeight: "500",
  },

  separator: {
    width: 1,
    height: 16,
    backgroundColor: "#696974",
    marginHorizontal: 8,
    opacity: 0.5,
  },
});
