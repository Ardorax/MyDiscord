import { useState } from "react";
import { Text, View, FlatList, StyleSheet, TextInput, TextStyle } from "react-native";
import Title from "./title";
import Input from "./input";

interface messageInfo {
  content: string;
  author: string;
  date?: string;
  color?: string;
}

interface channelInfo {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  server: string;
  channelName: string;
  //client: WebSocket;
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
  if (props.channelName == undefined || props.server == undefined) {
    return (
      <Text style={styles.errorDisplay}>Connect to a server</Text>
    )
  }
  return (
    <View style={styles.messagesList}>
      <Title title={props.channelName} />
      <FlatList data={props.appStorage[props.server].channels[props.channelName]}
        renderItem={({ item }) => Message(item)} style={styles.messageDisplayList}>
      </FlatList>
      <Input />
    </View >
  )
}

const styles = StyleSheet.create({
  messagesList: {
    backgroundColor: "#444444",
    width: "85%",
    height: "100%",
  },
  message: {
    padding: "10px",
    marginLeft: "40px",
  },
  messageContent: {
    color: "#eee",
  },
  messageDisplayList: {
    height: "86vh",
  },
  errorDisplay: {
    backgroundColor: "#444444",
    width: "85%",
    height: "100%",
    fontSize: 30,
    color: "#f00",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessagesList;