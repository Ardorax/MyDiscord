import { Text,StyleSheet } from "react-native"

interface title {
  title: string;
}

const Title = (props: title) => {
  return (
    <Text style={styles.channelName}># {props.title}</Text>
  )
}

const styles = StyleSheet.create({
  channelName: {
    fontSize: 20,
    height: "5vh",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px"
  },
});

export default Title;