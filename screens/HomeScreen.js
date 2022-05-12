import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
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
  renderItem = ({item, index}) => {
    return (
        <View>
            <Image style={{ width:SLIDER_WIDTH, height:150, borderRadius:10 }} source={item.image} />
        </View>
          );
  }
const SLIDER_WIDTH = Dimensions.get('window').width;
const sliderData = [
  {
    title: 'First Game',
    image: require('../Assets/Images/homescreen/game-1.jpeg'),
  },
  {
    title: 'Second Game',
    image: require('../Assets/Images/homescreen/game-2.jpeg'),
  },
  // {
  //   title: 'Third Game',
  //   image: require('./Assets/Images/homescreen/game-3.png'),
  // },
];


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{paddingTop:20}}>
        <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom:20,
              paddingLeft:10,
              paddingRight:10,
          }}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
            Hello Devendra 
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground 
              source={require('../Assets/Images/user-profile.jpg')}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

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
    
           {/* <Carousel layout={'default'}
            // ref={c => {
            //   this._carousel = c;
            // }}
            data={sliderData}
            renderItem={renderBanner}
            sliderWidth={windowWidth - 20}
            itemWidth={windowWidth}
            loop={true}
            autoplay={true}
        /> */} 

<Carousel
data={sliderData}
renderItem={renderItem}
sliderWidth={SLIDER_WIDTH}
itemWidth={SLIDER_WIDTH}
autoplay={true}
/>


        
        <View>   
            <StudentScreen/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
