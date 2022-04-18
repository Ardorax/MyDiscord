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

let default_servers: any = {
  // The object with all the servers
  localhost: {
    // The server
    connected: false, adress: "localhost", channels: {}
  }
}

if (!window.location.href.startsWith("http://localhost")) {
  let adress = window.location.href.split("/")[2].split(":")[0];
  console.log(adress);
  default_servers["webhost"] = { adress: adress, connected: false, channels: {} }
}

export default function App() {

  let appStorage: {
    current: {
      [key: string]: {
        connected: boolean, adress: string, websocket?: WebSocket, channels: {
          [key: string]: { author: string, content: string, color?: string, date?: string }[]
        }
      }
    }
  } = useRef(default_servers);

  // Current server.
  const [server, setServer] = useState(undefined);

  //Current channel of the user.
  const [channelName, setChannel] = useState(undefined);

  // Only use to force update message list when a new message is send.
  const [update, setupdate] = useState(new Date().getTime());

  // The components
  return (
    <View style={styles.container}>
      <InformationPanel server={server} setServer={setServer} setChanName={setChannel}
        channelName={channelName} appStorage={appStorage.current} setupdate={setupdate} />
      <MessagesList appStorage={appStorage.current} channel={channelName}
        server={server} test={update} />
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
