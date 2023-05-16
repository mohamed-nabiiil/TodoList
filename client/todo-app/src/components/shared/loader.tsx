import React from 'react'
import { Box ,Text} from '@/untils/theme'
import SafeAreaWrapper from './safe-area-wrapper'
import { ActivityIndicator } from 'react-native'

const Loader = () => {
  return (
    <SafeAreaWrapper>
     <Box flex={1} alignItems='center' justifyContent='center' >
      <ActivityIndicator />
    </Box>
    </SafeAreaWrapper>
 ) 
}
export default Loader