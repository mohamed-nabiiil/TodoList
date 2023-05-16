import { Box ,Text} from '@/untils/theme'
import React from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import {useRoute ,RouteProp} from '@react-navigation/native'
import { CategoriesStackParamList } from '@/navigation/types'
import useSWR from 'swr'
import { fetcher } from '@/services/config'
import Loader from '@/components/shared/loader'
import { ICategory, ITask } from '@/types'
import NavigateBack from '@/components/shared/navigate-back'
import TaskAction from '@/components/tasks/tasks-action'
import { FlatList } from 'react-native'
import Task from '@/components/tasks/task'

type CategoryScreenRouteProp= RouteProp<CategoriesStackParamList,"Category">
const CategoryScreen = () => {
   
  const route =useRoute<CategoryScreenRouteProp>();

const {id}=route.params;

const{data:category , isLoading:isLoadingCategory}=useSWR<ICategory>(`categories/${id}`,fetcher)

const{data:tasks , isLoading:isLoadingTasks,mutate:mutateTask}=useSWR<ITask[]>(`tasks/tasks-by-category/${id}`,fetcher,{
  refreshInterval:1000,
})

if(isLoadingTasks ||isLoadingCategory|| !category ||!tasks){
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
            <Text variant='textXl' fontWeight='700' >{category.icon.symbol}</Text>
            <Text variant='textXl'ml='3' style={{color:category.color.code}} fontWeight='700' >{category.name}</Text>
          </Box>
          <Box height={16} />
          <TaskAction categoryId={id} />
          <FlatList data={tasks} renderItem={({item,index})=>{
            return <Task task={item} mutateTasks={mutateTask}/>
          }}
          ItemSeparatorComponent={()=><Box height={14} />}
          />
        </Box>
      </SafeAreaWrapper>
   
  )
}

export default CategoryScreen