import { AsyncStorage } from 'react-native';

const saveCart = async (arrayCart) => {
    try {
        await AsyncStorage.setItem('@cart', JSON.stringify(arrayCart));
    } catch (error) {
        //
    }
};

export default saveCart;
