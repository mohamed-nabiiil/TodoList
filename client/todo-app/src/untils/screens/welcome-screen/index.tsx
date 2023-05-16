import React from 'react'
import { Box,Text } from '@/untils/theme'
import {useNavigation} from '@react-navigation/native'
import { AuthScreenNavigationType } from '@/navigation/types'
import { Image } from 'react-native'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { LinearGradient } from 'expo-linear-gradient'
import Button from '@/components/button'



const BLOSSOM_IMAGE = "https://res.cloudinary.com/dooxt2sgsdooxt2sgs23233/image/upload/v1676809769/youtube/2023/february/blossom/icon_fb36u3.png"
const WelcomeScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();
    const navigateToSignUpScreen = ()=>{
        navigation.navigate("SignUp")
    }
    
  return (
    <SafeAreaWrapper>
        <LinearGradient colors={['#ffffff','#fcecff','#f8daff','#fae2ff','#fae2ff','#ffffff']}  style={{flex:1}} >
        <Box flex={1} justifyContent='center' >
          <Box alignItems='center' mb='3.5'>
               <Image source={{
                uri :BLOSSOM_IMAGE,
                width:120,
                height:120,
                }} />
          </Box>
          <Text textAlign='center' variant='textXl' fontWeight='700' >Do you want to be more productive?</Text>
          <Box mt='3.5'mx='10'>
          <Button label='Stay Your Journey' onPress={navigateToSignUpScreen} />
          </Box>
          <Text textAlign='center' variant='textXl' fontWeight='700' color='gray5' >26,500 registered today</Text>
        </Box>
        </LinearGradient>
    </SafeAreaWrapper>
  )  
}

export default WelcomeScreen