import { useState } from 'react';
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base';

import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { SubmitButton } from '@components/SubmitButton';
import { UserPhoto } from '@components/UserPhoto';
import { TouchableOpacity } from 'react-native';



const PHOTO_SIZE = 33;

export function Profile() {

  const [photoisLoading, setPhotoIsLoading] = useState(false)

  return(
    <VStack flex={1}>
      <ScreenHeader name='Profile'/>
        <ScrollView contentContainerStyle={{ paddingBottom: 36}} flex={1} px={8} mt={6}>
          <Center>
          {photoisLoading
          ?
          <Skeleton
          w={PHOTO_SIZE}
          h={PHOTO_SIZE}
          rounded='full'
          startColor='gray.300'
          endColor='gray.600'
          borderWidth={2}
          borderColor='gray.500'
          />
          :
          <UserPhoto
          image='https://avatars.githubusercontent.com/u/79289930?v=4'
          size={PHOTO_SIZE}
          alt='Profile Screen User Photo'
          />
          }
          
            <TouchableOpacity>
              <Heading fontFamily='heading' fontSize='md' color='green.500' mt={2} mb={8}>
              Change Photo
              </Heading>
            </TouchableOpacity>

            <Input
            placeholder='Name'
            placeholderTextColor='gray.200'
            bg='gray.600'
            />

            <Input
            placeholder='E-mail'
            bg='gray.600'
            isDisabled
            />
            
            <VStack mt={12}>
              <Text fontFamily='heading' fontSize='md' color='gray.200' mb={2}>
                Change Password
              </Text>

              <Input
              placeholder='Current password'
              bg='gray.600'
              secureTextEntry
              />
              <Input
              placeholder='New password'
              bg='gray.600'
              secureTextEntry
              />
              <Input
              placeholder='Confirm new password'
              bg='gray.600'
              secureTextEntry
              />
            </VStack>

            <SubmitButton name='Submit' mt={4}/>
          </Center>
        </ScrollView>
    </VStack>
  )
}