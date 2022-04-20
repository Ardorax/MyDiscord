import { Component } from "react";
import { Pressable, Text, StyleSheet, TextStyle } from "react-native";

interface Props {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  element: string;
  setServer: Function;
  server: string;
  setChannelName: Function;
  channel: string;
  setListing: Function;
  setUpdate: Function;
}

class SelectorOption extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  style: TextStyle = {
    height: 30,
    paddingLeft: 20,
    color: "#aaa",
    display: "flex",
    alignItems: "center",
    margin: 5,
    backgroundColor: this.props.appStorage[this.props.element].connected ? "#454" : "#544",
    borderRadius: 20,
  }
  action(this: this) {
    if (Object.keys(this.props.appStorage[this.props.element].channels).length === 0) {
      let target = this.props.appStorage[this.props.element];
      fetch("http://" + target.adress + ":27841/messages", {
        method: "GET",
        headers: {}
      }).then(res => {
        res.json().then(load_messages => {
          target.channels = load_messages;
          this.props.setServer(this.props.element);
          this.props.setChannelName(Object.keys(load_messages)[0]);
          this.props.setListing(false);
          target.connected = true;

          target.websocket = new WebSocket("ws://" + target.adress + ":27842/");
          target.websocket.onmessage = (event) => {
            let details: string[] = event.data.split(":");
            target.channels[details[0]].push({
              author: details[1],
              color: details[2],
              date: details[3],
              content: details.slice(4).join(":")
            });

            // Is this code a good practice ?
            // I can't use channel var because it don't update
            let current_channel_name : string = "undefined"
            this.props.setChannelName((prev : string) => {
              current_channel_name = prev;
              return (prev);
            });
            if (details[0] == current_channel_name) {
              console.log("refresh");
              this.props.setUpdate(new Date().getTime());
            }
          }
        });
      }).catch(err => {
        console.log("error");
      });
    } else {
      this.props.setListing(false);
      if (this.props.element == this.props.server)
        return;
      this.props.setServer(this.props.element);
      this.props.setChannelName(Object.keys(this.props.appStorage[this.props.element].channels)[0]);
    }
  }
  render() {
    return (
      <Pressable onPressIn={this.action.bind(this)}>
        <Text style={this.style}>{'> '}{this.props.element} </Text>
      </Pressable>
    );
  }
}

export default SelectorOption;