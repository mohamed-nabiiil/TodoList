import { ICategory, ITaskRequest } from '@/types'
import { Box, Text } from '@/untils/theme'
import React,{useState} from 'react'
import { FlatList, Pressable, TextInput } from 'react-native'
import { isToday , format } from 'date-fns'
import useSWR from'swr'
import Loader from '../shared/loader'
import axiosInstance, { BASE_URL, fetcher } from '@/services/config'
import { Calendar } from 'react-native-calendars'
import useSWRMutation from'swr/mutation'
import { useSWRConfig} from 'swr'


type taskActionsProps= {
    categoryId:string,
}

const today= new Date()

const todayIsDate=new Date();
todayIsDate.setHours(0,0,0,0)



const createTaskRequest=async(url:string,{arg}:{arg:ITaskRequest})=>{
    try {
        await axiosInstance.post(url,{
            ...arg
        })
    } catch (error) {
        console.log("error in create task" , error)
    }
}

const TaskAction = ({categoryId}:taskActionsProps) => {

    const [newTask,setNewTask]=useState<ITaskRequest>({
      categoryId:categoryId,
      date:todayIsDate.toISOString(),
      isCompleted:false,
      name:"",
    })
    const {data,trigger}=useSWRMutation("tasks/create",createTaskRequest)

    const [isSelectingGategory,setIsSelectingCategory]=useState<boolean>(false);

    const [isSelectingDate,setIsSelectingDate]=useState<boolean>(false)

    const {data:categories,isLoading}=useSWR<ICategory[]>("categories",fetcher);

  const {mutate} = useSWRConfig();

    if(isLoading || !categories ){return <Loader/>}

    const selectedCategory= categories?.find(_category=>_category._id===newTask.categoryId);

    const onCreateTask=async()=>{
        try {
            if(newTask.name.length.toString().trim().length>0){
               await trigger({
                    ...newTask,
                })
                setNewTask({
                    categoryId:newTask.categoryId,
                    isCompleted:false,
                    date:todayIsDate.toISOString(),
                    name:"",
                })
                mutate(BASE_URL+"/tasks")
            }
        } catch (error) {
            console.log("error in create task" ,error)
        }
    }
  return (
    <Box  >
    <Box bg='lightGray' px='4' py='3.5' borderRadius='rounded-5xl' flexDirection='row' position='relative'>
      <TextInput placeholder='Create a new task'value={newTask.name}
       onChangeText={(text)=>{
        setNewTask(prev=>{
            return{
                ...prev,
                name:text,
            }
        })  
      }}
      onSubmitEditing={onCreateTask}
       style={{paddingVertical:8 ,paddingHorizontal:8,fontSize:16,width:"50%",}}maxLength={36} textAlignVertical='center' />
       <Box flexDirection='row' alignItems='center' >
        <Pressable onPress={()=>{
            setIsSelectingDate((prev)=>!prev)
        }}>
            <Box flexDirection='row' alignContent='center' bg='white' p='2' borderRadius='rounded-xl' >
               <Text>
                {isToday(new Date(newTask.date))?"Today":format(new Date(newTask.date),"MMM dd")}
               </Text>
            </Box>
        </Pressable>
        <Box width={12}/>
        <Pressable onPress={()=>{
            setIsSelectingCategory((prev)=>!prev)
        }}>
            <Box bg='white' flexDirection='row' alignItems='center' p='2' borderRadius='rounded-xl'>
              <Box width={12} height={12} borderRadius='rounded' borderWidth={2} mr='1' style={{
                borderColor:selectedCategory?.color.code,
              }}>
              </Box>
              <Text style={{color:selectedCategory?.color.code,}}>{selectedCategory?.name}</Text>
            </Box>
        </Pressable>
       </Box>
       {isSelectingGategory && (
        <Box position='absolute' right={40} bottom={-120} >
       <FlatList data={categories} renderItem={({item,index})=>{
        return(<Pressable onPress={()=>{
            setNewTask(prev=>{
                return{
                    ...prev,
                    categoryId:item._id,
                }
            }) 
            setIsSelectingCategory(false)
        }}>
            <Box bg='gray250' p='2' borderWidth={2} borderBottomEndRadius={categories?.length-1===index?"rounded-2xl":"none"} borderBottomStartRadius={categories?.length-1===index?"rounded-2xl":"none"} borderTopStartRadius={index===0 ? "rounded-3xl":"none"} borderTopEndRadius={index===0 ? "rounded-3xl":"none"} >
              <Box flexDirection='row' >
              <Text>{item.icon.symbol}</Text>
              <Text ml='2'fontWeight={newTask.categoryId===item._id?"700":"400"} >{item.name}</Text>
            </Box>
            </Box>
        </Pressable>)
    }}  />
       </Box>
       )}
       
    </Box>
    {
        isSelectingDate && (
        <Box>
            <Calendar minDate={format(today,"Y-MM-dd")}
            onDayPress={(day)=>{
                setIsSelectingDate(false)
                const selectedDate = new Date(day.dateString).toISOString()
                setNewTask(prev=>{
                    return{
                        ...prev,
                        date:selectedDate,
                    }
                })
            }}
            />
        </Box>  
         )}
    </Box>
  )
}

export default TaskAction