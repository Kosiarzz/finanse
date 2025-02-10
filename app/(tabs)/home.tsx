import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import useAuthStore from '@/store/authStore';
import { getAccounts } from '@/api/account/account';
import useAccountStore from '@/store/useAccountStore';

const Home = () => {

  const { values, setIsLoggedIn } = useAuthStore();
  const { accounts, setAccounts } = useAccountStore();

  console.log("HOME")

  async function testSecureStore() {
    console.log(values)
    const passowrd = await SecureStore.getItemAsync('testt');
    console.log(passowrd); 
  }
  
  testSecureStore();

  const fetchData = async () => {

    try {
      const fetchedData = await getAccounts(values.accessToken)
      console.log(fetchedData)
      setAccounts(fetchedData) 
      console.log(accounts)
    } catch (error) {
      // console.log('Error:', JSON.stringify(error, null, 2));
      console.log(error.message)
    }
  }

  useEffect(() => {
    
    fetchData();
  }, [])

  const submit = async () => {
    setIsLoggedIn(false)
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <Text>Home</Text>
      <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign in</Link>
      <TouchableOpacity
          onPress={submit}
          activeOpacity={0.7}
          className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center`}
      > 
        <Text className={`text-primary font-psemibold text-lg`}>Wyloguj</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home