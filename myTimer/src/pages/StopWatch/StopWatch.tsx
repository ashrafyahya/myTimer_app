import { IonButton, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import '../styles.css';
import { Breakpoint, useResponsiveBreakpoints } from '../useResponsiveBreakpoints';

function StopWatchClass() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const currentBreakpoint: any = useResponsiveBreakpoints(window.innerWidth);
    let isSize: any = currentBreakpoint >= Breakpoint.Sm ? 'large' : 'default';

    const [isStart, setIsStart] = useState(false);
    const [isReset, setIsReset] = useState(false);

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
    }, [isStart, elapsedTime]);

    useEffect(() => {
        if (isReset) {
            setElapsedTime(0);
            setIsStart(false);
            setIsReset(false);
        }
    }, [isReset]);

    return (
        <IonPage>
            <IonContent style={{ justifyContent: "center" }} color="danger">
                <IonGrid className=" custom-content " style={{ marginTop: "5%", justifyContent: "center" }}>
                    <IonRow style={{ width: "100%", height: "100%", justifyContent: "center" }}>
                        {/* <IonItem className="responsive-item" lines="none"> */}
                        <IonLabel className="responsive-item">
                            <div className="my-display">
                                {`${String(Math.floor(elapsedTime / 3600)).padStart(2, '0')}:${String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0')}:${String(elapsedTime % 60).padStart(2, '0')}`}
                            </div>
                        </IonLabel>
                    </IonRow>
                    <IonButton size={isSize} color="success" onClick={() => setIsStart(!isStart)}>
                        {isStart?"Stop":"Start"}
                    </IonButton>
                    <IonButton size={isSize} color="success" onClick={() => setIsReset(true)}>
                        Reset
                    </IonButton>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}


export default StopWatchClass;

