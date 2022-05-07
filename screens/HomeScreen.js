import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import BannerSlider from '../Components/BannerSlider';
import {windowWidth} from '../utils/Dimensions';
import {freeGames, paidGames, sliderData} from '../model/data';
import CustomSwitch from '../Components/CustomSwitch';
import ListItem from '../Components/ListItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StudentScreen from '../DrawerScreens/StudentScreen';
export default function HomeScreen({navigation}) {
  const [gamesTab, setGamesTab] = useState(1);
  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };
  const onSelectSwitch = value => {
    setGamesTab(value);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Hello Devendra 
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../Assets/Images/user-profile.jpg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
          }}> 
          {/* <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5}}
          />
          <TextInput placeholder="Search" />
        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
           Events
          </Text> */}
          <View> 
           <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={sliderData}
            renderItem={renderBanner}
            sliderWidth={windowWidth - 60}
            itemWidth={300}
            loop={true}
            autoplay={true}
          />
        </View>

        </View>
        
        <View>   
            <StudentScreen/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
