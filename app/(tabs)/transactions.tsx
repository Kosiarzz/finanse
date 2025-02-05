import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';

const Transactions = () => {

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[]} //{ id: 1}, { id: 2}, { id: 3}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className='tesxt-2xl font-psemibold text-white'>
                  Koksiarz
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Brak transakcji"
            subtitle="Dodaj coś"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Transactions