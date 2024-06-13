import { IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import '../styles.css';

function TimeClass() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <IonPage>
      <IonContent style={{ justifyContent: "center" }} color="danger">
        <IonGrid className=" custom-content " style={{ marginTop: "5%", justifyContent: "center" }}>
          <IonRow style={{ width: "100%", height: "100%", justifyContent: "center" }}>
            <IonLabel className="responsive-item">
              <div className="my-display">  {currentDateTime.toLocaleTimeString()} </div>
            </IonLabel>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}


export default TimeClass;

