import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './Login';
import Menu from './Menu';
import DeliveryMenu from './DeliveryMenu';
import DeliveryRecordMenu from './DeliveryRecordMenu';
import RealTimeMenu from './RealTimeMenu';
import SettingMenu from './SettingMenu'
import MonitoringMenu from './MonitoringMenu';

const Stack = createStackNavigator();

export default StackNavigator = () => {
    const [user, setUser] = useState(null);

    return (
        <NavigationContainer>
            {
                (user === null) ?
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='login' children={props => <Login {...props} setUser={setUser} />} />
                    </Stack.Navigator>
                    : <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='menu' children={props => <Menu {...props} user={user} />} />
                        <Stack.Screen name='delivery' children={props => <DeliveryMenu {...props} user={user} />} />
                        <Stack.Screen name='receipt' children={props => <DeliveryRecordMenu {...props} user={user} />} />
                        <Stack.Screen name='realtime' children={props => <RealTimeMenu {...props} />} />
                        <Stack.Screen name='setting' children={props => <SettingMenu {...props} user={user} />} />
                        <Stack.Screen name='monitoring' children={props => <MonitoringMenu {...props} user={user} />} />
                    </Stack.Navigator>
            }
        </NavigationContainer>
    );
};
