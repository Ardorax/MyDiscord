import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ChannelsList from './src/channels/list';
import MessagesList from './src/messages/list';

const ServersList = () => {
  return (
    <View style={styles.serverList}>
      <Text style={styles.text}>Servers</Text>
    </View>
  );
}

const addMessage: any = ((new_message: any, channelName: string, messages: any, setMessages: Function) => {
  console.log(messages);
  let array_copy = { ...messages };
  array_copy[channelName].push(new_message);
  setMessages(array_copy);
});

export default function App() {
  //Default messages on screen
  let default_msg: Object = {
    loading: [{ author: "Search", content: "Messages are loading", color: "#ff0000", date: new Date().getTime() }]
  }

  //Current message store by user and his channel
  const [messages, setMessages] = useState(default_msg);
  const [chanName, setChanName] = useState(Object.keys(messages)[0]);

  // Create websocket
  const adressPart = window.location.href.split(":");
  const client = useRef(new WebSocket("ws:" + adressPart[1] + ":8080"));

  // Execute at the creation
  useEffect(() => {
    fetch(adressPart[0] + ":" + adressPart[1] + ":3000/messages", {
      method: "GET",
      headers: {}
    }).then(res => {
      res.json().then(load_messages => {

        //Display messages
        setMessages(load_messages);
        setChanName(Object.keys(load_messages)[0]);

        //Open the connexion
        client.current.onmessage = (event) => {
          let msgPart = event.data.split(":");
          addMessage({ author: msgPart[1], color: msgPart[2], date: msgPart[3], content: msgPart.splice(4).join(":") },
          msgPart[0], load_messages, setMessages);
        }
      });
    }).catch(err => {
      console.log("error");
      setMessages({
        error: [{ author: "Server Not Found",
        content: "You're sure that there is a server here ?",
        color:"#f00"
      }]
      });
      setChanName("error");
    });
  }, []);

  // The components
  return (
    <View style={styles.container}>
      <ServersList />
      <ChannelsList setChanName={setChanName} chanList={Object.keys(messages)} />
      <MessagesList channelName={chanName} messages={messages} client={client.current} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  serverList: {
    backgroundColor: "#111111",
    height: "100%",
    width: "4%"
  },
  channelsList: {
    backgroundColor: "#333333",
    height: "100%",
    width: "14%"
  },
  text: {
    color: "#ffffff"
  }
});
