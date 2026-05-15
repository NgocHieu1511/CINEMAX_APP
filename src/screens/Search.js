import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import BottomTabs from "../navigation/BottomTabs";
import MovieCard from "../components/MovieCard";
import { useNavigation } from "@react-navigation/native";

const ALL_MOVIES = [
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
    image: require("../../assets/img/spider-man-poster.png"),
  },
  {
    id: "2",
    title: "Riverdale",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Series",
    badge: "Free",
    badgeColor: "#12CDD9",
    image: require("../../assets/img/riverdale-poster.png"),
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
    image: require("../../assets/img/life-poster.png"),
  },
  {
    id: "4",
    title: "The Jungle Waiting",
    year: "2021",
    duration: "148 Minutes",
    rating: "4.5",
    genre: "Action",
    type: "Movie",
    badge: "Premium",
    badgeColor: "#FF8700",
    image: require("../../assets/img/jungle-poster.png"),
  },
];

const ALL_ACTORS = [
  {
    id: "1",
    name: "John Wilson",
    avatar: require("../../assets/icons/actor-1.png"),
  },
  {
    id: "2",
    name: "John Deere",
    avatar: require("../../assets/icons/actor-2.png"),
  },
  {
    id: "3",
    name: "John Cena",
    avatar: require("../../assets/icons/actor-3.png"),
  },
  {
    id: "4",
    name: "John Stamo",
    avatar: require("../../assets/icons/actor-4.png"),
  },
];

const recommend = [
  {
    id: "1",
    title: "The Jungle Waiting",
    category: "Adventure",
    rating: "4.8",
    image: require("../../assets/img/jungle-poster.png"),
  },
  {
    id: "2",
    title: "Life of Pi",
    category: "Drama",
    rating: "4.7",
    image: require("../../assets/img/life-poster.png"),
  },
  {
    id: "3",
    title: "The Lion King",
    category: "Animation",
    rating: "4.6",
    image: require("../../assets/img/spider-man-poster.png"),
  },
];

export default function Search() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedActor, setSelectedActor] = useState(null);

  const isSearching = isFocused || search.length > 0;
  const trimmed = search.trim().toLowerCase();

  const filteredActors = trimmed
    ? ALL_ACTORS.filter((a) => a.name.toLowerCase().includes(trimmed))
    : [];

  const filteredMovies = trimmed
    ? ALL_MOVIES.filter((m) => m.title.toLowerCase().includes(trimmed))
    : [];

  const hasActors = filteredActors.length > 0;
  const hasMovies = filteredMovies.length > 0;
  const hasResults = hasActors || hasMovies;

  const handleCancel = () => {
    setSearch("");
    setIsFocused(false);
    setSelectedActor(null);
  };

  const renderMovieCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.movieCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("MovieDetail", { movie: item })}
    >
      <View style={styles.posterWrapper}>
        <Image source={item.image} style={styles.poster} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FF8700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.movieInfo}>
        <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>

        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/calendar-icon.png")} />
          <Text style={styles.metaText}>{item.year}</Text>
        </View>

        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/clock-icon.png")} />
          <Text style={styles.metaText}>{item.duration}</Text>
          <View style={styles.pgBadge}>
            <Text style={styles.pgText}>PG-13</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Image source={require("../../assets/icons/film-icon.png")} />
          <Text style={styles.metaText}>{item.genre}</Text>
          <View style={styles.separator} />
          <Text style={[styles.metaText, styles.metaTypeBold]}>
            {item.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* SEARCH ROW */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#999" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              onFocus={() => setIsFocused(true)}
              placeholder="Type title, categories, years, etc"
              placeholderTextColor="#999"
              style={styles.input}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={18} color="#92929D" />
              </TouchableOpacity>
            )}
          </View>

          {isSearching && (
            <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ---- SEARCH RESULTS ---- */}
        {trimmed.length > 0 ? (
          <>
            {hasResults ? (
              <>
                {/* ACTORS */}
                {hasActors && (
                  <>
                    <Text style={styles.sectionTitle}>Actors</Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.actorScroll}
                      contentContainerStyle={styles.actorScrollContent}
                    >
                      {filteredActors.map((actor) => (
                        <TouchableOpacity
                          key={actor.id}
                          style={styles.actorItem}
                          onPress={() => setSelectedActor(actor.id)}
                        >
                          <View
                            style={[
                              styles.actorAvatarWrapper,
                              selectedActor === actor.id &&
                                styles.actorAvatarSelected,
                            ]}
                          >
                            <Image
                              source={actor.avatar}
                              style={styles.actorAvatar}
                            />
                          </View>
                          <Text style={styles.actorName} numberOfLines={2}>
                            {actor.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </>
                )}

                {/* MOVIE RELATED */}
                <View style={styles.rowBetween}>
                  <Text style={styles.sectionTitle}>Movie Related</Text>
                  <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.movieList}>
                  {(hasMovies ? filteredMovies : ALL_MOVIES).map((item) =>
                    renderMovieCard(item),
                  )}
                </View>
              </>
            ) : (
              /* EMPTY STATE */
              <View style={styles.emptyContainer}>
                <Image
                  source={require("../../assets/icons/no-icon.png")}
                  style={styles.emptyIcon}
                  resizeMode="contain"
                />
                <Text style={styles.emptyTitle}>
                  We Are Sorry, We Can{"\n"}Not Find The Movie :(
                </Text>
                <Text style={styles.emptyDesc}>
                  Find your movie by Type title,{"\n"}categories, years, etc
                </Text>
              </View>
            )}
          </>
        ) : (
          /* ---- DEFAULT STATE ---- */
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categories}>
                <TouchableOpacity style={styles.activeCategoryBtn}>
                  <Text style={styles.activeCategoryText}>All</Text>
                </TouchableOpacity>
                <Text style={styles.category}>Comedy</Text>
                <Text style={styles.category}>Animation</Text>
                <Text style={styles.category}>Dokumentary</Text>
              </View>
            </ScrollView>

            <Text style={styles.sectionTitle}>Today</Text>
            <View style={styles.movieCard}>
              <View style={styles.posterWrapper}>
                <Image
                  source={require("../../assets/img/spider-man-poster.png")}
                  style={styles.poster}
                />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color="#FF8700" />
                  <Text style={styles.ratingText}>4.5</Text>
                </View>
              </View>
              <View style={styles.movieInfo}>
                <View style={[styles.badge, { backgroundColor: "#FF8700" }]}>
                  <Text style={styles.badgeText}>Premium</Text>
                </View>
                <Text style={styles.movieTitle}>Spider-Man No Way Home</Text>
                <View style={styles.metaRow}>
                  <Image
                    source={require("../../assets/icons/calendar-icon.png")}
                  />
                  <Text style={styles.metaText}>2021</Text>
                </View>
                <View style={styles.metaRow}>
                  <Image
                    source={require("../../assets/icons/clock-icon.png")}
                  />
                  <Text style={styles.metaText}>148 Minutes</Text>
                  <View style={styles.pgBadge}>
                    <Text style={styles.pgText}>PG-13</Text>
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <Image source={require("../../assets/icons/film-icon.png")} />
                  <Text style={styles.metaText}>Action</Text>
                  <View style={styles.separator} />
                  <Text style={[styles.metaText, styles.metaTypeBold]}>
                    Movie
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Recommend for you</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>

            <FlatList
              data={recommend}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <MovieCard
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  rating={item.rating}
                />
              )}
            />
          </>
        )}
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
    paddingHorizontal: 24,
  },

  /* SEARCH */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252836",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    letterSpacing: 0.12,
  },

  cancelBtn: {
    paddingVertical: 8,
  },

  cancelText: {
    color: "#12CDD9",
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    fontWeight: "600",
  },

  /* CATEGORIES */
  categories: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
  },

  activeCategoryBtn: {
    backgroundColor: "#2A2A3D",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginRight: 10,
  },

  activeCategoryText: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },

  category: {
    color: "#EBEBEF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    marginRight: 15,
  },

  /* SECTION */
  sectionTitle: {
    color: "#FFFFFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.12,
    marginTop: 24,
    marginBottom: 4,
  },

  /* ACTORS */
  actorScroll: {
    marginTop: 12,
  },

  actorScrollContent: {
    gap: 16,
    paddingRight: 8,
  },

  actorItem: {
    alignItems: "center",
    width: 72,
  },

  actorAvatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },

  actorAvatarSelected: {
    borderColor: "#12CDD9",
  },

  actorAvatar: {
    width: "100%",
    height: "100%",
  },

  actorName: {
    color: "#EBEBEF",
    fontFamily: "MontserratMedium",
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
  },

  /* MOVIE LIST */
  movieList: {
    gap: 16,
    marginTop: 12,
  },

  movieCard: {
    flexDirection: "row",
    marginTop: 16,
  },

  posterWrapper: {
    position: "relative",
  },

  poster: {
    width: 112,
    height: 147,
    borderRadius: 16,
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

  ratingText: {
    color: "#FF8700",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },

  movieInfo: {
    flex: 1,
    paddingHorizontal: 14,
    gap: 10,
  },

  badge: {
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  badgeText: {
    color: "#FFF",
    fontFamily: "MontserratMedium",
    fontSize: 10,
  },

  movieTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.12,
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
  },

  metaTypeBold: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontWeight: "700",
  },

  pgBadge: {
    borderWidth: 1,
    borderColor: "#12CDD9",
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: 8,
  },

  pgText: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 11,
  },

  separator: {
    width: 1,
    height: 14,
    backgroundColor: "#696974",
    marginHorizontal: 6,
    opacity: 0.5,
  },

  /* ROW BETWEEN */
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  seeAll: {
    color: "#12CDD9",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    marginTop: 24,
  },

  /* EMPTY STATE */
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    paddingHorizontal: 24,
  },

  emptyIcon: {
    width: 120,
    height: 120,
    marginBottom: 28,
  },

  emptyTitle: {
    color: "#FFF",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0.12,
    marginBottom: 12,
  },

  emptyDesc: {
    color: "#92929D",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    letterSpacing: 0.12,
  },
});
