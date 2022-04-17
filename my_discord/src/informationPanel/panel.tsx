import { useState } from "react";
import { AppState, StyleSheet, View } from "react-native";
import Title from "./title"
import ServerSelector from "./serverSelector/selector";
import ChannelSelector from "./channelSelector/selector";
import User from "./user";

interface selectorInfo {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  server: string;
  setServer: Function;
  channelName: string;
  setChanName: Function;
}

const InformationPanel = (props: selectorInfo) => {
  const [listingServers, setListing] = useState(true);
  return (
    <View style={styles.informationPanel}>
      <Title title={listingServers ? "Les serveurs" : "Les channels"}
        listingServers={listingServers} setListing={setListing} />
      {listingServers ?
        <ServerSelector setServer={props.setServer} appStorage={props.appStorage}
          setListing={setListing} setchannelName={props.setChanName} server={props.server} /> :
        <ChannelSelector setChanName={props.setChanName} appStorage={props.appStorage}
        server={props.server} />}
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