import { View, Text, ScrollView, Image, Switch, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema, type RegisterForm, } from '@/api/validation/authValidation';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import SwitchField from '@/components/SwitchField';
import useAuthStore from '@/store/authStore';
import { registerUser } from '@/api/auth/auth';
import * as SecureStore from 'expo-secure-store';
import { TransactionForm, transactionFormSchema } from '@/api/validation/transactionValidation';
import { postTransaction } from '@/api/transaction/transaction';
import useTransactionStore from '@/store/useTransactionStore';
import useAccountStore from '@/store/useAccountStore';
import DateTimePickerExample from '@/components/DateTimePickerExample';
import { AccountForm, accountFormSchema } from '@/api/validation/accountValidation';
import { deleteAccount, postAccount, updateAccount } from '@/api/account/account';

interface IFormInput {
  name: string;
  saldo: number;
}

const Edit = () => {
  const { id, name, saldo} = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthError, setAuthError] = useState('');
  const updateStoreAccount = useAccountStore(store => store.updateAccount);
  const removeStoreAccount = useAccountStore(store => store.removeAccount);
  const values = useAuthStore(store => store.values);

  const { handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
    resolver: yupResolver(accountFormSchema),
    defaultValues: {
      name: name,
      saldo: saldo,
    }
  });

  const onSubmit = async (accountForm: AccountForm) => {
    try {
      setIsLoading(true)
      
      console.log(accountForm)
      const response = await updateAccount(accountForm, values.accessToken);
      console.log(response)
      updateStoreAccount(response)
      //update danych usera db lokalnie 
      setAuthError('')
      router.push("/home");
    } catch (error) {
      console.error('Transaction failed', error.response);
      console.log(error.response.data)
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true)
      
      const response = await deleteAccount(id, values.accessToken);
      console.log(response)
      
      //update danych usera db lokalnie 
      removeStoreAccount(id)
      router.replace("/home");
    } catch (error) {
      console.error('Transaction delete failed', error);
      console.log(error.response.data)
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (id) setValue('id', Number(id));
  }, [id, name, saldo, setValue]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4">
          <Text className="text-2xl text-white text-semibold font-psemibold">Nowe konto</Text>
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
            name='saldo'
            render={({field, fieldState}) => (
              <FormField 
                title="Kwota"
                onChangeText={field.onChange}
                value={field.value}
                otherStyles="mt-7"
                errorMessage={fieldState.error?.message}
                placeholder=''
              />
            )}
          />
          <Text className='text-red-500'>{isAuthError}</Text>
          <CustomButton
            title="Zapisz zmiany"
            handlePress={handleSubmit(onSubmit, (test) => console.log(test))}
            containerStyles="mt-7"
            isLoading={isLoading}
            textStyles={''}
          />
        </View>
        <CustomButton
          title="Usuń"
          handlePress={onDelete}
          containerStyles="mt-7"
          isLoading={isLoading}
          textStyles={''}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Edit