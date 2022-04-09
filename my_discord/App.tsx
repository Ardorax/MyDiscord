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
  return (
    <View style={styles.container}>
      <ServersList />
      <ChannelsList />
      <MessagesList serverName='Channel 1' />
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
