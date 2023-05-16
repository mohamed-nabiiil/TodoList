import { Box ,Text} from '@/untils/theme'
import React from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import useSWR from 'swr'
import { fetcher } from '@/services/config'
import Loader from '@/components/shared/loader'
import { ITask } from '@/types'
import NavigateBack from '@/components/shared/navigate-back'
import TaskAction from '@/components/tasks/tasks-action'
import { FlatList } from 'react-native'
import Task from '@/components/tasks/task'


const TodayScreen = () => {
const{data:tasks , isLoading:isLoadingTasks,mutate:mutateTask}=useSWR<ITask[]>(`tasks/today`,fetcher)

if(isLoadingTasks||!tasks){
  return <Loader/>
}

    return (
      <SafeAreaWrapper>
         <Box flex={1} mx='4'> 
         <Box width={40} >
          <NavigateBack/>
         </Box>
         <Box height={16} />
         <Box flexDirection='row' >
            <Text variant='textXl'ml='3' fontWeight='700' >Today</Text>
          </Box>
          <Box height={16} />
          
          <FlatList data={tasks} renderItem={({item,index})=>{
            return <Task task={item} mutateTasks={mutateTask} />
          }}
          ItemSeparatorComponent={()=><Box height={14} />}
          />
        </Box>
      </SafeAreaWrapper>
   
  )
}

export default TodayScreen