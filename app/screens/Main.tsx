import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { observer } from "mobx-react-lite";

import { useStore } from "../models/root-store/root-store-context";
import MainComponent from "../components/Main";

export const MainScreen = observer(function Main() {
  const { coins } = useStore();
  const { marketData } = coins;

  const [loadingMarketData, setLoadingMarketData] = useState(false);

  useEffect(() => {
    async function fetchCoinsMarketsData() {
      setLoadingMarketData(true);
      await coins.reloadMarketData();
      setLoadingMarketData(false);
    }
    fetchCoinsMarketsData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MainComponent loadingData={loadingMarketData} />
    </View>
  );
});

export default MainScreen;
