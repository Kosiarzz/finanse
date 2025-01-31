import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import useUserStore from '@/store/userStore'
import * as SecureStore from 'expo-secure-store';

const Home = () => {

  const { user } = useUserStore();
  console.log("HOME")
  console.log(user)

    async function testSecureStore() {
      const passowrd = await SecureStore.getItemAsync('password');
      const accessToken = await SecureStore.getItemAsync('accessToken');
      console.log(passowrd);
      console.log(accessToken);
    }
    
    testSecureStore();
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Link href="/sign_in" className="text-lg font-psemibold text-secondary">Sign in</Link>
    </SafeAreaView>
  )
}

export default Home