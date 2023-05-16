import Loader from '@/components/shared/loader'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import Task from '@/components/tasks/task'
import TaskAction from '@/components/tasks/tasks-action'
import { fetcher } from '@/services/config'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { ICategory, ITask } from '@/types'
import { getGreeting } from '@/untils/helpers'
import { Box ,Text} from '@/untils/theme'
import { format } from 'date-fns'
import React from 'react'
import { FlatList } from 'react-native'
import useSWR from 'swr'

const today = new Date();
const greeting = getGreeting({hour:new Date().getHours()})

const HomeScreen = () => {
   const {user} =useUserGlobalStore()
   const {data:tasks,isLoading ,mutate:mutateTask}=  useSWR<ITask[]>("tasks/",fetcher);
  if(isLoading || !tasks){
   return <Loader/>
  }
    return (
        <SafeAreaWrapper >
           <Box flex={1} mx='4'>
           <Text variant='textXl' fontWeight='500' > Good {greeting.toLowerCase()} {user?.name} </Text>
           <Text variant='textXl' fontWeight='500'> it's {format(today,"eeee,LLL dd")} - {tasks.length} tasks </Text>
           <Box height={26}/>
           <TaskAction categoryId='' />
           <Box height={26} />
           <FlatList 
           data={tasks}
           renderItem={({item})=> <Task task={item} mutateTasks={mutateTask}/>}
           ItemSeparatorComponent={()=> <Box height={14}/>}
           />
           </Box>
        </SafeAreaWrapper>
    
  )
}

export default HomeScreen