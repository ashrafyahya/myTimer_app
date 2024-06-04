import { Haptics } from '@capacitor/haptics'; // Import Haptics from Capacitor
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useMediaQuery } from '@react-hook/media-query';
import { useEffect, useRef, useState } from 'react';
import './myTimer.css';

function MyTimer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const [currentButton, setCurrentButton] = useState("Time");
  const [timerRunning, setTimerRunning] = useState(false);
  const isLargeScreen = useMediaQuery('only screen and (min-width: 911px)');
  const isLargeButton = useMediaQuery('only screen and (min-width: 1023px)');
  const isXLargeScreen = useMediaQuery('only screen and (min-width: 1500px)');
  const [countdownTime, setCountdownTime] = useState(0); // Total countdown time in seconds
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false); // State to track if vibrating
  const vibrationTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold the timeout for vibration
  const stopVibrationRef = useRef(false);

  const vibrationOn = async () => {
    const duration = 300; // Each vibration duration in milliseconds
    const interval = 100; // Interval between vibrations in milliseconds
    const totalVibrationTime = 30000; // Total vibration time in milliseconds
    const repetitions = Math.ceil(totalVibrationTime / (duration + interval));

    setIsVibrating(true);
    stopVibrationRef.current = false;
    console.log("Vibration started"); // Log vibration start

    for (let i = 0; i < repetitions; i++) {
      if (stopVibrationRef.current) break; // Stop vibration if stopVibrationRef becomes true
      console.log("inggg"); // Log vibration step
      await Haptics.vibrate({ duration });
      await new Promise(resolve => setTimeout(resolve, interval));
    }

    console.log("Vibration ended"); // Log vibration end
    setIsVibrating(false);
  };

  // Update clock
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isCountdownActive) {
        setCurrentDateTime(new Date());
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isCountdownActive]);

  // Update timer/countdown, handle vibration
  useEffect(() => {
    if (timerRunning && currentButton === "Timer") {
      const intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timerRunning && isCountdownActive && countdownTime > 0) {
      const intervalId = setInterval(() => {
        setCountdownTime(prevCountdownTime => {
          if (prevCountdownTime <= 1) {
            setIsCountdownActive(false);
            setTimerRunning(false);
            setIsTimeout(true);
            setIsRinging(true);
            console.log("Timeout");
            vibrationOn();
            return 0;
          }
          return prevCountdownTime - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timerRunning, currentButton, isCountdownActive, countdownTime]);

  // Clear vibration timeout on unmount
  useEffect(() => {
    if (isTimeout) {
      // Set timeout to stop vibration after 30 seconds
      vibrationTimeoutRef.current = setTimeout(() => {
        stopVibrationRef.current = true;
        setIsVibrating(false);
      }, 30000);
    }

    // Clear timeout if component unmounts
    return () => {
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
    };
  }, [isTimeout]);

  function handleClick(clickedButton: string) {
    const duration = 100;
    setCurrentDateTime(new Date());
    stopVibrationRef.current = true; // Stop vibration on any button click

    console.log("Button clicked"); // Log button click
    Haptics.vibrate({ duration });

    if (clickedButton === "Timer") {
      setCurrentButton("Timer");
      setElapsedTime(0); // Reset timer
      setCountdownTime(0);
      setIsCountdownActive(false);
      setTimerRunning(false);
      setIsTriggered(!isTriggered);
      setIsTimeout(false);
      setIsRinging(false);
    } else if (clickedButton === "ST/SP" && isTriggered) {
      setTimerRunning(!timerRunning); // Toggle timer
      setIsTimeout(false);
      setIsRinging(false);
    } else if (clickedButton === "Time" && !timerRunning && !isTriggered) {
      setCurrentButton("Time");
    } else if (clickedButton === "Date" && !timerRunning && !isTriggered) {
      setCurrentButton("Date");
    } else if (clickedButton === "1H" && !timerRunning && isTriggered) {
      setCurrentButton("1H");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 3600);
      setIsCountdownActive(true);
      setTimerRunning(false); // Ensure timer is not running until ST is clicked
    } else if (clickedButton === "5M" && !timerRunning && isTriggered) {
      setCurrentButton("5M");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 300);
      setIsCountdownActive(true);
      setTimerRunning(false); // Ensure timer is not running until ST is clicked
    } else if (clickedButton === "1M" && !timerRunning && isTriggered) {
      setCurrentButton("1M");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 60);
      setIsCountdownActive(true);
      setTimerRunning(false); // Ensure timer is not running until ST is clicked
    } else if (clickedButton === "5S" && !timerRunning && isTriggered) {
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
            <IonCol sizeXs="3" sizeMd="3" sizeLg="1" sizeXl="2">
              <IonButton
                style={{ paddingLeft: isLargeScreen && !isXLargeScreen ? "2px" : "default" }}
                onClick={() => handleClick("Timer")} color={isTriggered ? "danger" : "success"} fill="solid" size={isLargeScreen ? 'large' : 'default'}>
                Timer
              </IonButton>
            </IonCol>
            <IonCol sizeXs="2" sizeMd="2" sizeLg="4" sizeXl="2.8">
              <IonButton shape="round" color={timerRunning ? "danger" : "success"} size={isLargeScreen ? 'large' : 'default'} fill="solid"
                onClick={() => handleClick("ST/SP")} style={{ width: isXLargeScreen ? "100%" : "100%", paddingLeft: isXLargeScreen ? "60px" : "default" }}>
                {timerRunning ? "SP" : "ST"}
              </IonButton>
            </IonCol>
            <IonCol sizeXs="3" sizeMd="2" sizeLg="4" sizeXl="2.8">
              <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} fill="solid" onClick={() => handleClick("1H")}>
                1H
              </IonButton>
            </IonCol>
            <IonCol sizeXs="3" sizeMd="2" sizeLg="4" sizeXl="2.8">
              <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} fill="solid" onClick={() => handleClick("5M")}>
                5M
              </IonButton>
            </IonCol>
            <IonCol sizeXs="3" sizeMd="2" sizeLg="4" sizeXl="2.8">
              <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} fill="solid" onClick={() => handleClick("1M")}>
                1M
              </IonButton>
            </IonCol>
            <IonCol sizeXs="3" sizeMd="2" sizeLg="4" sizeXl="2.8">
              <IonButton shape="round" color="success" size={isLargeScreen ? 'large' : 'default'} fill="solid" onClick={() => handleClick("5S")}>
                5S
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default MyTimer;
