import { View, Text, ScrollView, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import useRegisterStore from '@/store/registerStore';

const SignUp = () => {
  const { form, setForm, submit, errors, isSubmitting } = useRegisterStore();

  const handleChangeText = (field, value) => {
    setForm(field, value);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => handleChangeText('username', e)}
            otherStyles="mt-10"
            error={errors.username}
          />
          <Text className="text-red-500">{errors.username}</Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => handleChangeText('email', e)}
            otherStyles="mt-7"
            keyboardType="email-address"
            error={errors.email}
          />
          <Text className="text-red-500">{errors.email}</Text>
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => handleChangeText('password', e)}
            otherStyles="mt-7"
            error={errors.password}
          />
          <Text className="text-red-500">{errors.password}</Text>
          <FormField 
            title="Confirm password"
            value={form.confirmPassword}
            handleChangeText={(e) => handleChangeText('confirmPassword', e)}
            otherStyles="mt-7"
            error={errors.confirmPassword}
          />  
          <Text className="text-red-500">{errors.confirmPassword}</Text>
          <Switch
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
          <Text className="text-red-500">{errors.newsletterAccepted}</Text>
          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
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