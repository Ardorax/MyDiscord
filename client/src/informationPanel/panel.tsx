import { useState } from "react";
import { AppState, StyleSheet, View } from "react-native";
import Title from "./title"
import ServerSelector from "./serverSelector/selector";
import ChannelSelector from "./channelSelector/selector";
import User from "./user";
import NewButton from "./new"

interface selectorInfo {
  appStorage: {
    [key: string]: {
      connected: boolean, adress: string, name: string, websocket?: WebSocket, channels: {
        [key: string]: { author: string, content: string, color?: string, date?: string }[]
      }
    }
  };
  server: string;
  setServer: Function;
  channelName: string;
  setChanName: Function;
  setupdate: Function;
}

const InformationPanel = (props: selectorInfo) => {
  const [listingServers, setListing] = useState(true);
  const [forceReload, reload] = useState(true);
  return (
    <View style={styles.informationPanel}>
      <Title title={listingServers ? "Vos serveurs" : props.server}
        listingServers={listingServers} setListing={setListing} />
      {listingServers ?<NewButton appStorage={props.appStorage} forcereload={forceReload} reload={reload}/>: null}
      {listingServers ?
        <ServerSelector setServer={props.setServer} appStorage={props.appStorage}
          setListing={setListing} setchannelName={props.setChanName} server={props.server}
          channel={props.channelName} setupdate={props.setupdate}/> :
        <ChannelSelector setChanName={props.setChanName} appStorage={props.appStorage}
        server={props.server} />}
      <User userName={props.server ? props.appStorage[props.server].name : "Not a server"} />
    </View>
  );
}

const styles = StyleSheet.create({
  informationPanel: {
    width: "15%",
    height: "100%"
  },
})

export default InformationPanel;