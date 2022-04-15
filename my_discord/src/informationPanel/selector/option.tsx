import { Component } from "react";
import { Pressable, Text, StyleSheet, TextStyle } from "react-native";

interface Props {
  setChanName: Function;
  mode:number;
  element: {name: string, connected?:boolean};
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
    //If channel : blue
    //if connected server : green
    //If disconnected server : red
    backgroundColor: this.props.mode ? (this.props.element.connected ? "#454" : "#544") : "#445",
    borderRadius: 20,
  }
  action(this: this) {
    if (this.props.mode == 0)
      this.props.setChanName(this.props.element.name);
  }
  render() {
    return (
      <Pressable onPressIn={this.action.bind(this)}>
        <Text style={this.style}>{["#", ">"][this.props.mode]} {this.props.element.name}</Text>
      </Pressable>
    );
  }
}

export default SelectorOption;