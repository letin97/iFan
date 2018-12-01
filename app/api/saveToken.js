import { AsyncStorage } from 'react-native';

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('@token', token);
    } catch (error) {
        //
    }
};

export default saveToken;
