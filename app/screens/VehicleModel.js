import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { MotiView } from 'moti';
import { colors } from '../components/Colors';
import RegularText from '../components/texts/RegularText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import data from '../hooks/apiRequests/CallCarsApi';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { setModel } from '../../slices/carSlice';
import { useDispatch } from 'react-redux';

const { white, secondary, lightGrey } = colors;

const VehicleModel = ({ navigation, props }) => {
  const [selectedModel, setSelectedModel] = useState();
  const route = useRoute(); // retrieve the route object
  const make = route.params?.make;
  console.log(make, 'from the models page');
  const renderItem = ({ item, index }) => {
    return (
      <MotiView
        style={styles.listContainer}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 + index * 40 }}
      >
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => {
            navigation.navigate('VehicleYear', {
              model: item.model,
              make: make,
            });

            console.log(item.model);
          }}
        >
          <Text style={styles.nameText}>{item.model}</Text>
        </TouchableOpacity>
      </MotiView>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: white }}>
      <View
        style={[
          styles.container,
          {
            position: 'relative',
            backgroundColor: white,
            marginHorizontal: 20,
          },
        ]}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginVertical: 20,
          }}
        >
          <BackButton onPress={() => navigation.navigate('VehicleMake')} />
          <RegularText
            style={{
              position: 'absolute',
              alignSelf: 'center',
              letterSpacing: 1,
              display: 'flex',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Select Model
          </RegularText>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 250 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
  },
  listContainer: {
    width: Dimensions.get('window').width / 2 - 40,
    backgroundColor: 'white',
    display: 'flex',
    margin: 10,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textContainer: {
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  nameText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
    height: 50,
    textAlign: 'center',
  },
  // priceText: {
  //   color: "orange",
  //   fontWeight: "bold",
  //   marginLeft: 15,
  //   marginTop: 10,
  // },
  // button: {
  //   backgroundColor: "#62513E",
  //   padding: 10,
  //   margin: 15,
  //   borderRadius: 10,
  // },
  // buttonText: {
  //   color: "white",
  //   textAlign: "center",
  // },
});

export default VehicleModel;
