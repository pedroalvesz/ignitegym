import { useState } from 'react';
import {Center, FlatList, Heading, HStack, Text, VStack} from 'native-base';


import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';

export function Dashboard() {

  const [groups, setGroups] = useState(['Chest', 'Back', 'Biceps', 'Triceps', 'Shoulders', 'Legs']);
  const [selectedGroup, setSelectedGroup] = useState('');

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
          {groups.length}
        </Text>
      </HStack>

      
      </VStack>
    </VStack>
  )
}