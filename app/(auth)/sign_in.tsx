import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchema, type LoginForm, } from '@/api/validation/authValidation';
import { Controller, useForm } from 'react-hook-form';


interface IFormInput {
  username: string;
  password: string;
}

const SignIn = () => {

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = (values: LoginForm) => {
    //wykonanie funkcji API
    //wykonanie zustand
    //reszta logiki
    console.log("LOGIN")
    console.log(values)
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>
          <Controller
            control={control}
            name='username'
            render={({field, fieldState}) => (
              <FormField 
                title="Email"
                onChangeText={field.onChange}
                value={field.value}
                otherStyles="mt-7"
                keyboardType="email-address"
                errorMessage={fieldState.error?.message}
                placeholder=''
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({field, fieldState}) => (
              <FormField 
                title="Hasło"
                onChangeText={field.onChange}
                value={field.value}
                otherStyles="mt-7"
                keyboardType="password"
                errorMessage={fieldState.error?.message}
                placeholder=''
              />
            )}
          />
          <CustomButton 
            title="Sign In"
            handlePress={handleSubmit(onSubmit, (test) => console.log(test))}
            containerStyles="mt-7"
            textStyles=''
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account? {' '}
              <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign up </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn