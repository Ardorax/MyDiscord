import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import SelectorOption from './option'

interface ListsInfo {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  server: string;
  setServer: Function;
  setchannelName: Function;
  setListing: Function;
}

const ServerSelector = (props: ListsInfo) => {
  return (
    <ScrollView style={styles.channelsList}>
      {
        Object.keys(props.appStorage).map(element =>
          <SelectorOption key={element} element={element}
          setServer={props.setServer} appStorage={props.appStorage}
          setChannelName={props.setchannelName} setListing={props.setListing}
          server={props.server}/>
        )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  channelsList: {
    backgroundColor: "#333",
    height: "100%",
  },
});


export default ServerSelector;