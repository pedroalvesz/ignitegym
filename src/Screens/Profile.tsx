import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Heading, ScrollView, Skeleton, Text, Toast, useToast, VStack } from 'native-base';
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

type ProfileProps = {
  username: string,
  current_password: string,
  new_password: string,
  confirm_new_password: string,
}

const ProfileSchema = yup.object({
  username: yup.string().required('Insert your new Username.'),
  current_password: yup.string().required('Insert your current password.'),
  new_password: yup.string().required('Insert a new password.'),
  confirm_new_password: yup.string().required('Confirm your new password.'),
})

const PHOTO_SIZE = 33;

export function Profile() {

  const [photoisLoading, setPhotoIsLoading] = useState(false);

  const [userPhoto, setUserPhoto] = useState('https://github.com/pedroalvesz.png');

  const toast = useToast()

  const {control, handleSubmit, formState: { errors }} = useForm<ProfileProps>({
    resolver: yupResolver(ProfileSchema)
  })

  function handleChangeInfo(data : ProfileProps) {
    console.log(data)
  }

  async function handleSelectUserPhoto() {
    //Tentar reduzir esses if
    setPhotoIsLoading(true)

    try{
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
        <ScrollView contentContainerStyle={{ paddingBottom: 36}} flex={1} px={8} pt={6}>
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
          image={userPhoto}
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
            name='username'
            render={({field: { onChange, value }}) => (
              <Input
              placeholder='Name'
              placeholderTextColor='gray.200'
              bg='gray.600'
              onChangeText={onChange}
              value={value}
              errorMessage={errors.username?.message}
              />
            )}
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
              
              <Controller
              control={control}
              name='current_password'
              render={({ field: {onChange, value}}) => (
                <Input
                placeholder='Current password'
                bg='gray.600'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.current_password?.message}
                />
              )}
              />

              <Controller
              control={control}
              name='new_password'
              render={({ field: {onChange, value}}) => (
                <Input
                placeholder='New password'
                bg='gray.600'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.new_password?.message}
                />
              )}
              />
              
              <Controller
              control={control}
              name='confirm_new_password'
              render={({ field: {onChange, value}}) => (
                <Input
                placeholder='Confirm new password'
                bg='gray.600'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirm_new_password?.message}
                />
              )}
              />

            </VStack>

            <SubmitButton name='Submit' mt={4} onPress={handleSubmit(handleChangeInfo)}/>
          </Center>
        </ScrollView>
    </VStack>
  )
}