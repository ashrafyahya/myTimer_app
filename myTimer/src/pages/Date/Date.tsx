import { IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useMediaQuery } from '@react-hook/media-query';
import '../myTimer.css';

function DateClass() {

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
                <IonGrid className=" custom-content " style={{ marginTop: "5%", justifyContent: "center" }}>
                    <IonRow style={{ width: "100%", height: "50%", justifyContent: "center" }}>
                        <IonLabel className="responsive-item">
                            <div className="my-display">
                                {formatDate(new Date())}</div>
                        </IonLabel>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}



export default DateClass;