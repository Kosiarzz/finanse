import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import { getTransactions } from '@/api/transaction/transaction';
import TransactionCard from '@/components/TransactionCard';
import useTransactionStore from '@/store/useTransactionStore';
import useAuthStore from '@/store/authStore';
import SearchInput from "@/components/SearchInput";

const Transactions = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setTransactions, transactions } = useTransactionStore();
  const { values } = useAuthStore();

  const fetchData = async () => {

    try {
      setLoading(true)

      const fetchedData = await getTransactions(1, values.accessToken)
      console.log(fetchedData)
      setTransactions(fetchedData) 
      console.log(transactions)
    } catch (error) {
      // console.log('Error:', JSON.stringify(error, null, 2));
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    
    fetchData();
  }, [])
  
  const onRefresh = async () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }

  // console.log(transactions)
  return (
    <SafeAreaView className="bg-primary h-full">
      <SearchInput />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Ładowanie transakcji...</Text>
        </View>
      ) : (
      <FlatList
        data={transactions} //{ id: 1}, { id: 2}, { id: 3}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
         <TransactionCard
          id={item.id}
          name={item.name}
          amount={item.amount}
          is_expenditure={item.is_expenditure}
          account_id={item.account_id}
          user_id={item.user_id}
          created_at={item.created_at}
          updated_at={item.updated_at}
         />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <Text className='tesxt-2xl font-psemibold text-white'>
                Transakcje
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Brak transakcji"
            subtitle="Dodaj coś"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      )}
    </SafeAreaView>
  )
}

export default Transactions