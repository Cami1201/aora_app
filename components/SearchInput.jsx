import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert, Text } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ initialQuery, results }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  // Nueva función para mostrar la cantidad de resultados
  const displayResultsCount = () => {
    if (results && results.length > 0) {
      return <Text style={{ color: "white" }}>{results.length} resultados encontrados</Text>;
    }
    return <Text style={{ color: "white" }}>No se encontraron resultados</Text>;
  };

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search a video topic"
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

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>

      {/* Mostrar la cantidad de resultados */}
      <View style={{ marginTop: 10 }}>
        {displayResultsCount()}
      </View>
    </View>
  );
};

export default SearchInput;