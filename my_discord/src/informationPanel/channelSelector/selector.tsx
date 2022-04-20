import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import SelectorOption from './option'

interface ListsInfo {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, name: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  setChanName: Function;
  server: string;
}

const ChannelSelector = (props: ListsInfo) => {
  return (
    <ScrollView style={styles.channelsList}>
      {
        Object.keys(props.appStorage[props.server].channels).map(element =>
          <SelectorOption key={element} setChanName={props.setChanName} name={element} />
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


export default ChannelSelector;