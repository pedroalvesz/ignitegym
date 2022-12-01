import { useState } from 'react';
import { FlatList, Heading, HStack, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native'

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';

import { AppRoutesNavigationProps } from '@routes/app.routes';

export function Dashboard() {

  const [groups, setGroups] = useState(['Chest', 'Back', 'Biceps', 'Triceps', 'Shoulders', 'Legs']);
  const [selectedGroup, setSelectedGroup] = useState('Chest');

  const [exercises, setExercises] = useState(['Pull Down', 'Deadlift', 'Lat-Pull Dowm', 'Pull Up'])

  const { navigate } = useNavigation<AppRoutesNavigationProps>()

  function handleShowExerciseDetail() {
    navigate('exercise')
  }

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
      keyExtractor={item => item}
      renderItem={({item}) => <ExerciseCard name={item} onPress={handleShowExerciseDetail} />}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{ paddingBottom: 20 }}
      mt={3}
      />

      </VStack>
    </VStack>
  )
}