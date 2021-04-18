import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from "../../components/Settings";
import SearchView, {
  SearchViewItemProps,
} from "../../components/View/SearchView";

const SettingsViewLanguage = () => {
  const props: SearchViewItemProps[] = [
    {
      id: 1,
      title: "English",
    },
    {
      id: 2,
      title: "French",
    },
  ];

  return <SearchView array={props} />;
};

export type SettingsStackParamList = {
  settings: undefined;
  language: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="settings">
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="language" component={SettingsViewLanguage} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
