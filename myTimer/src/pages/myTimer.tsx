import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import { timeOutline, stopwatchOutline, timerOutline, calendarOutline } from 'ionicons/icons';

import TimeClass from "./Time/Time"
import StopWatchClas from './StopWatch/StopWatch';
import TimerClass from './Timer/Timer';
import DateClass from './Date/Date';
import SettingModal from './Menu/SettingModal'

function myTimer() {
  return (
    <IonReactRouter>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>My Timer</IonTitle>
          <SettingModal />
        </IonToolbar>
      </IonHeader> */}
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/Time/Time" />
          <Route path="/StopWatch/StopWatch" render={() => <StopWatchClas />} exact={true} />
          <Route path="/Timer/Timer" render={() => <TimerClass />} exact={true} />
          <Route path="/Date/Date" render={() => <DateClass />} exact={true} />
          <Route path="/Time/Time" render={() => <TimeClass />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="Time" href="/Time/Time">
            <IonIcon icon={timeOutline} />
            <IonLabel>Time</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Date" href="/Date/Date">
            <IonIcon icon={calendarOutline} />
            <IonLabel>Date</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Timer" href="/Timer/Timer">
            <IonIcon icon={timerOutline} />
            <IonLabel>Timer</IonLabel>
          </IonTabButton>

          <IonTabButton tab="StopWatch" href="/StopWatch/StopWatch">
            <IonIcon icon={stopwatchOutline} />
            <IonLabel>Stopwatch</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default myTimer;