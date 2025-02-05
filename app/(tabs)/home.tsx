import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import useUserStore from '@/store/userStore'
import * as SecureStore from 'expo-secure-store';
import CustomButton from '@/components/CustomButton'
import useAuthStore from '@/store/authStore'

const Home = () => {

  const {values, setIsLoggedIn} = useAuthStore();
  console.log("HOME")

    async function testSecureStore() {
      console.log(values)
      const passowrd = await SecureStore.getItemAsync('testt');
      console.log(passowrd); 
    }
    
    testSecureStore();

    const submit = async () => {
      setIsLoggedIn(false)
      router.replace("/sign-in");
    };
  return (
    <SafeAreaView>
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