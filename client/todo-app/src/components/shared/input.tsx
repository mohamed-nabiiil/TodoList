import { View, TextInputProps,TextInput } from 'react-native'
import React from 'react'
import theme, { Box, Text } from '@/untils/theme'

type InputProps={
    label:string
    error?:undefined
} & TextInputProps

const Input = ({label,secureTextEntry,value,...rest}:InputProps) => {
  return (
    <Box flexDirection='column'>
      <Text variant='textXs' textTransform='uppercase' mb="3.5" >{label}</Text>
      <TextInput style={{
           padding:16,
           borderWidth:1,
           borderColor:theme.colors.grey,
           borderRadius:theme.borderRadii["rounded-7xl"]
      }}
      placeholder={label}
      secureTextEntry={secureTextEntry}
      value={value ?? ""}
      {...rest}
       />
    </Box>
  )
}

export default Input