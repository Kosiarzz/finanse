import { View, Text, ScrollView, Image, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema, type RegisterForm, } from '@/api/validation/authValidation';
import { Controller, useForm } from 'react-hook-form';
import SwitchField from '@/components/SwitchField';
import useAuthStore from '@/store/authStore';
import { registerUser } from '@/api/auth/auth';
import * as SecureStore from 'expo-secure-store';

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  newsletterAccepted: boolean;
}

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthError, setAuthError] = useState('');
  const { setValues, isLoggedIn, setIsLoggedIn } = useAuthStore();
  
  useEffect(() => {
    if (isLoggedIn) return router.replace("/home");
  }, []);

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(registerFormSchema)
  });

  const onSubmit = async (registerForm: RegisterForm) => {
    try {
      setIsLoading(true)

      const response = await registerUser(registerForm);
      setValues(response)

      await SecureStore.setItemAsync(registerForm.username, registerForm.password);
      //update danych usera db lokalnie 

      setIsLoggedIn(true)
      router.replace("/home");
    } catch (error) {
      console.error('Register failed', error);
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
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
                title="Password"
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
            name='termsAccepted'
            render={({ field, fieldState }) => (
              <SwitchField
                label="Akceptuję regulamin"
                value={field.value}
                onValueChange={field.onChange}
                errorMessage={fieldState.error?.message}
                otherStyles="mt-7"
              />
            )}
          />
          <Controller
            control={control}
            name='newsletterAccepted'
            render={({ field, fieldState }) => (
              <SwitchField
                label="Akceptuję newsletter"
                value={field.value}
                onValueChange={field.onChange}
                errorMessage={fieldState.error?.message}
                otherStyles="mt-7"
              />
            )}
          />
          <Text className='text-red-500'>{isAuthError}</Text>
          <CustomButton 
            title="Sign Up"
            handlePress={handleSubmit(onSubmit, (test) => console.log(test))}
            containerStyles="mt-7"
            isLoading={isLoading} //zustand? zwykły hook?
            textStyles={''}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already? {' '}
              <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign in</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp