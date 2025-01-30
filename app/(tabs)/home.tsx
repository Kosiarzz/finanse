import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import useUserStore from '@/store/userStore'

const Home = () => {

  const { user } = useUserStore();
  console.log("HOME")
  console.log(user)
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Link href="/sign_in" className="text-lg font-psemibold text-secondary">Sign in</Link>
    </SafeAreaView>
  )
}

export default Home