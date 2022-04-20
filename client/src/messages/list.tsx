import { useState } from "react";
import { Text, View, FlatList, StyleSheet, TextInput, TextStyle } from "react-native";
import Title from "./title";
import Input from "./input";
import Message from "./message";

interface channelInfo {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, name: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  server: string;
  channel: string;
  test: number;
}

const MessagesList = (props: channelInfo) => {
  if (props.channel == undefined || props.server == undefined) {
    return (
      <Text style={styles.errorDisplay}>Connect to a server</Text>
    )
  }
  return (
    <View style={styles.messagesList}>
      <Title title={props.channel} />
      <FlatList data={props.appStorage[props.server].channels[props.channel]}
        renderItem={({ item }) => Message(item)} style={styles.messageDisplayList}>
      </FlatList>
      <Input appStorage={props.appStorage} server={props.server} channelName={props.channel} />
    </View >
  )
}

const styles = StyleSheet.create({
  messagesList: {
    backgroundColor: "#444444",
    width: "85%",
    height: "100%",
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