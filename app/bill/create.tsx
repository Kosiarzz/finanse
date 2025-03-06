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
import { transactionBillForm, transactionBillFormSchema, TransactionForm, transactionFormSchema } from '@/api/validation/transactionValidation';
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
  const [showPurchases, setShowPurchases] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthError, setAuthError] = useState('');
  const addTransaction = useTransactionStore(store => store.addTransaction);
  const [isExpenditure, setIsExpenditure] = useState(true);
  const values = useAuthStore(store => store.values);
  const accounts = useAccountStore(store => store.accounts) || [];

  const { handleSubmit, formState: { errors }, control, setValue, getValues, watch } = useForm({
    resolver: yupResolver(transactionBillFormSchema),
    defaultValues: {
      account_id: accounts[0]?.id,
      purchases: [], // Dla produktów
      amount: 0,
    }
  });

  // Dynamiczne pola dla zakupów (produkty)
  const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: 'purchases',
  });

  const onSubmit = async (transactionForm: transactionBillForm) => {
    try {
      setIsLoading(true)
      
      console.log(transactionForm)
      // const response = await postTransaction(transactionForm, values.accessToken);
      // console.log(response)
      // addTransaction(response)
      // //update danych usera db lokalnie 
      // setAuthError('')
      // router.push("/transactions");
    } catch (error) {
      console.error('Transaction failed', error.response);
      console.log(error.response.data)
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
  };

  const sumPrices = () => {
    const purchases = getValues('purchases');
    const total = purchases.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    console.log(total)
    setValue('amount', total.toString());
  };
  //{"account_id": 2, "amount": 30, "city": "Rzeszow", "name": "zakupy biedra", "photo": "xxx", "purchases": [{"category": "fajne", "discount": "-3", "name": "frytki", "price": "14", "quantity": "2", "unit": "szt"}, {"category": "", "discount": "", "name": "kurczak", "price": "16", "quantity": "1", "unit": "szt"}], "shop": "biedra"}
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
          <Text className="text-2xl text-white text-semibold font-psemibold">Zakupy</Text>
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
                title="Kwota"
                onChangeText={field.onChange}
                value={field.value}
                otherStyles="mt-7"
                errorMessage={fieldState.error?.message}
                placeholder=''
              />
            )}
          />
          <TouchableOpacity
                className="bg-blue-600 rounded-md p-3 mb-4"
                onPress={sumPrices}
              >
                <Text className="text-white text-center">Suma cen produktow</Text>
              </TouchableOpacity>
          <Controller
            control={control}
            name='shop'
            render={({field, fieldState}) => (
              <FormField 
                title="Sklep"
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
            name='city'
            render={({field, fieldState}) => (
              <FormField 
                title="Miasto"
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
            name='photo'
            render={({field, fieldState}) => (
              <FormField 
                title="Paragon"
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
              {/* Produkty w zakupach */}
              {productFields.map((field, index) => (
                <View key={field.id} className="border-b border-gray-600 mb-4 pb-4">
                  <Text className="text-white font-semibold mb-2">Produkt #{index + 1}</Text>

                  {['name', 'price', 'quantity', 'discount', 'unit', 'category'].map((inputName) => (
                    <Controller
                      key={inputName}
                      control={control}
                      name={`purchases.${index}.${inputName}`}
                      render={({ field, fieldState }) => (
                        <FormField
                          title={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
                          onChangeText={field.onChange}
                          value={field.value}
                          errorMessage={fieldState.error?.message} // Pokazanie błędów walidacji
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
                onPress={() => appendProduct({ name: '', price: '', quantity: '', discount: '', unit: '', category: ''})}
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