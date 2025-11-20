import { View, Text, ScrollView } from "react-native";
import React, { FC } from "react";
import CustomTable from "@components/pages/Table";

const HomeScreen: FC = () => {
  const columns = [
    { headerName: "Name", fieldId: "name", width: 120 },
    { headerName: "Age", fieldId: "age", width: 60 },
    { headerName: "City", fieldId: "city", width: 150 },
    { headerName: "Email", fieldId: "email", width: 200 },
    { headerName: "Country", fieldId: "country", width: 120 },
  ];

  const data = Array.from({ length: 29 }, (_, i) => ({
    name: `Person ${i + 1}`,
    age: 20 + (i % 10),
    city: `City ${i + 1}`,
    email: `person${i + 1}@example.com`,
    country: ["USA", "India", "UK", "Canada", "Germany"][i % 5],
  }));

  return (
    <View style={{ flex: 1, paddingTop: 100, justifyContent: "center" }}>
      <ScrollView>
        <CustomTable columns={columns} data={data} />
        <Text>HomeScreen</Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
