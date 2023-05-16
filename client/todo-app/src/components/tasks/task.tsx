import { ITask, ITaskRequest } from '@/types'
import { Box, Text } from '@/untils/theme'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { Pressable } from 'react-native'
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/services/config'
import {useNavigation} from '@react-navigation/native'
import { HomeScreenNavigationType } from '@/navigation/types'


type TaskProps={
    task:ITask
    mutateTasks:()=>Promise<ITask[]|undefined>
}

interface ITaskStatusRequest{
    id:string
    isCompleted:boolean
}

const toggleTaskStatusRequest=async(url:string,{arg}:{arg :ITaskStatusRequest})=>{
    try {
        await axiosInstance.put(url+"/"+arg.id,{
            ...arg,
        })
    } catch (error) {
        console.log("error in toggle task status Request",error);
    }
}

const Task = ({task,mutateTasks}:TaskProps) => {
  const {trigger}= useSWRMutation("tasks/update",toggleTaskStatusRequest);
  const navigation = useNavigation<HomeScreenNavigationType>();
  
  const toggleTaskStatus=async()=>{
    try {
        const _updatedTask = {
            id:task._id,
            isCompleted: !task.isCompleted
        }
        await trigger(_updatedTask)
        await mutateTasks()
    } catch (error) {
        console.log("error in toggle task request",error)
    }
  }

const navigateToEditTask =()=>{
    navigation.navigate("EditTask",{
        task,
    })
}

    return (
    <Pressable onPress={toggleTaskStatus} onLongPress={navigateToEditTask} >
    <Box p='4' bg='lightGray' borderRadius='rounded-5xl'flexDirection='row'>
      <Box flexDirection='row' alignItems='center'>
         <Box height={26} width={26} bg={task.isCompleted ? "green400":'gray300'} borderRadius='rounded-xl' alignItems='center' justifyContent='center'>
            <Ionicons name='ios-checkmark' size={20} color="white" />
         </Box>
        <Text ml='3' variant='textXl' > {task.name} </Text>
      </Box>

      <Box>

      </Box>
    </Box>
    </Pressable>
  )
}

export default Task