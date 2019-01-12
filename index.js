import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

console.disableYellowBox = true;

AppRegistry.registerComponent('iFan', () => App);
