import { Box ,Text} from '@/untils/theme'
import React,{useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import { AuthScreenNavigationType } from '@/navigation/types'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import Input from '@/components/shared/input'
import Button from '@/components/button'
import { Pressable } from 'react-native'
import { Controller ,useForm } from 'react-hook-form'
import { IUser } from '@/types'
import { registerUser } from '@/services/api'

const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
    const navigateToSignInScreen = ()=>{
        navigation.navigate("SignIn")
    }
   
   const {
    control,
    handleSubmit,
    formState:{errors},
   }= useForm<IUser>({
    defaultValues:{
        email:"",
        password:"",
    },
   });

const onSumbit=async(data:IUser)=>{ 
   try { 
        const {email,name,password}= data;
        await registerUser({
         email,
         name,
         password,
        });
        
        navigateToSignInScreen();
    } catch (error) {
        console.log("error in register",error);
    }
};

    return (
        <SafeAreaWrapper>
            <Box flex={1} px='5.5' mt={"13"}>
             <Text variant='textXl' fontWeight='700'>Welcome to TodoList!</Text>
             <Text variant='textXl' fontWeight='700' mb='6'> Your Journey starts here</Text>
             <Controller
           control={control}
           rules={{
            required:true,
           }}
           
           render={({field:{onChange,onBlur,value}})=>(
            <Input label='Name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
              
            />
           )} 
           name='name' 
         />
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
             <Pressable onPress={navigateToSignInScreen} >
                <Text color="primary" textAlign='right' >Log in?</Text>
             </Pressable>
             <Box mb="5.5"/>
             <Button label="Register" onPress={handleSubmit(onSumbit)} uppercase/>
             
           </Box>
  
        </SafeAreaWrapper>
    )   
}

export default SignUpScreen