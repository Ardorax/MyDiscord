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

export default function App() {
  let default_msg = {
    loading: [{ author: "Search", content: "Messages are loading" }]
  }
  const [messages, setMessages] = useState(default_msg);
  const [chanName, setChanName] = useState(Object.keys(messages)[0]);
  const count = useRef(0);
  const adressPart = window.location.href.split(":");
  const client: WebSocket = new WebSocket("ws:" + adressPart[1] + ":8080");

  let addMessage = ((new_message: any, channelName: string, messages:any) => {
    console.log(messages);
    let array_copy = { ...messages};
    array_copy[channelName].push(new_message);
    setMessages(array_copy);
  });

  useEffect(() => {
    //Get adress to call the server on another ports.
    console.log(adressPart[0] + ":" + adressPart[1] + ":3000");

    if (count.current == 0) {
      let prop = fetch(adressPart[0] + ":" + adressPart[1] + ":3000/messages", {
        method: "GET",
        headers: {}
      }).then(res => {
        res.json().then(load_messages => {
          console.log(load_messages);
          console.log("test")
          console.log(messages);
          setMessages(load_messages);
          console.log(messages);
          setChanName(Object.keys(load_messages)[0]);

          //Open the connexion
          client.onmessage = (event) => {
            //When user send a message this function is trigger. It's a filter.
            console.log(event);
            if (typeof(event.data) != 'string') return;
            let msgPart = event.data.split(":");
            addMessage({author: msgPart[0], content: msgPart[2]}, msgPart[1], load_messages);
          }
        });
      });
    }
    count.current = 1;
  });
  return (
    <View style={styles.container}>
      <ServersList />
      <ChannelsList setChanName={setChanName} chanList={Object.keys(messages)} />
      <MessagesList channelName={chanName} messages={messages} client={client} />
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
