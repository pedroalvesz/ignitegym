import { useCallback, useEffect, useState } from 'react';
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';

import { AppRoutesNavigationProps } from '@routes/app.routes';

import { api } from '@services/api'
import { AppError } from '@utils/AppError';
import { exerciseDTO } from '@dtos/exerciseDTO';



export function Dashboard() {

  const [groups, setGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('antebraço');
  const [exercises, setExercises] = useState<exerciseDTO[]>([])

  const { navigate } = useNavigation<AppRoutesNavigationProps>()
  const toast = useToast()

  function handleShowExerciseDetail() {
    navigate('exercise')
  }

  async function fetchGroups() {
    const { data } = await api.get('/groups')
    setGroups(data)
  }

  async function fetchExercises() {
    try {
      const { data } = await api.get(`/exercises/bygroup/${selectedGroup}`)
      setExercises(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Unable to load exercises.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
        mx: 4,
      })
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  //Focus Effect executa novamente quando volta para a tela
  useFocusEffect(useCallback(() => {
    fetchExercises()
  },[selectedGroup]))

  return(
    <VStack flex={1}>
      <HomeHeader/>

      <FlatList
      data={groups}
      keyExtractor={item => item}
      renderItem={({ item }) => 
      <Group
        name={item}
        isActive={selectedGroup === item }
        onPress={() => setSelectedGroup(item)}
        />
      }
      horizontal
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{px: 8}}
      my={10}
      minH={12}
      maxH={12}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between'>
          <Heading fontFamily='heading' fontSize='md' color='gray.200'>
            Exercises
          </Heading>

          <Text fontFamily='body' fontSize='sm' color='gray.200'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ExerciseCard name={item.name} onPress={handleShowExerciseDetail} />}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ paddingBottom: 20 }}
        mt={3}
        />
      </VStack>
    </VStack>
  )
}