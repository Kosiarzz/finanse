import { View, Text, ScrollView, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

import { registerUser } from '../../api/auth/auth';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  })

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    console.log("REGISTER")
    setIsSubmitting(true);
          
    try {
      const response = await registerUser(form); // Wywołanie API z formularzem logowania
      console.log('Register successful', response); // Logowanie odpowiedzi (można to zastąpić przekierowaniem lub inną logiką)
      // Tutaj można np. przekierować użytkownika do strony głównej lub zapisać token w storage
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data.errors) {
      console.log("REGISETER ERROR:"+JSON.stringify(error.response.data.errors, null, 2));
      setErrors(error.response.data.errors);
      }
      // console.error('Register failed', error.response.data); // Obsługa błędów, np. wyświetlenie komunikatu
      // console.log('Detailed error:', JSON.stringify(error, null, 2));
    } finally {
      setIsSubmitting(false); // Zakończenie procesu ładowania
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e})}
            otherStyles="mt-10"
            error={errors.username}
          />
          <Text className="text-red-500">{errors.username}</Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
            error={errors.email}
          />
          <Text className="text-red-500">{errors.email}</Text>
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-7"
            error={errors.password}
          />
          <Text className="text-red-500">{errors.password}</Text>
          <FormField 
            title="Confirm password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e})}
            otherStyles="mt-7"
            error={errors.confirmPassword}
          />  
          <Text className="text-red-500">{errors.confirmPassword}</Text>
          <Switch
            value={form.termsAccepted}
            onValueChange={(e) => setForm({ ...form, termsAccepted: e})}
          />
          <Text className="text-white">Akceptuję regulamin</Text>
          <Text className="text-red-500">{errors.termsAccepted}</Text>
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