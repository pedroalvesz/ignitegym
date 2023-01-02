import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Heading, ScrollView, Skeleton, Text, useToast, VStack } from 'native-base';
import { useForm, Controller} from 'react-hook-form'

import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { SubmitButton } from '@components/SubmitButton';
import { UserPhoto } from '@components/UserPhoto';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

// Estou importando todo da lib em um lugar só (ImagePicker)
// Facilita o entendimento / manutenção do código já que antes das funcões de cada lib nos dizemos de qual lib é : ImagePicker.função da lib

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type ProfileProps = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  confirm_password: string;
}

const ProfileSchema = yup.object({
  name: yup
    .string()
    .required('Insert your new Username.'),
  password: yup
    .string()
    .min(8,'Your new password must have at least 8 characters.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match.')
    .nullable()
    .transform((value) => !!value ? value : null)
    .when('password', {
      is: (Field: any) => Field , //Field !== null && Field !== undefined // Quando a senha for informada (no null no undefined) esse campo e requirido
      then: yup
      .string()
      .nullable()
      .required('Confirm your new password.')
      .transform((value) => !!value ? value : null)
      ,
    })
})

const PHOTO_SIZE = 33;


export function Profile() {

  const [isUpdating, setIsUpdating] = useState(false)
  const [photoisLoading, setPhotoIsLoading] = useState(false);

  const { user, updateUserProfile } = useAuth()

  const [userPhoto, setUserPhoto] = useState('https://github.com/pedroalvesz.png');

  const {control, handleSubmit, formState: { errors }} = useForm<ProfileProps>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    }
  })

  const toast = useToast()


  async function handleUpdateUser({name, password, old_password} : ProfileProps) {
    try {
      setIsUpdating(true)

      const updatedUser = user;
      updatedUser.name = name;

      await api.put('/users', {name, password, old_password});

      updateUserProfile(updatedUser)

      toast.show({
        title: 'Profile updated successfully',
        placement: 'top',
        bg: 'green.500',
        mx: 4,
      })

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Unable to load your history.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
        mx: 4,
      })
    } finally {
      setIsUpdating(false)
    }

  }

  async function handleSelectUserPhoto() {
    try{
      setPhotoIsLoading(true)
      const PhotoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4 , 4], //Aspecto da imagem / 4 por 4
        allowsEditing: true, //Habilitar edição nativa
      });
  
      if(PhotoSelected.canceled) {
        return;
      }
      
      if(PhotoSelected.assets[0].uri) {

        const photoInfo = await FileSystem.getInfoAsync(PhotoSelected.assets[0].uri);

        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5 ) {
          return toast.show({
            title: 'Your image is too large. Please choose one smaller than 5MB.',
            placement: 'top',
            bg: 'red.500',
            mx: 4,
            _title: {
              textAlign: 'center',
            },
          })
        }

        setUserPhoto(PhotoSelected.assets[0].uri);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }



  return(
    <VStack flex={1}>
      <ScreenHeader name='Profile'/>
        <ScrollView contentContainerStyle={{ paddingBottom: 72 }} flex={1} px={8} pt={6}>
          <Center>
          {photoisLoading
          ?
          <Skeleton
          w={PHOTO_SIZE}
          h={PHOTO_SIZE}
          rounded='full'
          startColor='gray.300'
          endColor='gray.500'
          borderWidth={2}
          borderColor='gray.500'
          />
          :
          <UserPhoto
          source={{uri : userPhoto}}
          size={PHOTO_SIZE}
          alt='Profile Screen User Photo'
          />
          }
          
            <TouchableOpacity onPress={handleSelectUserPhoto}>
              <Heading fontFamily='heading' fontSize='md' color='green.500' mt={2} mb={8}>
              Change Photo
              </Heading>
            </TouchableOpacity>

            <Controller
            control={control}
            name='name'
            render={({field: { onChange, value }}) => (
              <Input
              placeholder='username'
              placeholderTextColor='gray.200'
              bg='gray.600'
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
              />
            )}
            />

            <Controller
            control={control}
            name='email'
            render={({field: {value}}) => (
              <Input
              placeholder='E-mail'
              value={value}
              bg='gray.600'
              isDisabled
              />
            )}
            />
            
            <VStack mt={12}>
              <Text fontFamily='heading' fontSize='md' color='gray.200' mb={2}>
                Change Password
              </Text>
              
              <Controller
              control={control}
              name='old_password'
              render={({ field: {onChange}}) => (
                <Input
                placeholder='Current password'
                bg='gray.600'
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
                />
              )}
              />

              <Controller
              control={control}
              name='password'
              render={({ field: {onChange}}) => (
                <Input
                placeholder='New password'
                bg='gray.600'
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                />
              )}
              />
              
              <Controller
              control={control}
              name='confirm_password'
              render={({ field: {onChange}}) => (
                <Input
                placeholder='Confirm new password'
                bg='gray.600'
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
                />
              )}
              />

            </VStack>

            <SubmitButton
            name='Submit'
            mt={4}
            onPress={handleSubmit(handleUpdateUser)}
            isLoading={isUpdating}
            />
          </Center>
        </ScrollView>
    </VStack>
  )
}