import { View, Text, StyleSheet, TextStyle } from "react-native"

interface messageInfo {
    content: string;
    author: string;
    date?: string;
    color?: string;
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
    );
}

const styles = StyleSheet.create({
  message: {
    padding: "10px",
    marginLeft: "40px",
  },
  messageContent: {
    color: "#eee",
  },
});

export default Message;