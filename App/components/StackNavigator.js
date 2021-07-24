import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './Menu';
import DeliveryMenu from './DeliveryMenu';
import DeliveryRecordMenu from './DeliveryRecordMenu';
import RealTimeMenu from './RealTimeMenu';
import SettingMenu from './SettingMenu'
import MonitoringMenu from './MonitoringMenu';

const Stack = createStackNavigator();

export default StackNavigator = () => {

    const viewData = {
        stackName: ['menu', 'delivery', 'receipt', 'realtime', 'setting', 'monitoring'],
        stackComponent: [Menu, DeliveryMenu, DeliveryRecordMenu, RealTimeMenu, SettingMenu, MonitoringMenu],
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                viewData.stackName.map((v, i) => (
                    < Stack.Screen name={v} component={viewData.stackComponent[i]} key={i} />
                ))
            }
        </Stack.Navigator>
    );
};