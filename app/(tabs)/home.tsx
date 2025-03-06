import { View, Text, Button, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import useAuthStore from '@/store/authStore';
import { getAccounts } from '@/api/account/account';
import useAccountStore from '@/store/useAccountStore';
import EmptyState from '@/components/EmptyState';
import FloatingButton from '@/components/FloatingButton';
import CustomButton from '@/components/CustomButton';

const Home = () => {

  const { values, setIsLoggedIn } = useAuthStore();
  const { accounts, setAccounts } = useAccountStore();
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  console.log("HOME")

  // async function testSecureStore() {
  //   console.log(values)
  //   const passowrd = await SecureStore.getItemAsync('testt');
  //   console.log(passowrd); 
  // }
  
  // testSecureStore();

  const fetchData = async () => {

    try {
      const fetchedData = await getAccounts(values.accessToken)
      
      setAccounts(fetchedData) 
    
    } catch (error) {
      // console.log('Error:', JSON.stringify(error, null, 2));
      console.log(error.message)
    }
  }

  useEffect(() => {
    
    fetchData();
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }

  const onAccount = async () => {
    try {
      setIsLoading(true)
      
      router.push("/account/create");
    } catch (error) {
      console.error('Transaction failed', error.response);
      console.log(error.response.data)

    } finally {
      setIsLoading(false)
    }
  };

  const onEdit = async (id, name, saldo) => {
      try {
        console.log(name, saldo)
        setIsLoading(true)
        console.log("EDIT")
        const dataToSend = {
          id,
          name,
          saldo
        };
    
        router.push({
          pathname: '/account/edit',
          params: dataToSend,
        });
  
      } catch (error) {
        console.error('Transaction edit failed', error);
        setAuthError("Ups, coś nie tak")
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className='text-white'>Home</Text>
      
      <FlatList
        data={accounts} //{ id: 1}, { id: 2}, { id: 3}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              className="flex flex-col items-center px-4 mb-5" 
              key={item.id}
              onPress={() => onEdit(item.id, item.name, item.saldo)} // Wywołanie funkcji onEdit z id
            >
              <Text className='text-white'>{item.id}</Text>
              <Text className='text-white'>{item.name}</Text>
              <Text className='text-white'>{item.saldo} zł</Text>
            </TouchableOpacity>
          </>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <Text className='tesxt-2xl font-psemibold text-white'>
                Konta
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Brak kont"
            subtitle="Dodaj coś"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <CustomButton
        title="Dodaj konto"
        handlePress={onAccount}
        containerStyles="mt-7"
        isLoading={isLoading}
        textStyles={''}
      />
      <Text className='text-white'>Ostatnie transakcje</Text>
      <Text className='text-white'>Wykres konta</Text>
      <Text className='text-white'>Zbilżające się płatności</Text>
      <Text className='text-white'>Przypomnienia</Text>
      <FloatingButton />

    </SafeAreaView>
  )
}

export default Home