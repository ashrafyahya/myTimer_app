import { IonButton, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Haptics } from '@capacitor/haptics';
import '../styles.css';
import { Breakpoint, useResponsiveBreakpoints } from '../useResponsiveBreakpoints';
import { playCircleOutline, refreshCircleOutline, stopCircleOutline } from 'ionicons/icons';
interface Props {
  setColor: string
}
const StopWatchClass: React.FC<Props> = ({ setColor }) => {
  
  const [isStart, setIsStart] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const currentBreakpoint: any = useResponsiveBreakpoints(window.innerWidth);
  let isSize: any = currentBreakpoint >= Breakpoint.Sm ? 'large' : 'default';

  function handleClick() {
    setIsStart(!isStart)
    const duration = 100;
    console.log("start/stop clicked");
    Haptics.vibrate({ duration });
  }

  function handleClickReset() {
    setIsReset(true)
    const duration = 100;
    console.log("reset clicked");
    Haptics.vibrate({ duration });
  }


  useEffect(() => {
    if (isStart) {
      const intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (!isStart) {
      const intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isStart, elapsedTime, setColor]);

  useEffect(() => {
    if (isReset) {
      setElapsedTime(0);
      setIsStart(false);
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    const loadState = async () => {
      try {
        const state = await localStorage.get({ key: 'timerState' });
        if (state.value) {
          const timerState = JSON.parse(state.value);
          setIsStart(timerState.isStart);
          setIsReset(timerState.isReset);
        }
      } catch (error) {
        console.error('Error loading timer state from localStorage:', error);
        // Handle error as needed (e.g., show error message to user)
      }
    };

    loadState();
  }, []);


  useEffect(() => {
    const saveState = async () => {
      const state = {
        isReset,
        isStart,
      };
      await localStorage.setItem('timerState', JSON.stringify(state));
    };

    saveState();
  }, [isStart, isStart]);



  return (
    <IonPage>
      <IonContent style={{ justifyContent: "center" }} color={setColor}>
        <IonGrid className=" custom-content " style={{ justifyContent: "center" }}>
          <IonRow style={{ width: "100%", height: "100%", justifyContent: "center" }}>
            {/* <IonItem className="responsive-item" lines="none"> */}
            <IonLabel className="responsive-item">
              <div className="my-display">
                {`${String(Math.floor(elapsedTime / 3600)).padStart(2, '0')}:${String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0')}:${String(elapsedTime % 60).padStart(2, '0')}`}
              </div>
            </IonLabel>
          </IonRow>
          <IonButton size={isSize} color={isStart ? "danger" : "success"} onClick={handleClick}>
            <IonIcon size='large' icon={isStart ? stopCircleOutline : playCircleOutline} />
            {/* {isStart?"Stop":"Start"} */}
          </IonButton>
          <IonButton size={isSize} color="success" onClick={handleClickReset}>
            <IonIcon size='large' icon={refreshCircleOutline} />
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}


export default StopWatchClass;

