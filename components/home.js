import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './listHeader';
import Footer from './listFooter';

const Home = ({ navigation }) => {
  const [sites, setSites] = useState([]);
  const [siteName, setSiteName] = useState('');
  const [siteURL, setSiteURL] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchTokenAndSites = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          // Fetch sites using the retrieved token
          const response = await fetch('https://website-checker.boreales-creations.fr/api/websites', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/ld+json',
              'Authorization': `Bearer ${storedToken}`
            },
          });
          const data = await response.json();
          // Extract the sites from the hydra:member array
          if (data['hydra:member']) {
            setSites(data['hydra:member']);
          } else {
            console.error('Unexpected response format:', data);
          }
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Failed to fetch sites from API', error);
      }
    };
    fetchTokenAndSites();
  }, []);

  const addSite = async () => {
    if (siteName.trim() === '' || siteURL.trim() === '') {
      return;
    }
    const newSite = { name: siteName, url: siteURL };

    try {
      const response = await fetch('https://website-checker.boreales-creations.fr/api/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSite),
      });

      if (response.ok) {
        const addedSite = await response.json();
        setSites([...sites, addedSite]);
        setSiteName('');
        setSiteURL('');
      } else {
        console.error('Failed to add site to API');
      }
    } catch (error) {
      console.error('Failed to add site', error);
    }
  };

  const removeSite = async (site) => {
    try {
      const response = await fetch(`https://website-checker.boreales-creations.fr/api/websites/${site.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/ld+json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        setSites(sites.filter((item) => item.id !== site.id));
      } else {
        console.error('Failed to remove site from API');
      }
    } catch (error) {
      console.error('Failed to remove site', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.textP}>
        <Text style={styles.title}>
          Webchecker est une application de vérification de site web.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nom du site"
        value={siteName}
        onChangeText={setSiteName}
      />
      <TextInput
        style={styles.input}
        placeholder="URL du site"
        value={siteURL}
        onChangeText={setSiteURL}
        keyboardType="url"
      />
      <TouchableOpacity style={styles.button} onPress={addSite}>
        <Text style={styles.buttonText}>Ajouter un site</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {Array.isArray(sites) && sites.map((site, index) => (
          <View key={index} style={styles.block}>
            <Text style={styles.blockText}>{site.name}</Text>
            <Text style={styles.blockText}>{site.url}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeSite(site)}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  block: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    alignItems: 'center',
  },
  blockText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  textP: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  footer: {
    padding: 10,
    backgroundColor: '#eeD5D2',
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    width: '100%',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Home;
