import i18next from "i18next";
import { Instance, types, SnapshotOut } from "mobx-state-tree";
import { config } from "../../config/config";

export const SettingsModel = types
  .model({
    darkMode: types.optional(types.boolean, true),
    language: types.optional(types.string, config.language.default),
    mainCurrency: types.optional(types.string, config.mainCurrency.default),
    mainScreen: types.optional(types.string, config.mainScreen.default),
    favorites: types.optional(types.array(types.string), []),
  })
  .actions((self) => ({
    toggleDarkMode: (value: boolean) => {
      self.darkMode = !self.darkMode;
    },
  }))
  .actions((self) => ({
    setDefaultLang: (value: string) => {
      self.language = value;
      i18next.changeLanguage(value);
    },
  }))
  .actions((self) => ({
    setDefaultMainCurrency: (value: string) => {
      self.mainCurrency = value;
    },
  }))
  .actions((self) => ({
    setDefaultMainScreen: (value: string) => {
      self.mainScreen = value;
    },
  }))
  .actions((self) => ({
    addFavorite: (val: string) => {
      self.favorites.push(val);
    },
  }))
  .actions((self) => ({
    removeFavorite: (val: string) => {
      self.favorites.splice(self.favorites.indexOf(val), 1);
    },
  }))
  .actions((self) => ({
    toggleFavorite: (val: string) => {
      if (self.favorites.includes(val)) {
        self.removeFavorite(val);
      } else {
        self.addFavorite(val);
      }
    },
  }));

// according to the official mobx-state-tree doc, using the following
// interface is much more optimized for the typescript compiler
// https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time
export interface ISettings extends Instance<typeof SettingsModel> {}
export interface ISettingsSnapshot extends SnapshotOut<typeof SettingsModel> {}
