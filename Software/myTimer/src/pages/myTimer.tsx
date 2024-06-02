import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow, IonButton, IonPage, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useMediaQuery } from '@react-hook/media-query';
import './Home.css';
import './myTimer.css'

function MyTimer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentButton, setCurrentButton] = useState("Time");
  const [timerRunning, setTimerRunning] = useState(false);
  const isLargeScreen = useMediaQuery('only screen and (min-width: 911px)');

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
              <IonCol sizeXs="2.5" sizeMd="2" sizeLg="6" sizeXl="2">
                <IonRow>
                  <IonButton size={isLargeScreen ? 'large' : 'default'} color="success"
                    onClick={() => handleClick("Time")}
                    // style={{ width: "100%" }}
                  >Time</IonButton>
                </IonRow>
                <IonRow>
                  <IonButton size={isLargeScreen ? 'large' : 'default'} style={{ border: "1px solid #ccc ", borderRadius: "10px"}}
                    onClick={() => handleClick("Date")} color="success"
                  >Date</IonButton>
                </IonRow>
              </IonCol>
              <IonCol sizeXs="9.5" sizeMd="9" sizeLg="6" sizeXl="10"  >
                <IonItem className="responsive-item" lines="none" >
                  <IonLabel class='ion-text-center'>
                    <div className='my-display'>
                      {currentButton === "Time" ? currentDateTime.toLocaleTimeString() : currentButton === "Date" ? currentDateTime.getDate().toString().padStart(2, '0') + '.' +
                      (currentDateTime.getMonth() + 1).toString().padStart(2, '0') + '.' + currentDateTime.getFullYear() : "00:00:00"}</div>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="3" sizeMd="3" sizeLg="4" sizeXl="2">
                <IonButton
                style={{paddingLeft: isLargeScreen? "5px":"0px"}}
                  onClick={() => handleClick("Timer")} color="success" fill='solid' size={isLargeScreen ? 'large' : 'default'} >Timer</IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="4" sizeXl="2.5">
                <IonButton shape="round" color="danger" size={isLargeScreen ? 'large' : 'default'} fill='solid'
                onClick={() => handleClick("ST/SP")} 
                style={{ 
                  width: "100%", 
                  paddingTop: isLargeScreen? "5px":"0px", 
                  paddingLeft: isLargeScreen? "60px":"0px"  
                  }} >{timerRunning ? "Stop" : "Start"}</IonButton>
              </IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="4" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'}
                style={{ 
                  width: "100%", 
                  paddingTop: isLargeScreen? "5px":"0px", 
                  paddingLeft: isLargeScreen? "40px":"0px" }} 
                  >1H</IonButton></IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'}
                style={{ 
                  width: "100%", 
                  paddingTop: isLargeScreen? "5px":"0px", 
                  paddingLeft: isLargeScreen? "30px":"0px" 
                  }} >5M</IonButton></IonCol>
              <IonCol sizeXs="2" sizeMd="2" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} 
                style={{ 
                  width: "100%", 
                  paddingTop: isLargeScreen? "5px":"0px", 
                  paddingLeft: isLargeScreen? "30px":"0px" 
                  }} >1M</IonButton></IonCol>
              <IonCol class='md ion-hide-sm-down' sizeXs="1" sizeMd="1" sizeLg="3" sizeXl="1.8">
                <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'}
                style={{ 
                  width: "100%", 
                  paddingTop: isLargeScreen? "5px":"0px", 
                  paddingLeft: isLargeScreen? "30px":"0px" }} >5S</IonButton></IonCol>
            </IonRow>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
export default MyTimer;