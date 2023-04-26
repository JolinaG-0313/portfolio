import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

//Details

const ArtistDetailsScreen = ({ route }) => {
  const { artist } = route.params;

  const renderArtworkItem = ({ item }) => {
    const { id, title, year, image } = item;
    return (
      <TouchableOpacity style={styles.artworkItem} onPress={() => {}}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.artworkInfo}>
          <Text style={styles.artworkTitle}>{title}</Text>
          <Text style={styles.artworkYear}>{year}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      <Text style={styles.artistName}>{artist.name}</Text>
      <Text style={styles.artistBio}>{artist.bio}</Text>
      <Text style={styles.artworkTitle}>Artworks</Text>
      <FlatList
        data={artist.artworks}
        renderItem={renderArtworkItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    listContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    artistItem: {
      width: '45%',
      margin: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    artistImage: {
      width: '100%',
      height: 150,
      marginBottom: 10,
    },
    artistName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

export default ArtistDetailsScreen;
