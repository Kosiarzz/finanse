import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert, Text } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const [includeIncome, setIncludeIncome] = useState(false);
  const [includeExpense, setIncludeExpense] = useState(false);


  return (
    <View>
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={query}
          placeholder="Szukaj"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          onPress={() => {
            if (query === "")
              return Alert.alert(
                "Missing Query",
                "Please input something to search results across database"
              );
            
              // Przygotowanie parametrów
              const params = { query };
              // params.name = { query };
              if (includeIncome) params.includeIncome = "true";
              if (includeExpense) params.includeExpense = "true";

              // Jeśli jesteśmy już na stronie wyszukiwania -> aktualizujemy URL
              if (pathname.startsWith("/search")) {
                router.setParams(params);
              } else {
                router.push({ pathname: `/search/${query}` });
              }
          }}
        >
          <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between mt-2">
        {/* Dochód */}
        <TouchableOpacity
          className={`px-4 py-2 rounded-lg ${includeIncome ? "bg-secondary" : "bg-black-100"}`}
          onPress={() => setIncludeIncome(!includeIncome)}
        >
          <Text className="text-white">Dochód</Text>
        </TouchableOpacity>

        {/* Wydatek */}
        <TouchableOpacity
          className={`px-4 py-2 rounded-lg ${includeExpense ? "bg-secondary" : "bg-black-100"}`}
          onPress={() => setIncludeExpense(!includeExpense)}
        >
          <Text className="text-white">Wydatek</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;