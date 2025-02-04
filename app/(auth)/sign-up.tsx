import { View, Text, ScrollView, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema, type RegisterForm, } from '@/api/validation/authValidation';
import { Controller, useForm } from 'react-hook-form';

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  newsletterAccepted: boolean;
}

const SignUp = () => {
  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = (values: RegisterForm) => {
    //wykonanie funkcji API (błędy bez znaczenia z backendu)
    //wykonanie zustand
    //reszta logiki
  
    console.log("REGISTER")
    console.log(values)
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
          <Controller
            control={control}
            name='username'
            render={({field, fieldState}) => (
              <FormField 
                title="Username"
                onChangeText={field.onChange}
                value={field.value}
                otherStyles="mt-7"
                errorMessage={fieldState.error?.message}
                placeholder=''
              />
            )}
          />
          <Controller
            control={control}
            name='email'
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
                title="Password"
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
            name='confirmPassword'
            render={({field, fieldState}) => (
              <FormField 
                title="Potwierdź hasło"
                onChangeText={field.onChange}
                value={field.value}
                otherStyles="mt-7"
                errorMessage={fieldState.error?.message}
                placeholder=''
              />
            )}
          />
          {/* <Switch
            value={form.termsAccepted}
            onValueChange={(e) => handleChangeText('termsAccepted', e)}
          />
          <Text className="text-white">Akceptuję regulamin</Text>
          <Text className="text-red-500">{errors.termsAccepted}</Text>
          <Switch
            value={form.newsletterAccepted}
            onValueChange={(e) => handleChangeText('newsletterAccepted', e)}
          />
          <Text className="text-white">Akceptuję newsletter</Text>
          <Text className="text-red-500">{errors.newsletterAccepted}</Text> */}
          <CustomButton 
            title="Sign Up"
            handlePress={handleSubmit(onSubmit, (test) => console.log(test))}
            containerStyles="mt-7"
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already? {' '}
              <Link href="/sign_in" className="text-lg font-psemibold text-secondary">Sign in</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp