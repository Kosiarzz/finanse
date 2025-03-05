import { View, Text, ScrollView, Image, Switch, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema, type RegisterForm, } from '@/api/validation/authValidation';
import { Controller, useForm } from 'react-hook-form';
import SwitchField from '@/components/SwitchField';
import useAuthStore from '@/store/authStore';
import { registerUser } from '@/api/auth/auth';
import * as SecureStore from 'expo-secure-store';
import { TransactionForm, transactionFormSchema } from '@/api/validation/transactionValidation';
import { updateTransaction } from '@/api/transaction/transaction';
import useTransactionStore from '@/store/useTransactionStore';
import useAccountStore from '@/store/useAccountStore';
import { deleteTransaction } from '@/api/transaction/transaction';

interface IFormInput {
  name: string;
  amount: number;
  is_expenditure: boolean;
  account_id: number;
}

const Edit = () => {
  const { id, name, amount, is_expenditure, account_id, user_id, created_at, updated_at } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthError, setAuthError] = useState('');
  const updateStoreTransaction = useTransactionStore(store => store.updateTransaction);
  const values = useAuthStore(store => store.values);
  const accounts = useAccountStore(store => store.accounts) || [];
  const { removeTransaction } = useTransactionStore();

  const { handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
    resolver: yupResolver(transactionFormSchema),
    defaultValues: {
      account_id: Number(account_id),
      name: name,
      amount: amount,
      is_expenditure: Boolean(Number(is_expenditure)),
    }
  });

  const onSubmit = async (transactionForm: TransactionForm) => {
    try {
      setIsLoading(true)
      
      const response = await updateTransaction(transactionForm, values.accessToken);
      updateStoreTransaction(response)
      //update danych usera db lokalnie 

      router.replace("/transactions");
    } catch (error) {
      console.error('Transaction edit failed', error);
      console.log(error.response.data)
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true)
      
      const response = await deleteTransaction(id, values.accessToken);
      console.log(response)
      
      //update danych usera db lokalnie 
      removeTransaction(id)
      router.replace("/transactions");
    } catch (error) {
      console.error('Transaction delete failed', error);
      console.log(error.response.data)
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
  };

  // Uaktualnienie domyślnego konta gdy konta zostaną załadowane
  const selectedAccountId = watch('account_id');

  useEffect(() => {
    if (id) setValue('id', Number(id));
  }, [id, name, amount, is_expenditure, accounts, setValue, selectedAccountId]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center px-4">
          <Text className="text-2xl text-white text-semibold font-psemibold">Edycja transakcji</Text>
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
          <View className="flex-row flex-wrap mb-4">
            {accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                className={`px-6 py-3 rounded-md m-1 ${selectedAccountId === account.id ? 'bg-secondary' : 'bg-gray-300'}`}
                onPress={() => setValue('account_id', account.id)}
              >
                <Text className={`text-lg ${selectedAccountId === account.id ? 'text-white' : 'text-gray-800'}`}>{account.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text className='text-red-500'>{isAuthError}</Text>
          <CustomButton
            title="Zapisz zmiany"
            handlePress={handleSubmit(onSubmit, (test) => console.log(test))}
            containerStyles="mt-7"
            isLoading={isLoading}
            textStyles={''}
          />
          <CustomButton
            title="Usuń"
            handlePress={onDelete}
            containerStyles="mt-7"
            isLoading={isLoading}
            textStyles={''}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Edit