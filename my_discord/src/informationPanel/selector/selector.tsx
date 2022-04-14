import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import SelectorOption from './option'

interface ListsInfo {
  setChanName: Function;
  List: string[];
  mode: number;
}

const Selector = (props: ListsInfo) => {
  return (
    <ScrollView style={styles.channelsList}>
      {props.List.map(element => <SelectorOption name={element} key={element}
      setChanName={props.setChanName} mode={props.mode}/>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  channelsList: {
    backgroundColor: "#333",
    height: "100%",
  },
});


export default Selector;