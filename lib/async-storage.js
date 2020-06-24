import AsyncStorage from "@react-native-community/async-storage";

const module = {
  cache: {},
  getItem: async (key, defaultValue) => {
    let result;

    if (module.cache[key]) {
      return module.cache[key];
    }

    try {
      result = await AsyncStorage.getItem(key);

      if (result && result.startsWith("json:")) {
        result = JSON.parse(result.split("json:")[1]);
      }

      module.cache[key] = result;
    } catch (error) {
      result = error;
    }

    return result || defaultValue;
  },
  setItem: async (key, value) => {
    try {
      if (typeof value === "object") {
        await AsyncStorage.setItem(key, `json:${JSON.stringify(value)}`);
      } else {
        await AsyncStorage.setItem(key, value);
      }

      module.cache[key] = value;
    } catch (error) {}
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      delete module.cache[key];
    } catch (error) {}
  },
};

export default module;
