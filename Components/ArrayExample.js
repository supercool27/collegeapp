import React, {Components} from 'react';
import {View,Text} from 'react-native';

class ArrayExample extends Components{
    constructor(props){
        super(props);
        this.state = {
            names: [],
        }
    }

    componentDidMount(){
        this.fetchdata();
    }

    fetchdata = async () => {
        const names=["Infinite",'Bility','Infinitibility'];
        this.setState({names:names})
    }

 render(){
     const names = this.state;
     return(
         <View>
           { names.map((data,index)=>
                { <Text>Hello, {data} </Text>} 
             )
           }
         </View>
     );
 } 
}

export default ArrayExample;