/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View } from 'react-native';
import { AppNavigator } from './src/navigation';

function App(): React.JSX.Element {

  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}

export default App;
