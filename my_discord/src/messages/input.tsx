import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = () => {
  const [messageTyping, setMsgtyping] = useState("");
  return (
    <TextInput
      style={styles.newMessage} placeholder="Type here to send a message"
      /*onSubmitEditing={async evt => {
        console.log(`Send : ${evt.nativeEvent.text}`);
        props.client.send(`${props.channelName}:${"Me"}:${"#fff"}:${new Date().getTime()}:${evt.nativeEvent.text}`);
        setMsgtyping("");
      }}*/
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