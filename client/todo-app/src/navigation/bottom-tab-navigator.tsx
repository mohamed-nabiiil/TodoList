import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {RootBottomTabParamList } from './types'
import HomeStackNavigator from './home-stack-navigator';
import CompletedScreen from '@/untils/screens/completed-screen';
import TodayScreen from '@/untils/screens/today-screen';
import CategoryStackNavigator from './category-stack-navigator';
import Icons from '@/components/shared/icons';
import theme from '@/untils/theme';
import {useTheme} from '@shopify/restyle'



const Tab =createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNaviagtor=()=>{
    const theme = useTheme()
return(
    <Tab.Navigator  screenOptions={{
        tabBarActiveTintColor:"black",
        tabBarInactiveTintColor: theme.colors.gray500,
        tabBarHideOnKeyboard:true,
    }}>
      <Tab.Screen name='HomeStack' component={HomeStackNavigator}  options={()=>({
        title:"Home",
        tabBarIcon:({color})=><Icons name='home' color={color} /> ,
        headerShown :false,
      })}/>
      <Tab.Screen name='Completed' component={CompletedScreen}  options={()=>({
        title:"Completed",
        tabBarIcon:({color})=><Icons name='completed' color={color}
         />,
         headerShown :false,
      })}/>
      <Tab.Screen name='Today' component={TodayScreen}  options={()=>({
        title:"Today",
        tabBarIcon:({color})=><Icons name='calendar' color={color} />,
        headerShown :false, 
      })}/>
      <Tab.Screen name='CategoriesStack' component={CategoryStackNavigator} options={()=>({
        title:"Categories",
        tabBarIcon:({color})=><Icons name='categories' color={color} /> ,
        headerShown :false,
      })} />
    </Tab.Navigator>
)
}
export default BottomTabNaviagtor