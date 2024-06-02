import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow, IonButton, IonPage, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useMediaQuery } from '@react-hook/media-query';
import './Home.css';
import './myTimer.css';

function MyTimer() {
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const [currentButton, setCurrentButton] = useState("Time");
  const [timerRunning, setTimerRunning] = useState(false);
  const isLargeScreen = useMediaQuery('only screen and (min-width: 911px)');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentButton === "Time" || currentButton === "Date") {
        setElapsedTime(0);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentButton]);

  function handleClick(clickedButton: string) {
    setCurrentButton(clickedButton);
    if (clickedButton === "ST/SP") {
      setTimerRunning(!timerRunning); // Toggle timer
    } else if (clickedButton === "Timer") {
      setElapsedTime(0); // Reset to zero for the Timer
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning) {
      timer = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Timer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="danger">
        <IonGrid className="custom-grid custom-content center-grid" style={{ marginTop: "5%" }}>
          <IonRow>
            <IonRow>
              <IonCol sizeXs="2.5" sizeMd="2" sizeLg="6" sizeXl="2">
                <IonRow>
                  <IonButton size={isLargeScreen ? 'large' : 'default'} color="success" onClick={() => handleClick("Time")}>
                    Time
                  </IonButton>
                </IonRow>
                <IonRow>
                  <IonButton size={isLargeScreen ? 'large' : 'default'} style={{ border: "1px solid #ccc", borderRadius: "10px" }} onClick={() => handleClick("Date")} color="success">
                    Date
                  </IonButton>
                </IonRow>
              </IonCol>
              <IonCol sizeXs="9.5" sizeMd="9" sizeLg="6" sizeXl="10">
                <IonItem className="responsive-item" lines="none">
                  <IonLabel className="ion-text-center">
                    <div className="my-display">
                      {currentButton === "Time"
                        ? new Date().toLocaleTimeString()
                        : currentButton === "Date"
                        ? formatDate(new Date())
                        : formatTime(elapsedTime)}
                    </div>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="3" sizeMd="3" sizeLg="4" sizeXl="2">
                <IonButton style={{ paddingLeft: isLargeScreen ? "5px" : "0px" }} onClick={() => handleClick("Timer")} color="success" fill="solid" size={isLargeScreen ? 'large' : 'default'}>
                  Timer
                </IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="4" sizeXl="2.8">
                <IonButton shape="round" color={timerRunning ? "danger" : "success"} size={isLargeScreen ? 'large' : 'default'} fill="solid" onClick={() => handleClick("ST/SP")} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "40px" : "0px" }}>
                  {timerRunning ? "SP" : "ST"}
                </IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="4" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "40px" : "0px" }}>
                  1H
                </IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "30px" : "0px" }}>
                  5M
                </IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "30px" : "0px" }}>
                  1M
                </IonButton>
              </IonCol>
              <IonCol className="md ion-hide-sm-down" sizeXs="1" sizeMd="1" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "30px" : "0px" }}>
                  5S
                </IonButton>
              </IonCol>
            </IonRow>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default MyTimer;
