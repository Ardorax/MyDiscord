import { StyleSheet, Text, View } from 'react-native';
import ChannelsList from './src/channels/list';

const ServersList = () => {
  return (
    <View style={styles.serverList}>
      <Text style={styles.text}>Servers</Text>
    </View>
  );
}

const MessagesList = () => {
  return (
    <View style={styles.messagesList}>
      <Text>Here is my message</Text>
      <Text>Another message...</Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <ServersList />
      <ChannelsList />
      <MessagesList />
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
  messagesList: {
    backgroundColor: "#444444",
    height: "100%",
    width: "82%"
  },
  text: {
    color: "#ffffff"
  }
});
