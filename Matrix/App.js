import React, { Component } from "react";
import { TextInput, StyleSheet,Dimensions,StatusBar  , Text, View } from "react-native";
import io from "socket.io-client";
import { getOrientationAsync } from "expo/build/ScreenOrientation/ScreenOrientation";


var {height, width} = Dimensions.get('window');
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      name:"",
      chatMessages: [],
      time:"",
      date:""

    };

  }

  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    this.setState({
      date: date + '/' + month + '/' + year,
      time:  hours + ':' + min });

    this.socket = io("http://192.168.0.124:3000");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });

    });

  }

  submitChatMessage() {

    this.socket.emit("chat message", this.state.name + "&--&" + this.state.chatMessage 
    + "&--&" + this.state.time);
    this.setState({ chatMessage: "" });

  }

  render() {

    const chatMessages = this.state.chatMessages.map(chatMessage=>
      ((chatMessage.split("&--&"))[0] === this.state.name ? 
      <View style={{padding:10,alignItems:"flex-end"}}>
      <View style={{backgroundColor:"rgba(63, 247, 51,0.7)",marginBottom:5,alignContent:"space-between", padding:10,borderRadius:10}}> 
        <Text key={1} style={{color:"white",textAlign:"right"}} key={chatMessage}>{(chatMessage.split("&--&"))[1]}</Text>
        <Text  key={2} style={{color:"white",fontSize: 10,textAlign:"left"}} key={chatMessage}>{(chatMessage.split("&--&"))[2]}</Text>
        </View></View>
      :<View style={{padding:10,alignItems:"flex-start"}}>
      <View style={{backgroundColor:"rgba(100,50,200,0.7)",marginBottom:5,padding:10,borderRadius:10}}>
        <Text key={1} style={{color:"white",textAlign:"left"}} key={chatMessage}>{(chatMessage.split("&--&"))[1]}</Text>
        <Text key={2} style={{color:"white",fontSize: 10,textAlign:"left"}} key={chatMessage}>{(chatMessage.split("&--&"))[2]}</Text>
        </View>
        </View>
    ));

    return (

      <View style={styles.container}>
          <StatusBar  
                    backgroundColor = "#b3e6ff"  
                    barStyle = "dark-content"   
                    hidden = {true}    
                    translucent = {true}  
                /> 
                
                 {chatMessages} 
        <View style={{
          flex:4,
          justifyContent:"flex-end",
          
        }}>
         <TextInput
          style={{ height: 40, borderWidth: 1, borderRadius:10,padding:6,
                    marginBottom:10}}
          autoCorrect={false}
          placeholder="Enter Your Name"
          value={this.state.name}
          onChangeText={name => {
            this.setState({ name });
          }}
        />
        <TextInput
          style={{ height: 40, borderWidth: 1, borderRadius:10,padding:6,marginBottom:10}}
          autoCorrect={false}
          placeholder="Enter Message"
          value={this.state.name}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
        </View>
       
        
      </View>

    );

  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    margin:10,
    backgroundColor: "#F5FCFF"
  }

});