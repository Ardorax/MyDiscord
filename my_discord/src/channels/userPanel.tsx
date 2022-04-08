import {Text, StyleSheet} from "react-native"

interface UserInfo {
  userName: string;
}

const UserPanel = (props: UserInfo) => {
  return (
    <Text style={styles.userPanel}>{props.userName}</Text>
  );
}

const styles = StyleSheet.create({
  userPanel: {
    height: "5%",
    display: "flex",
    alignItems: "center",
    paddingLeft: "30%",
    backgroundColor: "#222",
    color: "#eee",
  }
});

export default UserPanel;