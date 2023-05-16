import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {AppStackParamList} from './types'
import BottomTabNaviagtor from './bottom-tab-navigator'


const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStackNavigator = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name="Root" component={BottomTabNaviagtor} options={{
        headerShown:false,
    }} />  
        
    </Stack.Navigator>
  )
}

export default AppStackNavigator

