import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import UserPanel from "./userPanel";

interface Props {
  name?: string;
  setChanName: Function;
}

interface ChanListProps {
  setChanName: Function;
  chanList: string[];
}

class ChannelsName extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  action(this: this) {
    this.props.setChanName(this.props.name);
  }
  render() {
    return (
      <Pressable onPressIn={this.action.bind(this)}>
        <Text style={styles.channelsName}># {this.props.name}</Text>
      </Pressable>
    );
  }
}

const ChannelsList = (props: ChanListProps) => {
  return (
    <View style={styles.channelsList}>
      <Text style={styles.serverName}>Super Serveur</Text>
      <ScrollView>
        {props.chanList.map(chan => <ChannelsName name={chan} key={chan} setChanName={props.setChanName}/>)}
      </ScrollView>
      <UserPanel userName='Michel' />
    </View>
  );
}

const styles = StyleSheet.create({
  channelsList: {
    backgroundColor: "#333",
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
    alignItems: "center",
    backgroundColor: "#222",
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