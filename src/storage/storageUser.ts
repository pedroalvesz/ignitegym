import AsyncStorage from '@react-native-async-storage/async-storage';

import { userDTO } from '@dtos/userDTO'

export async function StorageUserSave(user: userDTO) {
   await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user) )
}