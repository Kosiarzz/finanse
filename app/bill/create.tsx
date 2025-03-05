import { View, Text, ScrollView, Image, Switch, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
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

interface IFormInput {
  name: string;
  amount: number;
  is_expenditure: boolean;
  account_id: number;
  date: Date;
}

const Create = () => {
  const [showPurchases, setShowPurchases] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthError, setAuthError] = useState('');
  const addTransaction = useTransactionStore(store => store.addTransaction);
  const [isExpenditure, setIsExpenditure] = useState(true);
  const values = useAuthStore(store => store.values);
  const accounts = useAccountStore(store => store.accounts) || [];

  const { handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
    resolver: yupResolver(transactionFormSchema),
    defaultValues: {
      is_expenditure: false,
      account_id: accounts[0]?.id,
      purchases: [], // Dla produktów w zakupach
      billDetails: {}, // Dla szczegółów zakupów
    }
  });

  // Dynamiczne pola dla zakupów (produkty)
  const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: 'purchases',
  });

  const onSubmit = async (transactionForm: TransactionForm) => {
    try {
      setIsLoading(true)
      
      console.log(transactionForm)
      const response = await postTransaction(transactionForm, values.accessToken);
      console.log(response)
      addTransaction(response)
      //update danych usera db lokalnie 
      setAuthError('')
      router.push("/transactions");
    } catch (error) {
      console.error('Transaction failed', error.response);
      console.log(error.response.data)
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
  };

  // const toggleAccountSelection = (accountId) => {
  //   const selectedAccounts = getValues('selectedAccounts');
  //   const newSelection = { ...selectedAccounts, [accountId]: !selectedAccounts[accountId] };
  //   // Ensure at least one account is always selected
  //   if (Object.values(newSelection).some(val => val)) {
  //     setValue('selectedAccounts', newSelection);
  //   }
  // };

   // Uaktualnienie domyślnego konta gdy konta zostaną załadowane
   const selectedAccountId = watch('account_id');

   useEffect(() => {
     if (accounts.length > 0 && !selectedAccountId) {
       setValue('account_id', accounts[0].id);
     }
   }, [accounts, setValue, selectedAccountId]);

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
            name="date"
            render={({ field, fieldState }) => (
              <DateTimePickerExample
                onChangeText={field.onChange} // Przekazanie poprawnej funkcji onChange
                errorMessage={fieldState.error?.message} // Obsługa błędów walidacji
                value={field.value} // Przekazanie aktualnej wartości pola
              />
            )}
          />
          {/* <Controller
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
          /> */}
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
          {/* Przycisk do pokazania sekcji zakupów */}
          <TouchableOpacity
            className="bg-blue-500 rounded-md p-3 mb-4"
            onPress={() => setShowPurchases(!showPurchases)}
          >
            <Text className="text-white text-center">
              {showPurchases ? 'Ukryj Zakupy' : 'Pokaż Zakupy'}
            </Text>
          </TouchableOpacity>

          {/* Sekcja szczegółów zakupów */}
          {showPurchases && (
            <>
              {['name_bill', 'shop', 'city', 'date_bill', 'amount_bill'].map((inputName) => (
                <Controller
                  key={inputName}
                  control={control}
                  name={`billDetails.${inputName}`}
                  render={({ field, fieldState }) => (
                    <FormField
                      title={inputName.replace('_', ' ')}
                      onChangeText={field.onChange}
                      value={field.value}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              ))}

              {/* Produkty w zakupach */}
              {productFields.map((field, index) => (
                <View key={field.id} className="border-b border-gray-600 mb-4 pb-4">
                  <Text className="text-white font-semibold mb-2">Produkt #{index + 1}</Text>
                  {['name', 'price', 'quantity', 'discount'].map((inputName) => (
                    <Controller
                      key={inputName}
                      control={control}
                      name={`purchases.${index}.${inputName}`}
                      render={({ field, fieldState }) => (
                        <FormField
                          title={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
                          onChangeText={field.onChange}
                          value={field.value}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />
                  ))}
                  <TouchableOpacity
                    className="bg-red-500 rounded-md p-2 mt-2"
                    onPress={() => removeProduct(index)}
                  >
                    <Text className="text-white text-center">Usuń produkt</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                className="bg-green-500 rounded-md p-3 mb-4"
                onPress={() => appendProduct({ name: '', price: '', quantity: '', discount: '' })}
              >
                <Text className="text-white text-center">Dodaj produkt</Text>
              </TouchableOpacity>
            </>
          )}
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