import { Instance, types, SnapshotOut } from "mobx-state-tree";
import { CoinsService } from "../../services/coins.service";

export const Coin = types.model({
  id: types.string,
  symbol: types.string,
  name: types.string,
  // TODO : add more useful info provided by coingecko
});
// according to the official mobx-state-tree doc, using the following
// interface is much more optimized for the typescript compiler
// https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time
export interface ICoin extends Instance<typeof Coin> {}
export interface ICoinSnapshot extends SnapshotOut<typeof Coin> {}

export const Coins = types
  .model({ marketData: types.optional(types.array(Coin), []) })
  .actions((self) => ({
    saveMarketData(newMarketData: ICoinSnapshot[]) {
      self.marketData.replace(newMarketData);
    },
  }))
  .actions((self) => ({
    getMarketData: async () => {
      const coinService = new CoinsService();
      try {
        const result = await coinService.getCoinsMarkets();
        self.saveMarketData(result);
      } catch (e) {
        throw e;
      }
    },
  }));
// according to the official mobx-state-tree doc, using the following
// interface is much more optimized for the typescript compiler
// https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time
export interface ICoins extends Instance<typeof Coins> {}
export interface ICoinsSnapshot extends SnapshotOut<typeof Coins> {}
