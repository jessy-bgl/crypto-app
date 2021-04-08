import { Instance, types, SnapshotOut } from "mobx-state-tree";
import { CoingeckoService } from "../../services/coingecko.service";
import { Coin, ICoinSnapshot } from "./coin";

export const Coins = types
  .model({ marketData: types.optional(types.array(Coin), []) })
  .actions((self) => ({
    saveMarketData(newMarketData: ICoinSnapshot[]) {
      self.marketData.replace(newMarketData);
    },
  }))
  .actions((self) => ({
    reloadMarketData: async () => {
      const coingeckoService = new CoingeckoService();
      const result = await coingeckoService.getCoinsMarkets();
      if (result) self.saveMarketData(result);
    },
  }));

// according to the official mobx-state-tree doc, using the following
// interface is much more optimized for the typescript compiler
// https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time
export interface ICoins extends Instance<typeof Coins> {}
export interface ICoinsSnapshot extends SnapshotOut<typeof Coins> {}
