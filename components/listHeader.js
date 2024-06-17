import {View, Text,  StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Horloge from './horloge';

const Header = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime.toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>WEBSITE CHECKER</Text>
        <Horloge currentDateTime={time} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;