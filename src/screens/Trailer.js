import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import { useNavigation } from "@react-navigation/native";

const CAST = [
  {
    id: "1",
    name: "Matt Reeves",
    role: "Directors",
    avatar: require("../../assets/icons/avatar.png"),
  },
  {
    id: "2",
    name: "Matt Reeves",
    role: "Writers",
    avatar: require("../../assets/img/avatar-2.png"),
  },
  {
    id: "3",
    name: "Matt Reeves",
    role: "Writers",
    avatar: require("../../assets/img/avatar-3.png"),
  },
];

const GALLERY = [
  require("../../assets/img/galery-1.png"),
  require("../../assets/img/galery-2.png"),
  require("../../assets/img/galery-3.png"),
];

export default function Trailer() {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const synopsis =
    "THE BATMAN is an edgy, action-packed thriller that depicts Batman in his early years, struggling to balance rage with righteousness as he investigates a disturbing mystery that has terrorized Gotham. Robert Pattinson delivers a raw, intense portrayal of Batman as a disillusioned, desperate vigilante awakened by the realization..";

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Trailer</Text>

          <TouchableOpacity style={styles.heartBtn}>
            <Ionicons name="heart" size={24} color="#FB4141" />
          </TouchableOpacity>
        </View>

        {/* VIDEO PLAYER */}
        <View style={styles.videoContainer}>
          <Image
            source={require("../../assets/img/batman-trailer.png")}
            style={styles.videoThumbnail}
          />

          {/* CONTROLS BAR */}
          <View style={styles.controlsBar}>
            <Image source={require("../../assets/img/tab-video.png")} />
          </View>
        </View>

        {/* MOVIE TITLE + META */}
        <View style={styles.titleSection}>
          <Text style={styles.movieTitle}>The Batman</Text>

          <View style={styles.metaRow}>
            <Image source={require("../../assets/icons/calendar-icon.png")} />
            <Text style={styles.metaLabel}>Release Date:</Text>
            <Text style={styles.metaValue}> March 2, 2022</Text>
            <View style={styles.separator} />
            <Image source={require("../../assets/icons/film-icon.png")} />
            <Text style={styles.metaLabel}> Action</Text>
          </View>
        </View>

        {/* SYNOPSIS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsisText}>
            THE BATMAN is an edgy, action-packed thriller that depicts Batman in
            his early years, struggling to balance rage with righteousness as he
            investigates a disturbing mystery that has terrorized Gotham. Robert
            Pattinson delivers a raw, intense portrayal of Batman as a
            disillusioned, desperate vigilante awakened by the realization..
            <Text style={styles.moreText}>More</Text>
          </Text>
        </View>

        {/* CAST AND CREW */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cast and Crew</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.castRow}>
            {CAST.map((person) => (
              <View key={person.id} style={styles.castItem}>
                <Image source={person.avatar} style={styles.castAvatar} />
                <View style={styles.castInfo}>
                  <Text style={styles.castName}>{person.name}</Text>
                  <Text style={styles.castRole}>{person.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* GALLERY */}
        <View style={[styles.section, styles.gallerySection]}>
          <Text style={styles.sectionTitle}>Galery</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.galleryRow}>
              {GALLERY.map((img, index) => (
                <Image key={index} source={img} style={styles.galleryImage} />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

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

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
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

  heartBtn: {
    backgroundColor: "#252836",
    padding: 6,
    borderRadius: 12,
    opacity: 0.9,
  },

  /* VIDEO PLAYER */
  videoContainer: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
    height: 200,
  },

  videoThumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  controlsBar: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },

  progressBarWrapper: {
    flex: 1,
  },

  /* TITLE SECTION */
  titleSection: {
    paddingHorizontal: 24,
    marginTop: 12,
  },

  movieTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    marginBottom: 8,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
  },

  metaLabel: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    marginLeft: 4,
  },

  metaValue: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },

  separator: {
    width: 1,
    height: 14,
    backgroundColor: "#92929D",
    marginHorizontal: 8,
    opacity: 0.5,
  },

  /* DIVIDER */
  divider: {
    height: 1,
    backgroundColor: "#252836",
    marginHorizontal: 24,
    marginVertical: 16,
  },

  /* SECTION */
  section: {
    paddingHorizontal: 24,
    marginTop: 32,
  },

  sectionTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    marginBottom: 8,
  },

  /* SYNOPSIS */
  synopsisText: {
    color: "#EBEBEF",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    letterSpacing: 0.12,
    fontWeight: "400",
  },

  moreText: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
  },

  /* CAST */
  castRow: {
    flexDirection: "row",

    marginTop: 16,
    paddingLeft: 16,
  },

  castItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 32,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 8,
  },

  castAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  castInfo: {
    justifyContent: "center",
  },

  castName: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
  },

  castRole: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "500",
  },

  galleryRow: {
    flexDirection: "row",
    gap: 12,
  },

  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
    marginTop: 12,
  },
});
