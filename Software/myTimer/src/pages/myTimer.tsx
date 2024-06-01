import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow, IonButton, IonPage, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import './myTimer.css'

function MyTimer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentButton, setCurrentButton] = useState(" ");
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId); // Bereinigt das Intervall, wenn die Komponente unmontiert wird
  }, []);

  function handleClick(clickedButton: string) {
    setCurrentButton(clickedButton);
    if (clickedButton === "Time") {
      setCurrentDateTime(new Date()); // Setzt die Zeit auf die aktuelle Zeit
    } else if (clickedButton === "Date") {
      setCurrentDateTime(new Date()); // Setzt das Datum auf das aktuelle Datum
    } else if (clickedButton === "Timer") {
      const currentTime = new Date();
      const midnight = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 0, 0, 0, 0);
      setCurrentDateTime(midnight); // Setzt die Zeit auf Mitternacht
    } else if (clickedButton === "ST/SP") {
      if (timerRunning) {
        setTimerRunning(false); // Stoppt den Timer
      } else {
        setTimerRunning(true); // Startet den Timer
      }
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerRunning) {
        setCurrentDateTime(new Date(currentDateTime.getTime() + 1000)); // Aktualisiert die Zeit alle 1000ms (1s)
      }
    }, 1000);
    return () => clearInterval(timer); // Bereinigt das Intervall, wenn die Komponente unmontiert wird
  }, [timerRunning, currentDateTime]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>my Timer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color={"danger"}>
        <IonGrid className='custom-grid custom-content center-grid' style={{marginTop: "5%" }}>
          <IonRow>
            <IonRow>
              <IonCol sizeXs="3" sizeMd="6" sizeLg="6" sizeXl="2">
                <IonRow>
                  <IonButton color="success" size='default'
                    onClick={() => handleClick("Time")}
                    style={{ width: "100%" }}
                  >Time</IonButton>
                </IonRow>
                <IonRow>
                  <IonButton style={{ border: "1px solid #ccc ", borderRadius: "10px", width: "100%" }}
                    onClick={() => handleClick("Date")} color="success" size='default'
                  >Date</IonButton>
                </IonRow>
              </IonCol>
              <IonCol sizeXs="9" sizeMd="6" sizeLg="6" sizeXl="10"  >
                <IonItem className="responsive-item" lines="none" >
                  <IonLabel
                  // responsive-item style={{ fontSize: 'calc(3rem + 1vw)' }}
                    class='ion-text-center responsive-item'>
                    <div>
                      {currentButton === "Time" ? currentDateTime.toLocaleTimeString() : currentButton === "Date" ? currentDateTime.getDate().toString().padStart(2, '0') + '.' +
                      (currentDateTime.getMonth() + 1).toString().padStart(2, '0') + '.' + currentDateTime.getFullYear() : "00:00:00"}</div>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="3" sizeMd="6" sizeLg="4" sizeXl="2.5">
                <IonButton
                  onClick={() => handleClick("Timer")} color="success" fill='solid' size='default' >Timer</IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="6" sizeLg="4" sizeXl="1.8">
                <IonButton shape="round" color="danger" size='default' 
                onClick={() => handleClick("ST/SP")} style={{ width: "25%" }} >{timerRunning ? "Stop" : "Start"}</IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="6" sizeLg="4" sizeXl="1.8">
                <IonButton shape="round" color="success" size='default' style={{ width: "15%" }} >1H</IonButton></IonCol>
              <IonCol sizeXs="2" sizeMd="4" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size='default' style={{ width: "15%" }} >5M</IonButton></IonCol>
              <IonCol sizeXs="2" sizeMd="4" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size='default' style={{ width: "15%" }} >1M</IonButton></IonCol>
              <IonCol class='md ion-hide-sm-down' sizeXs="1" sizeMd="4" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size='default' style={{ width: "15%" }} >5S</IonButton></IonCol>
            </IonRow>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
export default MyTimer;