import { RootStoreModel, RootStoreInstance } from "./root-store";

// TODO : must be adapted for async-storage

/**
 * Setup the root state
 */
export const setupRootStore = async () => {
  let rootStore: RootStoreInstance;

  rootStore = RootStoreModel.create({
    coins: {},
  });

  return rootStore;
};