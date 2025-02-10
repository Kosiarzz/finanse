import { View, Text, ScrollView, Image, Switch, TouchableOpacity } from 'react-native'
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
import { TransactionForm, transactionFormSchema } from '@/api/validation/transactionValidation';
import { postTransaction } from '@/api/transaction/transaction';
import useTransactionStore from '@/store/useTransactionStore';

interface IFormInput {
  name: string;
  amount: number;
  is_expenditure: boolean;
  account_id: number;
}

const Create = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthError, setAuthError] = useState('');
  const addTransaction = useTransactionStore(store => store.addTransaction);
  const [isExpenditure, setIsExpenditure] = useState(true);
  const values = useAuthStore(store => store.values);

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(transactionFormSchema),
    defaultValues: {
      is_expenditure: false,
    }
  });

  const onSubmit = async (transactionForm: TransactionForm) => {
    try {
      setIsLoading(true)
      
      console.log(values.accessToken)
      const response = await postTransaction(transactionForm, values.accessToken);
      console.log(response)
      addTransaction(response)
      //update danych usera db lokalnie 

      router.push("/transactions");
    } catch (error) {
      console.error('Transaction failed', error);
      console.log(error.response.data)
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4">
          <Text className="text-2xl text-white text-semibold font-psemibold">Nowa transakcja</Text>
          <Controller
            control={control}
            name='name'
            render={({field, fieldState}) => (
              <FormField
                title="Nazwa"
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
            name='amount'
            render={({field, fieldState}) => (
              <FormField 
                title="Wartość"
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
            name='account_id'
            render={({field, fieldState}) => (
              <FormField 
                title="account_id"
                onChangeText={field.onChange}
                value={field.value}
                otherStyles="mt-7"
                errorMessage={fieldState.error?.message}
                placeholder=''
              />
            )}
          />
          {/* <Controller
            control={control}
            name='is_expenditure'
            render={({ field, fieldState }) => (
              <SwitchField
                label="Wydatek"
                value={field.value}
                onValueChange={field.onChange}
                errorMessage={fieldState.error?.message}
                otherStyles="mt-7"
              />
            )}
          /> */}
          <View className="flex-row mb-4">
            <Controller
                control={control}
                name="is_expenditure"
                render={({ field: { value, onChange } }) => (
                  <>
                      <TouchableOpacity
                          className={`px-6 py-3 rounded-md mr-2 ${value ? 'bg-gray-300' : 'bg-secondary'}`}
                          onPress={() => onChange(false)}>
                          <Text className={`text-lg ${value ? 'text-gray-800' : 'text-white'}`}>Dochód</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          className={`px-6 py-3 rounded-md ${!value ? 'bg-gray-300' : 'bg-secondary'}`}
                          onPress={() => onChange(true)}>
                          <Text className={`text-lg ${!value ? 'text-gray-800' : 'text-white'}`}>Wydatek</Text>
                      </TouchableOpacity>
                  </>
                )}
            />
            </View>
          <Text className='text-red-500'>{isAuthError}</Text>
          <CustomButton
            title="Dodaj transakcje"
            handlePress={handleSubmit(onSubmit, (test) => console.log(test))}
            containerStyles="mt-7"
            isLoading={isLoading} //zustand? zwykły hook?
            textStyles={''}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create