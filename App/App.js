import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import DeliveryMenu from './components/DeliveryMenu';
import Menu from './components/Menu';


const Stack = createStackNavigator();


class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='DeliveryMenu' component={DeliveryMenu} />
                    <Stack.Screen name='Menu' component={Menu} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default App;