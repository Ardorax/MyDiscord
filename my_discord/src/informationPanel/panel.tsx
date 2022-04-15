import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Title from "./title"
import Selector from "./selector/selector";
import User from "./user";

interface selectorInfo {
  setChanName: Function;
  chanList: string[];
  serverList: { name: string, connected: boolean }[];
}

const InformationPanel = (props: selectorInfo) => {
  const [mode, setmode] = useState(0);
  return (
    <View style={styles.informationPanel}>
      <Title title={["Les channels", "Les serveurs"][mode]} mode={mode} setMode={setmode} />
      <Selector List={mode ? props.serverList : props.chanList.map(elm => { return ({ name: elm }); })}
        setChanName={props.setChanName} mode={mode} />
      <User userName="NewMichel" />
    </View>
  );
}

const styles = StyleSheet.create({
  informationPanel: {
    width: "15%",
    height: "100%"
  }
})

export default InformationPanel;