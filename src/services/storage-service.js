import AsyncStorage from '@react-native-community/async-storage'

const AsyncStorageService = {
    storeString: async (key, data, cb) => {
        try {
            await AsyncStorage.setItem(key, data, cb)
        } catch (error) {
            alert(error)
        }
    },
    getString: async (key, cb) => {
        try {
            const value = await AsyncStorage.getItem(key, cb)
            if (value !== null) {
                return value
            } else {
                return null
            }
        } catch (e) {
            alert(e)
        }
    },
    removeString: async (key, cb) => {
        try {
            await AsyncStorage.removeItem(key, cb)
        } catch (error) {
            alert(error)
        }
    },
    storeObject: async (key, data, cb) => {
        try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem(key, jsonValue, cb)
        } catch (error) {
            alert(error)
        }
    },
    getObject: async (key, cb) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key, cb)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            alert(error)
        }
    },
}

export default AsyncStorageService;