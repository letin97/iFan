import { AsyncStorage } from 'react-native';

const getCart = async () => {
    try {
        const arrayCart = await AsyncStorage.getItem('@cart');
        if (arrayCart !== null) {
            return JSON.parse(arrayCart);
        }
        return [];
    } catch (error) {
        return [];
    }
};

export default getCart;
