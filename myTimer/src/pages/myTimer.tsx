import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { playCircle, radio, library, search, timeOutline, stopwatch, stopwatchOutline, timerOutline, calendarOutline } from 'ionicons/icons';

import TimeClass from "./Time/Time"
import StopWatchClas from './StopWatch/StopWatch';
import TimerClass from './Timer/Timer';
import DateClass from './Date/Date';

function Example() {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/Time/Time" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
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
export default Example;