import { Component } from "react";
import { Pressable, Text, StyleSheet, TextStyle } from "react-native";

interface Props {
  setChanName: Function;
  name: string;
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
    backgroundColor: "#445",
    borderRadius: 20,
  }
  action(this: this) {
    this.props.setChanName(this.props.name);
  }
  render() {
    return (
      <Pressable onPressIn={this.action.bind(this)}>
        <Text style={this.style}># {this.props.name}</Text>
      </Pressable>
    );
  }
}

export default SelectorOption;