import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MessagesList from './src/messages/list';
import InformationPanel from './src/informationPanel/panel';

const addMessage: any = ((new_message: any, channelName: string, messages: any, setMessages: Function) => {
  console.log(messages);
  let array_copy = { ...messages };
  array_copy[channelName].push(new_message);
  setMessages(array_copy);
});

export default function App() {

  let appStorage: {
    current: {
      [key: string]: {
        connected: boolean, adress: string, websocket?: WebSocket, channels: {
          [key: string]: { author: string, content: string, color?: string, date?: string }[]
        }
      }
    }
  } = useRef(
    {
      // The object with all the servers
      localhost: {
        // The server
        connected: false, adress: "http://localhost", channels: {
          /*// An object with all the channels
          loading: [
            // The list of messages
            {
              // A message
              author: "Search", content: "Messages are loading", color: "#ff0000", date: new Date().getTime()
            }
          ]*/
        }
      }
    }
  )

  // Create websocket
  //const adressPart = window.location.href.split(":");
  //const client = useRef(new WebSocket("ws:" + adressPart[1] + ":27842"));

  // Current server
  const [server, setServer] = useState(undefined);

  //Current channel of the user
  const [channelName, setChannel] = useState(undefined);

  // Execute at the creation
  useEffect(() => {
    /*fetch(adressPart[0] + ":" + adressPart[1] + ":27841/messages-", {
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
          console.log(appStorage.current);
          appStorage.current["new_serv"] = { connected: false, id: 1, channels: {} };
        }
      });
    }).catch(err => {
      console.log("error");
      setMessages({
        error: [{
          author: "Server Not Found",
          content: "You're sure that there is a server here ?",
          color: "#f00"
        }]
      });
      setChanName("error");
    });*/
  }, []);

  // The components
  return (
    <View style={styles.container}>
      <InformationPanel server={server} setServer={setServer} setChanName={setChannel}
      channelName={channelName} appStorage={appStorage.current}/>
      <MessagesList appStorage={appStorage.current} channelName={channelName}
      server={server}/>
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
});
