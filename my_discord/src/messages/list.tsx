import { Text, View, FlatList, StyleSheet } from "react-native"

interface messageInfo {
  content: string;
  author: string;
  date?: Date;
}

interface serverName {
  serverName: string;
}

const Message = (props: messageInfo) => {
  return (
    <View style={styles.message}>
      <Text style={styles.author}>{props.author}</Text>
      <Text>{props.content}</Text>
    </View>
  )
}

const MessagesList = (props: serverName) => {
  return (
    <View style={styles.messagesList}>
      <Text>{props.serverName}</Text>
      <FlatList data={[
        { author: "Michel", content: "Salut a tous." },
        { author: "Patrick", content: "Alors, on attend pas Patrick !" },
      ]}
        renderItem={({ item }) => Message(item)}>
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  messagesList: {
    backgroundColor: "#444444",
    height: "100%",
    width: "82%"
  },
  message: {
    padding: "10px",
    marginLeft: "40px",
  },
  author: {
    fontSize: 20,
    textDecorationLine: "underline"
  }
});

export default MessagesList;