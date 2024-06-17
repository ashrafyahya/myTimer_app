import { Haptics } from '@capacitor/haptics';
import { IonButton, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow } from '@ionic/react';
import { useMediaQuery } from '@react-hook/media-query';
import { useEffect, useRef, useState } from 'react';
import MySound from './myAlaram';
import '../styles.css';
import { Breakpoint, useResponsiveBreakpoints } from '../useResponsiveBreakpoints';
import { stopCircleOutline, playCircleOutline, refreshCircleOutline } from 'ionicons/icons';
interface Props{
  soundEnabled: boolean | ((prevState: boolean) => boolean),
  vibrationEnabled:boolean | ((prevState: boolean) => boolean),
  soundStrength: number,
  setColor: string
}

const TimerClass: React.FC<Props>=({ soundEnabled, soundStrength, vibrationEnabled, setColor} ) =>{
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentButton, setCurrentButton] = useState("Time");
  const [timerRunning, setTimerRunning] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const isLargeScreen = useMediaQuery('only screen and (min-width: 911px)');
  const isXLargeScreen = useMediaQuery('only screen and (min-width: 1500px)');
  const [isSoundStopped, setIsSoundStopped] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);


  const vibrationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stopVibrationRef = useRef(false);
  const currentBreakpoint: any = useResponsiveBreakpoints(window.innerWidth);
  let isSize: any = currentBreakpoint >= Breakpoint.Sm ? 'large' : 'default';
  const [isStart, setIsStart] = useState(false);

  const vibrationOn = async () => {
    if (vibrationEnabled === true) {
      const duration = 300;
      const interval = 100;
      const totalVibrationTime = 30000;
      const repetitions = Math.ceil(totalVibrationTime / (duration + interval));

      stopVibrationRef.current = false;

      for (let i = 0; i < repetitions; i++) {
        if (stopVibrationRef.current) break;
        await Haptics.vibrate({ duration });
        await new Promise(resolve => setTimeout(resolve, interval));
        console.log("vib on")
      }
      console.log("vib end")
      setIsTimeout(false)
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timerRunning && isCountdownActive) {
      intervalId = setInterval(() => {
        setCountdownTime(prevCountdownTime => {
          if (prevCountdownTime <= 1) {
            clearInterval(intervalId);
            setIsCountdownActive(false);
            setTimerRunning(false);
            setIsTimeout(true);
            setIsSoundStopped(false);
            vibrationOn();
            return 0;
          }
          return prevCountdownTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerRunning, isCountdownActive, countdownTime]);

  useEffect(() => {
    if (isTimeout) {
      vibrationTimeoutRef.current = setTimeout(() => {
        stopVibrationRef.current = true;
        setIsTimeout(false)
        console.log("vib off")
      }, 30000);
    }
    if(countdownTime<=0)setTimerStarted(false)
    return () => {
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
    };
  }, [isTimeout, soundStrength, setColor, timerStarted]);

  function handleClick(clickedButton: string) {
    const duration = 100;
    stopVibrationRef.current = true;
    console.log("Button clicked");
    Haptics.vibrate({ duration });

    if (clickedButton === "ST/SP" && isStart) {
      setTimerRunning(!timerRunning);
      setCurrentButton("ST/SP");
    } else if (clickedButton === "Reset") {
      setCurrentButton("Reset");
      setIsCountdownActive(false);
      setTimerRunning(false);
      setCountdownTime(0);
      setElapsedTime(0);
      setIsTimeout(false);
      setIsStart(false)
      setTimerStarted(false)
    } else if (clickedButton === "1H") {
      setCurrentButton("1H");
      setCountdownTime(prevCountdownTime => prevCountdownTime + 3600);
      setIsCountdownActive(true);
      setTimerRunning(false);
      setIsStart(true)
      setTimerStarted(true)
    } else if (clickedButton === "5M") {
      setCurrentButton("5M");
      setCountdownTime(prevCountdownTime => prevCountdownTime + 300);
      setIsCountdownActive(true);
      setTimerRunning(false);
      setIsStart(true)
      setTimerStarted(true)
    } else if (clickedButton === "1M") {
      setCurrentButton("1M");
      setCountdownTime(prevCountdownTime => prevCountdownTime + 60);
      setIsCountdownActive(true);
      setTimerRunning(false);
      setIsStart(true)
      setTimerStarted(true)
    } else if (clickedButton === "5S") {
      setCurrentButton("5S");
      setCountdownTime(prevCountdownTime => prevCountdownTime + 5);
      setIsCountdownActive(true);
      setTimerRunning(false);
      setIsStart(true)
      setTimerStarted(true)
    } else if (clickedButton === "1S") {
      setCurrentButton("1S");
      setCountdownTime(prevCountdownTime => prevCountdownTime + 1);
      setIsCountdownActive(true);
      setTimerRunning(false);
      setIsStart(true)
      setTimerStarted(true)
    }
  }

  useEffect(() => {
    const loadState = async () => {
      try {
        const state = localStorage.getItem('timerState');
        if (state) {
          const timerState = JSON.parse(state);
          setElapsedTime(timerState.elapsedTime);
          setCurrentButton(timerState.currentButton);
          setTimerRunning(timerState.timerRunning);
          setCountdownTime(timerState.countdownTime);
          setIsCountdownActive(timerState.isCountdownActive);
          setIsTimeout(timerState.isTimeout);
        }
      } catch (error) {
        console.error('Error loading timer state from localStorage:', error);
      }
    };
  
    loadState();
  }, []);
  

  useEffect(() => {
    const saveState = async () => {
      const state = {
        elapsedTime,
        currentButton,
        timerRunning,
        countdownTime,
        isCountdownActive,
        isTimeout,
      };
      await localStorage.setItem('timerState', JSON.stringify(state));
    };
  
    saveState();
  }, [elapsedTime, currentButton, timerRunning, countdownTime, isCountdownActive, isTimeout]);
  

  return (
    <IonPage>
      <IonContent style={{ justifyContent: "center"}} color={setColor}>
        <IonGrid className=" custom-content " style={{ justifyContent: "center" }}>
          <IonRow style={{ width: "100%", height: "100%", justifyContent: "center",  alignItems: "center" }}>
            <IonLabel className="responsive-item">
              <div className="my-display">
                { currentButton === "Timer" ? `${String(Math.floor(elapsedTime / 3600)).padStart(2, '0')}:${String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0')}:${String(elapsedTime % 60).padStart(2, '0')}` :
                      `${String(Math.floor(countdownTime / 3600)).padStart(2, '0')}:${String(Math.floor((countdownTime % 3600) / 60)).padStart(2, '0')}:${String(countdownTime % 60).padStart(2, '0')}`}
              </div>
            </IonLabel>
          </IonRow>
          <IonRow style={{ justifyContent: "center", padding: currentBreakpoint >= Breakpoint.Md ? "20px" : "5px",  paddingTop: currentBreakpoint > Breakpoint.Xs ? "20px" : "40%" , width: currentBreakpoint >= Breakpoint.Md ? "80%" : "100%" }}>
            <IonRow style={{justifyContent: "center", width: currentBreakpoint >= Breakpoint.Md ? "100%" : "100%" }}>
            <IonButton
            disabled={timerStarted ? false : true }
              style={{ paddingLeft: isLargeScreen && !isXLargeScreen ? "2px" : "default" }}
              color={timerRunning && !isTimeout ? "danger" : "success"} size={isSize} fill="solid"
                onClick={() => handleClick("ST/SP")}>
                <IonIcon size='large' icon={timerRunning && !isTimeout?stopCircleOutline: playCircleOutline} />
                {/* {timerRunning && !isTimeout ? "Stop" : "Start"} */}
              </IonButton>
              <IonButton
                style={{ paddingLeft: isLargeScreen && !isXLargeScreen ? "2px" : "default" }}
                onClick={() => handleClick("Reset")} color={"success"} fill="solid" size={isSize}>
                <IonIcon size='large' icon={refreshCircleOutline} />
              </IonButton>
            </IonRow>
            <IonRow style={{ justifyContent: "center", width: currentBreakpoint >= Breakpoint.Md ? "100%" : "100%" }}>
              <IonButton shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("1H")}>
                1H
              </IonButton>
              <IonButton shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("5M")}>
                5M
              </IonButton>
              <IonButton shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("1M")}>
                1M
              </IonButton>
              <IonButton className='ion-hide-sm-down' shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("5S")}>
                5S
              </IonButton>
              <IonButton className='ion-hide-sm-down' shape="round" color="success" size={isSize} fill="solid" onClick={() => handleClick("1S")}>
                1S
              </IonButton>
            </IonRow>
          </IonRow>
        </IonGrid>
        <MySound isTimeout={isTimeout && soundEnabled? true: false} soundVolume={soundStrength}/>
      </IonContent>
    </IonPage>
  );
}


export default TimerClass;

