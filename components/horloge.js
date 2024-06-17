import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Horloge = ({currentDateTime}) => {

    return (
        <View style={styles.textP}>
            <Text>{currentDateTime}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    textP: {
        fontSize: 48,
        color: '#ffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    dateTimeText: {
        fontSize: 16,
        color: '#ffff',
        textAlign: 'center',
        marginBottom: 80,
    },
});
export default Horloge;


