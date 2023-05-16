import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { CategoriesStackParamList } from './types'
import CategoriesScreen from '@/untils/screens/categories-screen'
import CategoryScreen from '@/untils/screens/category-screen'
import CreateCategoryScreen from '@/untils/screens/create-category-screen'



const Stack = createNativeStackNavigator<CategoriesStackParamList>()

const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name='Categories' component={CategoriesScreen}  options={{
        headerShown:false,
    }} />
    <Stack.Screen name='Category' component={CategoryScreen} options={{
        headerShown:false,
    }} />
     <Stack.Screen name='CreateCategory' component={CreateCategoryScreen} options={{
        headerShown:false,
    }} />
  </Stack.Navigator>
  )
}

export default CategoryStackNavigator