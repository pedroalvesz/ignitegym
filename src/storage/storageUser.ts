import AsyncStorage from '@react-native-async-storage/async-storage';

import { userDTO } from '@dtos/userDTO'
import { USER_STORAGE } from './storageConfig';

export async function StorageUserSave(user: userDTO) {
   await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user) )
}

export async function StorageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: userDTO = storage ? JSON.parse(storage) : {}

  return user;
}

export async function StorageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}