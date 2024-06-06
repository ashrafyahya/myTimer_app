import { Haptics } from '@capacitor/haptics';
import { IonButton, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useMediaQuery } from '@react-hook/media-query';
import { useEffect, useRef, useState } from 'react';
import MySound from './myAlaram';
import './myTimer.css';
import { Breakpoint, useResponsiveBreakpoints } from './useResponsiveBreakpoints';

function MyTimer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentButton, setCurrentButton] = useState("Time");
  const [timerRunning, setTimerRunning] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const isLargeScreen = useMediaQuery('only screen and (min-width: 911px)');
  const isXLargeScreen = useMediaQuery('only screen and (min-width: 1500px)');
  const [isVibrating, setIsVibrating] = useState(false);
  const [isSoundStopped, setIsSoundStopped] = useState(false);
  const vibrationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stopVibrationRef = useRef(false);
  const currentBreakpoint: any = useResponsiveBreakpoints(window.innerWidth);
  let isSize: any = currentBreakpoint >= Breakpoint.Sm ? 'large' : 'default'; 

  const vibrationOn = async () => {
    const duration = 300;
    const interval = 100;
    const totalVibrationTime = 30000;
    const repetitions = Math.ceil(totalVibrationTime / (duration + interval));

    setIsVibrating(true);
    stopVibrationRef.current = false;

    for (let i = 0; i < repetitions; i++) {
      if (stopVibrationRef.current) break;
      await Haptics.vibrate({ duration });
      await new Promise(resolve => setTimeout(resolve, interval));
    }

    setIsVibrating(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isCountdownActive) {
        setCurrentDateTime(new Date());
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isCountdownActive]);

  useEffect(() => {
    if (timerRunning && currentButton === "Timer") {
      const intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timerRunning && currentButton === "Reset") {
      const intervalId = setInterval(() => {
        setElapsedTime(0);
        setCurrentButton("Timer")
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timerRunning && isCountdownActive && countdownTime > 0) {
      const intervalId = setInterval(() => {
        setCountdownTime(prevCountdownTime => {
          if (prevCountdownTime <= 1) {
            setIsCountdownActive(false);
            setTimerRunning(false);
            setIsTimeout(true);
            setIsSoundStopped(false);
            console.log("Timeout");
            vibrationOn();
            return 0;
          }
          return prevCountdownTime - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
    if (isSoundStopped) {
      setCurrentButton("");
      setIsTriggered(false);
    }
  }, [timerRunning, currentButton, isCountdownActive, countdownTime, isSoundStopped]);

  useEffect(() => {
    if (isTimeout) {
      vibrationTimeoutRef.current = setTimeout(() => {
        stopVibrationRef.current = true;
        setIsVibrating(false);
      }, 30000);
    }

    return () => {
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
    };
  }, [isTimeout]);

  function handleClick(clickedButton: string) {
    const duration = 100;
    setCurrentDateTime(new Date());
    stopVibrationRef.current = true;

    console.log("Button clicked");
    Haptics.vibrate({ duration });

    if (clickedButton === "Timer") {
      setCurrentButton("Timer");
      setElapsedTime(0);
      setCountdownTime(0);
      setIsCountdownActive(false);
      setTimerRunning(false);
      setIsTriggered(!isTriggered);
      setIsTimeout(false);
    } else if (clickedButton === "ST/SP" && isTriggered) {
      setTimerRunning(!timerRunning);
      // setIsTimeout(false);
    } else if (clickedButton === "Time" && !timerRunning && !isTriggered) {
      setCurrentButton("Time");
    } else if (clickedButton === "Reset" && isTriggered) {
      setCurrentButton("Reset");
      setIsCountdownActive(false);
      setTimerRunning(false);
      setCountdownTime(0);
      setElapsedTime(0);
      setIsTimeout(false);
    }else if (clickedButton === "Date" && !timerRunning && !isTriggered) {
      setCurrentButton("Date");
    } else if (clickedButton === "1H" && !timerRunning && isTriggered) {
      setCurrentButton("1H");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 3600);
      setIsCountdownActive(true);
      setTimerRunning(false);
    } else if (clickedButton === "5M" && !timerRunning && isTriggered) {
      setCurrentButton("5M");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 300);
      setIsCountdownActive(true);
      setTimerRunning(false);
    } else if (clickedButton === "1M" && !timerRunning && isTriggered) {
      setCurrentButton("1M");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 60);
      setIsCountdownActive(true);
      setTimerRunning(false);
    } else if (clickedButton === "5S" && !timerRunning && isTriggered) {
      setCurrentButton("5S");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 5);
      setIsCountdownActive(true);
      setTimerRunning(false);
    } else if (clickedButton === "1S" && !timerRunning && isTriggered) {
      setCurrentButton("1S");
      setCountdownTime(prevElapsedTime => prevElapsedTime + 1);
      setIsCountdownActive(true);
      setTimerRunning(false);
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
      <IonContent style={{ justifyContent: "center" }} color="danger">
        <IonGrid className=" custom-content " style={{marginTop: "5%", justifyContent: "center" }}>
          <IonRow style={{width:"100%"}}>
            <IonItem className="responsive-item" lines="none">
              <IonLabel>
                <div className="my-display">
                  {currentButton === "Time" ? currentDateTime.toLocaleTimeString() :
                    currentButton === "Date" ? formatDate(new Date()) :
                      currentButton === "Timer" ? `${String(Math.floor(elapsedTime / 3600)).padStart(2, '0')}:${String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0')}:${String(elapsedTime % 60).padStart(2, '0')}` :
                        `${String(Math.floor(countdownTime / 3600)).padStart(2, '0')}:${String(Math.floor((countdownTime % 3600) / 60)).padStart(2, '0')}:${String(countdownTime % 60).padStart(2, '0')}`}
                </div>
              </IonLabel>
            </IonItem>
          </IonRow>
          <IonRow style={{ justifyContent: "center", paddingTop:"20px", width:currentBreakpoint>= Breakpoint.Md?"80%":"100%" }}>
            <IonRow>
              <IonButton size={isSize} color="success" onClick={() => handleClick("Time")}>
                Time
              </IonButton>
              <IonButton size={isSize} style={{ border: "1px solid #ccc", borderRadius: "10px" }} onClick={() => handleClick("Date")} color="success">
                Date
              </IonButton>
              <IonButton
                style={{ paddingLeft: isLargeScreen && !isXLargeScreen ? "2px" : "default" }}
                onClick={() => handleClick("Timer")} color={isTriggered ? "danger" : "success"} fill="solid" size={isSize}>
                Timer
              </IonButton>
            <IonButton
              style={{ paddingLeft: isLargeScreen && !isXLargeScreen ? "2px" : "default" }}
              onClick={() => handleClick("Reset")} color={"success"} fill="solid" size={isSize}>
              Reset
            </IonButton>
            </IonRow>
            <IonRow style={{ justifyContent: "center"}}>
              <IonButton shape="round" color={timerRunning && !isTimeout ? "danger" : "success"} size={isSize} fill="solid"
                onClick={() => handleClick("ST/SP")} style={{ paddingLeft: isXLargeScreen ? "60px" : "default" }}>
                {timerRunning && !isTimeout ? "SP" : "ST"}
              </IonButton>
              <IonButton shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("1H")}>
                1H
              </IonButton>
              <IonButton shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("5M")}>
                5M
              </IonButton>
              <IonButton shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("1M")}>
                1M
              </IonButton>
              <IonButton className='ion-hide-md-down' shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("5S")}>
                5S
              </IonButton>
              <IonButton className='ion-hide-md-down' shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("1S")}>
                1S
              </IonButton>
            </IonRow>
          </IonRow>
        </IonGrid>
        < MySound isTimeout={isTimeout} onSoundEnd={() => setIsSoundStopped(true)}></MySound>
      </IonContent>
    </IonPage>
  );
}

export default MyTimer;

