import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications'
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular, Jost_600SemiBold
  });
  /**useEffect(() => {
   * Dados na hora da notificacao
    const subcription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      }
    )
    return () => subcription.remove();
    
    async function notifications() {
      * deletar todas as notificoes
      await Notifications.cancelAllScheduledNotificationsAsync();
      * Ver todas as notificacoes agendadas
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
