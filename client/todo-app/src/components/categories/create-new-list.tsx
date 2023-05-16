import React from 'react'
import { Box,Text, Theme  } from '@/untils/theme'
import { Pressable } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { CategoriesNavigationType } from '@/navigation/types'
import {Feather} from '@expo/vector-icons';
import {useTheme} from '@shopify/restyle'


const CreateNewList = () => {
  
  const navigation = useNavigation<CategoriesNavigationType>();
  const theme = useTheme<Theme>()
  const NavigateToCreateCategory = ()=>{
    navigation.navigate("CreateCategory",{

    })
  }
    return (
    <Pressable onPress={NavigateToCreateCategory} >
    <Box p='4' bg='lightGray' borderRadius='rounded-5xl'flexDirection='row' alignItems='center'>
        <Feather name="plus" size={24} color={theme.colors.gray500}  />
      <Text variant='textXl'fontWeight='600' color='gray650' ml='3'> CreateNewList</Text>
    </Box>
    </Pressable>
    
  )
}

export default CreateNewList