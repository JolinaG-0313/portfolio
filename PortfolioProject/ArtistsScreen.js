import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const artistsData = [
    {
      id: 1,
      name: 'Leonardo da Vinci',
      bio: 'Leonardo di ser Piero da Vinci was an Italian polymath of the High Renaissance who is widely considered one of the most diversely talented individuals ever to have lived. While his fame initially rested on his achievements as a painter, he also became known for his notebooks, in which he made drawings and notes on science and invention.',
      image: 'https://i.natgeofe.com/n/37c3c776-b8cb-4be1-988a-cf593c776b88/01-leonardo-da-vinci-book-talk_3x4.jpg',
      artworks: [
        {
          id: 1,
          title: 'Mona Lisa',
          year: 1503,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
        },
        {
          id: 2,
          title: 'The Last Supper',
          year: 1498,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_QilmFkZ7tN17NycTpTG9CyzdCJj9Cf4azuaFHzDynAZsP4BXAwReSEUGAXtse_HaK7o&usqp=CAU',
        },
        {
          id: 3,
          title: 'Vitruvian Man',
          year: 1490,
          image: ''
        },
      ],
    },
    {
      id: 2,
      name: 'Vincent van Gogh',
      bio: 'Vincent Willem van Gogh was a Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art. In just over a decade, he created about 2,100 artworks, including around 860 oil paintings, most of which date from the last two years of his life.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
      artworks: [
        {
          id: 1,
          title: 'The Starry Night',
          year: 1889,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/970px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        },
        {
          id: 2,
          title: 'Sunflowers',
          year: 1888,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/300px-Vincent_Willem_van_Gogh_127.jpg',
        },
        {
          id: 3,
          title: 'The Potato Eaters',
          year: 1885,
          image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Vincent_Van_Gogh_-_The_Potato_Eaters.png',
        },
      ],
    },
    // Add more artists as needed
  ];
  
  

const ArtistsScreen = ({ navigation }) => {
  const [artists, setArtists] = useState(artistsData);

  const handleArtistPress = (artist) => {
    console.log("Tester")
    navigation.navigate('ArtistDetails', { artist });
  };

  const renderArtistItem = ({ item }) => {
    const { id, name, image } = item;
    return (
      <TouchableOpacity style={styles.artistItem} onPress={() => handleArtistPress(item)}>
        <Image source={{ uri: image }} style={styles.artistImage} />
        <Text style={styles.artistName}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Artists</Text>
      <FlatList
        data={artists}
        renderItem={renderArtistItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ArtistsScreen;

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
