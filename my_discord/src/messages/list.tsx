import { useState } from "react";
import { Text, View, FlatList, StyleSheet, TextInput, TextStyle } from "react-native"

interface messageInfo {
  content: string;
  author: string;
  date?: string;
  color?: string;
}

interface channelInfo {
  channelName: string;
  messages: any;// I need to understand object and array
 client: WebSocket;
}

const Message = (props: messageInfo) => {
  let authorStyle: TextStyle = {
    fontSize: 20,
    textDecorationLine: "underline",
    color: props.color || "#fff",
  }
  return (
    <View style={styles.message}>
      <Text style={authorStyle}>{props.author}</Text>
      <Text style={styles.messageContent}>{props.content}</Text>
    </View>
  )
}

const MessagesList = (props: channelInfo) => {
  const [messageTyping, setMsgtyping] = useState("");
  return (
    <View style={styles.messagesList}>
      <Text style={styles.channelName}># {props.channelName}</Text>
      <FlatList data={props.messages[props.channelName]}
        renderItem={({ item }) => Message(item)} style={styles.messageDisplayList}>
      </FlatList>
      <TextInput
        style={styles.newMessage} placeholder="Type here to send a message"
        onSubmitEditing={async evt => {
          console.log(`Send : ${evt.nativeEvent.text}`);
          props.client.send(`${props.channelName}:${"Me"}:${"#fff"}:${new Date().getTime()}:${evt.nativeEvent.text}`);
          setMsgtyping("");
        }}
        onChangeText={t => setMsgtyping(t)}
        value={messageTyping}
      ></TextInput>
    </View >
  )
}

const styles = StyleSheet.create({
  messagesList: {
    backgroundColor: "#444444",
    width: "82%",
  },
  message: {
    padding: "10px",
    marginLeft: "40px",
  },
  messageContent: {
    color: "#eee",
  },
  channelName: {
    fontSize: 20,
    height: "5vh",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px"
  },
  newMessage: {
    backgroundColor: "#4d5b60",
    height: "5vh",
    margin: "2vh",
    borderRadius: 7,
    color: "#fff",
  },
  messageDisplayList: {
    height: "86vh",
  }
});

export default MessagesList;