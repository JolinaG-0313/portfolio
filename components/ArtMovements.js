import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const artMovementsData = [
  {
    id: 1,
    name: 'Impressionism',
    description: 'A 19th-century art movement characterized by small, thin, visible brushstrokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, and the inclusion of movement as a crucial element of human perception and experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/CLAUDE_MONET_-_IMPRESSION%2C_SUNRISE_-_MUS%C3%89E_MARMOTTAN_MONET%2C_PARIS.jpg/1280px-CLAUDE_MONET_-_IMPRESSION%2C_SUNRISE_-_MUS%C3%89E_MARMOTTAN_MONET%2C_PARIS.jpg',
    artworks: [
      {
        id: 1,
        title: 'Impression, Sunrise',
        artist: 'Claude Monet',
        year: '1872',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/CLAUDE_MONET_-_IMPRESSION%2C_SUNRISE_-_MUS%C3%89E_MARMOTTAN_MONET%2C_PARIS.jpg/1280px-CLAUDE_MONET_-_IMPRESSION%2C_SUNRISE_-_MUS%C3%89E_MARMOTTAN_MONET%2C_PARIS.jpg'
      },
      {
        id: 2,
        title: 'Water Lilies',
        artist: 'Claude Monet',
        year: '1896',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Monet_-_Water_Lilies_-_National_Gallery_London.jpg/1280px-Monet_-_Water_Lilies_-_National_Gallery_London.jpg'
      },
      {
        id: 3,
        title: 'A Bar at the Folies-Bergère',
        artist: 'Édouard Manet',
        year: '1882',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Edouard_Manet_-_A_Bar_at_the_Folies-Berg%C3%A8re_-_Google_Art_Project.jpg/1280px-Edouard_Manet_-_A_Bar_at_the_Folies-Berg%C3%A8re_-_Google_Art_Project.jpg'
      }
    ]
  }
]


const ArtMovementsScreen = ({ navigation }) => {
  const [selectedMovement, setSelectedMovement] = useState(null);

  const renderMovementItem = ({ item }) => {
    const { id, title, image } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedMovement(item);
        }}
      >
        <View style={styles.movementItem}>
          <Image source={image} style={styles.image} />
          <Text style={styles.movementTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderArtworkItem = ({ item }) => {
    const { id, title, artist, year, image } = item;
    return (
      <View style={styles.artworkItem}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.artworkInfo}>
          <Text style={styles.artworkTitle}>{title}</Text>
          <Text style={styles.artworkArtist}>{artist}</Text>
          <Text style={styles.artworkYear}>{year}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Art Movements</Text>
      <FlatList
        data={artMovementsData}
        renderItem={renderMovementItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      {selectedMovement && (
        <>
          <Text style={styles.selectedTitle}>{selectedMovement.title}</Text>
          <FlatList
            data={selectedMovement.artworks}
            renderItem={renderArtworkItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
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

export default ArtMovementsScreen;
