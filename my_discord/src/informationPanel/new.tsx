import { View, Text, StyleSheet, Pressable } from "react-native"

interface newInfo {
  text: string;
}

const NewButton = (props: newInfo) => {
  const switch_mode = () => {
    console.log("Un nouveau ?")
  }
  return (
    <Pressable style={styles.buttonBox} onPress={switch_mode}>
      <Text style={styles.newText}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: "#333",
  },
  newText: {
    height: 30,
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    marginTop: 5,
    backgroundColor: "#999",
    borderRadius: 20,
    borderWidth: 1,
  }
});

export default NewButton;