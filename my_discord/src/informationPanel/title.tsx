import { View, Text, StyleSheet, Pressable } from "react-native"

interface TitleInfo {
  title: string;
  listingServers: boolean;
  setListing: Function;
}

const Title = (props: TitleInfo) => {
  const switch_mode = () => {
    if (props.listingServers == false)
      props.setListing(true);
  }
  return (
    <Pressable style={styles.titleBox} onPress={switch_mode}>
      <Text style={styles.serverName}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    height: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
    borderBottomColor: "#111",
    borderBottomWidth: 2,
  },
  serverName: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Title;