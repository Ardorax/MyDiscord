import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

interface input {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  server: string;
  channelName: string;
}

const Input = (props: input) => {
  const [messageTyping, setMsgtyping] = useState("");
  return (
    <TextInput
      style={styles.newMessage} placeholder="Type here to send a message"
      onSubmitEditing={async evt => {
        console.log(`Send : ${evt.nativeEvent.text}`);
        (props.appStorage[props.server].websocket as WebSocket).send(`${props.channelName}:${"Me"}:${evt.nativeEvent.text}`);
        setMsgtyping("");
      }}
      onChangeText={t => setMsgtyping(t)}
      value={messageTyping}
    ></TextInput>
  )
}

const styles = StyleSheet.create({
  newMessage: {
    backgroundColor: "#4d5b60",
    height: "5vh",
    margin: "2vh",
    borderRadius: 7,
    color: "#fff",
  },
});

export default Input;