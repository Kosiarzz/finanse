import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import useTransactionStore from '@/store/useTransactionStore';
import { deleteTransaction } from '@/api/transaction/transaction';
import useAuthStore from '@/store/authStore';

const TransactionCard = ({id, name, amount, is_expenditure, account_id, user_id, created_at, updated_at }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthError, setAuthError] = useState('');
  const { removeTransaction } = useTransactionStore();
  const { values } = useAuthStore();

  const onDelete = async () => {
    try {
      setIsLoading(true)
      
      const response = await deleteTransaction(id, values.accessToken);
      console.log(response)
      
      //update danych usera db lokalnie 
      removeTransaction(id)
    } catch (error) {
      console.error('Transaction failed', error);
      console.log(error.response.data)
      setAuthError("Ups, coś nie tak")
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-5" key={id}>
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {user_id}
            </Text>
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              className={`font-pregular text-3xl font- ${is_expenditure ? 'text-red-500' : 'text-gray-100'}`}
              numberOfLines={1}
            >
              {is_expenditure ? '-' : ''} { amount } zł
            </Text>
          </View>

          <View>
            <AntDesign name="delete" size={18} color="gray" onPress={onDelete} disabled={isLoading}/>
          </View>
        </View>
      </View>
    </View>
  )
}

export default TransactionCard