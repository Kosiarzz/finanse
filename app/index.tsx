import { Text, View, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '@/components/CustomButton';

import "../global.css"
import useAuthStore from '@/store/authStore';

export default function App() {
  const { isLoggedIn } = useAuthStore();
  console.log("INDEX")
  if (isLoggedIn) return <Redirect href="/home" />

  return (
    //Safeareview dostoswywuje widok do rozmiarów telefonu 
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image 
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text 
              className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image 
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovations:
            embark on a journey of limitless exploration with Aora
          </Text>

          <CustomButton
            title="Cotinue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      {/* Zmienia style paska górnego godzia, bateria etc */}
      <StatusBar backgroundColor='#161622' style='light'/> 
    </SafeAreaView>
  );
}
