import { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import UserPanel from "./userPanel";

interface Props {
  name?: string;
}

class ChannelsName extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  action(this: this) {
    console.log(this.props.name);
  }
  render() {
    return (
      <Pressable onPressIn={this.action.bind(this)}>
        <Text style={styles.channelsName}># {this.props.name}</Text>
      </Pressable>
    );
  }
}

const ChannelsList = () => {
  return (
    <View style={styles.channelsList}>
      <Text style={styles.serverName}>Super Serveur</Text>
      <ScrollView>
        <ChannelsName name="Channel 1"/>
        <ChannelsName name="Channel 2"/>
        <ChannelsName name="Channel 3"/>
        <ChannelsName name="Channel 4"/>
        <ChannelsName name="Channel 5"/>
      </ScrollView>
      <UserPanel userName='Michel' />
    </View>
  );
}

const styles = StyleSheet.create({
  channelsList: {
    backgroundColor: "#333333",
    height: "100%",
    width: "14%"
  },
  serverName: {
    color: "#ffffff",
    fontSize: 20,
    height: "5%",
    borderBottomColor: "#111",
    borderBottomWidth: 2,
    display: "flex",
    alignItems: "center"
  },
  channelsName: {
    height: "30px",
    paddingLeft: "20px",
    color: "#aaa",
    display: "flex",
    alignItems: "center",
    margin: "5px",
  },
});


export default ChannelsList;