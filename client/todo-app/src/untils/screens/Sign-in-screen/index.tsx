import { Box ,Text} from '@/untils/theme'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import Input from '@/components/shared/input'
import Button from '@/components/button'
import { AuthScreenNavigationType } from '@/navigation/types'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { Pressable } from 'react-native'
import {useForm,Controller} from 'react-hook-form'
import { IUser } from '@/types'
import { loginUser } from '@/services/api'
import useUserGlobalStore from '@/store/useUserGlobalStore'

const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();
    const navigateToSignUpScreen = ()=>{
        navigation.navigate("SignUp")
    }
    const {updateUser}= useUserGlobalStore()
    
    const {
        control,
        handleSubmit,
        formState:{errors},
    }=useForm<Omit<IUser,"name">>({
        defaultValues:{
            email:"",
            password:"",
        }
    })

const onSumbit=async(data:Omit<IUser,"name">)=>{
    try {
        const {email,password}=data;
        const _user = await loginUser({
            email,
            password, 
        })
     updateUser({
        email:_user.email,
        name:_user.name,
     })
    } catch (error) {
        console.log("error in log in user,error")
    }

}

    return (
        <SafeAreaWrapper>
        <Box flex={1} px='5.5' justifyContent='center'>
         <Text variant='textXl' fontWeight='700'>Welcome Back</Text>

         <Box  mb='6'/>
         <Controller
           control={control}
           rules={{
            required:true,
           }}
           render={({field:{onChange,onBlur,value}})=>(
            <Input label='E-mail'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="E-mail"
              
            />
           )} 
           name='email' 
         />
         <Box  mb='6'/>
         <Controller
           control={control}
           rules={{
            required:true,
           }}
           render={({field:{onChange,onBlur,value}})=>(
            <Input label='Password'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry={true}
            />
           )} 
           name='password' 
         />
         <Box mt="5.5"/>
         <Pressable onPress={navigateToSignUpScreen} >
            <Text color="primary" textAlign='right' >Register?</Text>
         </Pressable>
         <Box mb="5.5"/>
         <Button label="Log in" onPress={handleSubmit(onSumbit)} uppercase/>
       </Box>
    </SafeAreaWrapper>
    
  )
}

export default SignInScreen