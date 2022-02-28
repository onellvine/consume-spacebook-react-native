// import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import AllScreens from './screens/Allscreens';

export default function App() {
  return (
    <AllScreens />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
