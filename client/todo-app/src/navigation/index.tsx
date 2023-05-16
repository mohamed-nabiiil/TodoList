
import React,{useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AuthStackNavigator from './auth-stack-navigator';
import AppStackNavigator from './app-stack-navigator';
import useUserGlobalStore from '@/store/useUserGlobalStore';

const Navigation = () => {
    const {user} = useUserGlobalStore()
    //console.log(`user`,JSON.stringify(user,null,2));
  return (
   <NavigationContainer>
    {
        user ? <AppStackNavigator/> :<AuthStackNavigator/>
    }
   </NavigationContainer>
  )
}

export default Navigation

