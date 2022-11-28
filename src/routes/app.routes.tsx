import {createBottomTabNavigator, BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>()

import { Dashboard } from '@screens/Dashboard'
import { History } from '@screens/History'
import { Profile } from '@screens/Profile'
import { Exercise } from '@screens/Exercise'


type AppRoutes = {
  dashboard: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
} 

export type AppRoutesNavigationProps = BottomTabNavigationProp<AppRoutes>;

export function AppRoutes() {
  return(
    <Navigator>
      <Screen name="dashboard" component={Dashboard}/>
      <Screen name="history" component={History}/>
      <Screen name="profile" component={Profile}/>
      <Screen name="exercise" component={Exercise}/>
    </Navigator>
  )
}