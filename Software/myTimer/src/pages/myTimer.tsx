import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import './Home.css';
import './myTimer.css';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel } from '@ionic/react';

function MyTimer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const [currentButton, setCurrentButton] = useState("Time");
  const [timerRunning, setTimerRunning] = useState(false);
  const isLargeScreen = useMediaQuery('only screen and (min-width: 911px)');
  const [countdownTime, setCountdownTime] = useState(0); // Total countdown time in seconds
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  let intervalId: NodeJS.Timeout | null = null; // Initialize intervalId to null

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isCountdownActive) setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    if (timerRunning && currentButton === "Timer") {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    } else if (timerRunning && isCountdownActive && countdownTime > 0) {
      intervalId = setInterval(() => {
        setCountdownTime(prevCountdownTime => {
          if (prevCountdownTime <= 1) {
            setIsCountdownActive(false);
            setTimerRunning(false);
            return 0;
          }
          return prevCountdownTime - 1;
        });
      }, 1000);
    } else {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    }
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [timerRunning, currentButton, isCountdownActive, countdownTime]);

  function handleClick(clickedButton: string) {
    setCurrentDateTime(new Date());
    if (clickedButton === "Timer") {
      setCurrentButton("Timer");
      setElapsedTime(0); // Reset timer
      setCountdownTime(0);
      setIsCountdownActive(false);
      setTimerRunning(false);
      setIsTriggered(!isTriggered)
    }
    else if (clickedButton === "ST/SP") {
      setTimerRunning(!timerRunning); // Toggle timer
    }
    else if (clickedButton === "Time" && !timerRunning && !isTriggered) {
      setCurrentButton("Time");
    }
    else if (clickedButton === "Date" && !timerRunning && !isTriggered) {
      setCurrentButton("Date");
    }
    else if (clickedButton === "1H" && !timerRunning) {
      setCurrentButton("1H");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 3600);
      setIsCountdownActive(true);
      setTimerRunning(false); // Ensure timer is not running until ST is clicked
    }
    else if (clickedButton === "5M" && !timerRunning) {
      setCurrentButton("5M");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 300);
      setIsCountdownActive(true);
      setTimerRunning(false); // Ensure timer is not running until ST is clicked
    }
    else if (clickedButton === "1M" && !timerRunning) {
      setCurrentButton("1M");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 60);
      setIsCountdownActive(true);
      setTimerRunning(false); // Ensure timer is not running until ST is clicked
    }
    else if (clickedButton === "5S" && !timerRunning) {
      setCurrentButton("5S");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 5);
      setIsCountdownActive(true);
      setTimerRunning(false); // Ensure timer is not running until ST is clicked
    }
  }

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
                      {currentButton === "Time" ? currentDateTime.toLocaleTimeString() :
                        currentButton === "Date" ? formatDate(new Date()) :
                          currentButton === "Timer" ? `${String(Math.floor(elapsedTime / 3600)).padStart(2, '0')}:${String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0')}:${String(elapsedTime % 60).padStart(2, '0')}` :
                            `${String(Math.floor(countdownTime / 3600)).padStart(2, '0')}:${String(Math.floor((countdownTime % 3600) / 60)).padStart(2, '0')}:${String(countdownTime % 60).padStart(2, '0')}`}
                    </div>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="3" sizeMd="3" sizeLg="4" sizeXl="2">
                <IonButton style={{ paddingLeft: isLargeScreen ? "5px" : "0px" }}
                  onClick={() => handleClick("Timer")} color={isTriggered ? "danger" : "success"} fill="solid" size={isLargeScreen ? 'large' : 'default'}>
                  Timer
                </IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="4" sizeXl="2.8">
                <IonButton shape="round" color={timerRunning ? "danger" : "success"} size={isLargeScreen ? 'large' : 'default'} fill="solid" onClick={() => handleClick("ST/SP")} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "40px" : "0px" }}>
                  {timerRunning ? "SP" : "ST"}
                </IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="4" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "40px" : "0px" }} onClick={() => handleClick("1H")}>
                  1H
                </IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "30px" : "0px" }} onClick={() => handleClick("5M")}>
                  5M
                </IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "30px" : "0px" }} onClick={() => handleClick("1M")}>
                  1M
                </IonButton>
              </IonCol>
              <IonCol className="md ion-hide-sm-down" sizeXs="1" sizeMd="1" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} style={{ width: "100%", paddingTop: isLargeScreen ? "5px" : "0px", paddingLeft: isLargeScreen ? "30px" : "0px" }} onClick={() => handleClick("5S")}>
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
