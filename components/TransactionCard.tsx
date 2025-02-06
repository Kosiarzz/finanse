import { View, Text } from 'react-native'
import React from 'react'

const TransactionCard = ({id, name, amount, is_expenditure, account_id, user_id, created_at, updated_at }) => {
  return (
    <View className="flex flex-col items-center px-4 mb-5">
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
              className={`text-xs font-pregular text-4xl ${is_expenditure ? 'text-red-500' : 'text-gray-100'}`}
              numberOfLines={1}
            >
              {is_expenditure ? '-' : ''} { amount } zł
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default TransactionCard