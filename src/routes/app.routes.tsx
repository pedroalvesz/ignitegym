import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import {createBottomTabNavigator, BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>()

import { Dashboard } from '@screens/Dashboard'
import { History } from '@screens/History'
import { Profile } from '@screens/Profile'
import { Exercise } from '@screens/Exercise'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'

type AppRoutes = {
  dashboard: undefined;
  history: undefined;
  profile: undefined;
  exercise: { exerciseId: string; };
} 

export type AppRoutesNavigationProps = BottomTabNavigationProp<AppRoutes>;

export function AppRoutes() {

  const {sizes, colors} = useTheme()

  const ICON_SIZE = sizes[8]

  return(
    <Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingTop: sizes[6],
        paddingBottom: sizes[10],
      }
    }}
    >
      <Screen name="dashboard" component={Dashboard} options={{tabBarIcon : ({ color }) => <HomeSvg fill={color} height={ICON_SIZE} width={ICON_SIZE} />}}/>
      <Screen name="history" component={History} options={{tabBarIcon: ({ color }) => <HistorySvg fill={color} height={ICON_SIZE} width={ICON_SIZE} />}}/>
      <Screen name="profile" component={Profile} options={{tabBarIcon : ({ color }) => <ProfileSvg fill={color} height={ICON_SIZE} width={ICON_SIZE} /> }}/>
      <Screen name="exercise" component={Exercise} options={{tabBarButton: () => null}}/>
    </Navigator>
  )
}