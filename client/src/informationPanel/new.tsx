import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from "react-native"

interface newInfo {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, name: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  forcereload: boolean;
  reload: Function;
}

const NewButton = (props: newInfo) => {
  const [modalVisible, setModalVisibility] = useState(false);
  const [adress, setAdress] = useState("");
  const [serverName, setServerName] = useState("");
  const [userName, setUserName] = useState("");
  const openModal = () => {
    if (modalVisible)
      return;
    setAdress("");
    setServerName("");
    setUserName("");
    setModalVisibility(true);
  }
  const hideModal = () => {
    setModalVisibility(false);
  }
  const add_server = () => {
    props.appStorage[serverName] = { connected: false, adress: adress, name: userName, channels: {} }
    setModalVisibility(false);
    props.reload(!props.forcereload);
  }
  return (
    <Pressable style={styles.buttonBox} onPress={openModal}>
      <Text style={styles.newText}>+</Text>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.inModal}>
          <Text style={styles.modaltext}>Add a new server !</Text>
          <TextInput style={styles.modalInput} placeholder={"Adress of the server"} onChangeText={txt => setAdress(txt)} value={adress}></TextInput>
          <TextInput style={styles.modalInput} placeholder={"Name of the server"} onChangeText={txt => setServerName(txt)} value={serverName}></TextInput>
          <TextInput style={styles.modalInput} placeholder={"Your name"} onChangeText={txt => setUserName(txt)} value={userName}></TextInput>
          <Pressable style={styles.addButton} onPress={add_server}>
            <Text>Add</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={hideModal}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
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
  },
  inModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#555",
    borderRadius: 20,
    borderWidth: 3,
    marginVertical: 400,
    marginHorizontal: 450,
  },
  modaltext: {
    fontSize: 20,
  },
  modalInput: {
    backgroundColor: "#fff",
    margin: 4,
    borderWidth: 1,
  },
  addButton: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 3,
    margin: 5,
    backgroundColor: "#0f0",
  },
  cancelButton: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 3,
    margin: 5,
    backgroundColor: "#f00"
  }
});

export default NewButton;