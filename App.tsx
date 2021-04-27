import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications'
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular, Jost_600SemiBold
  });

  /**async function showAsyncProps() {
    * Limpar o AsyncStorage e mostrar o que tem nas variáveis   
    AsyncStorage.clear();
    const user = await AsyncStorage.getItem('@plantmanager:user');
    console.log('user');
    console.log(user);
    const plants = await AsyncStorage.getItem('@plantmanager:plants');
    console.log('plantas salvas');
    console.log(plants)
  }
  showAsyncProps();
  **/

  /**useEffect(() => {
   * Dados na hora da notificação
    const subcription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      }
    )
    return () => subcription.remove();
    
    async function notifications() {
      * deletar todas as notificações
      await Notifications.cancelAllScheduledNotificationsAsync();
      * Ver todas as notificações agendadas
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log('---- Notificacoes agendadas ----')
      console.log(data);

    }
    notifications();
  }, []) **/

  if (!fontsLoaded) {
    return (<AppLoading />)
  }

  return (<Routes />)
}
