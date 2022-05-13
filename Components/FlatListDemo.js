import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import ActivityIndicatorViewNativeComponent from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';
import {keyExtractor} from 'react-native/Libraries/Lists/VirtualizeUtils';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
    console.log('FlatListDemo is working');
  }
  
  componentDidMount() {
    this.makeRemoteRequest();
  }




myBananas=()=> {
   let pic = {
     uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
   };
 return(
  <Image src={pic} style={{ width: 193 ,height:110,marginTop:50 }}/> 
 );
 };

myKarela=()=>{
  let pic = {
    uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  };
  return(
    <Image src={pic} style={{width:193,height:110,marginTop:50 }}/>
  )
}

  flatlistBasics=()=>{
    return(
        <View>
                <FlatList
                  data={[
                    {key:'name 1'},
                    {key:'name 2'},
                    ]}
                  renderItem={({item})=><Text>{item.key}
                </Text>
            }/>
        </View>
        );
    }

    MyItem=({title})=> 
    (   <View>
            <Text>
                {title}    
            </Text> 
        </View>
    );

     Data=[
         {
            id:'One',
            title:'First Item',
         },
         {
             id:'One',
             title:'First Item',
         },
         {
             id:'One',
             title:'First Item',
         }
        ];

myflatlistbasics=()=>{
    return(
        <FlatList
        data={Data}
        renderItem={({item})=> {
          <MyItem title={item.title}/>  
        }}
        keyExtractor={item=>item.id}
        />
    );
}    





flatlistBasics=()=>{
    return(
        <View>
            <FlatList>

            </FlatList>
        </View>
    )



}





  renderHeader=()=>{
      return <SearchBar placeholder="Type Here..." lightTheme round/>;

  }
  renderFooter=()=>{
      if(!this.state.loading) return null;
      return ( 
      <View 
         style={{
             paddingVertical:20,
             borderTopWidth:1,
             borderColor:"#CED0CE"
         }}>
          <ActivityIndicator animating size="large"/>

         </View>
      );
  };

  renderseprator=()=>{
      retrun(
         <View style={{
              height:1,
              width:"86%",
              backgroundColor: "#CED0CE",
              marginLeft:"14%"            
          }}>

          </View>
      )}; 

  makeRemoteRequest = () => {
    const {page, seed} = this.state;
    const url =
      'https://randomuser.me/api/?seed=${seed}&page=${page}&results=20';
    this.setState({loading: true});

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          loading: false,
        });
      });
    render();
    {
      return (
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }} > 
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <ListItem
                roundAvator
                title={'${item.name.first}  ${item.name.last}'}
                subtitle={item.email}
                avator={{uri: item.picture.thumbnail}}
              />
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderseprator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />
        </List>
      );
    }
  };
}

export default FlatListDemo;
