import React, { useState } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonPage, IonIcon } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

export function SettingModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Timer</IonTitle>
                    <IonButtons class='header-setting' slot="end">
                        <IonButton onClick={() => setIsOpen(true)}>
                            <IonIcon icon={settingsOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonModal isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Setting</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <p>
                            Here is our setting for sound, vibration, background color etc. as share button too
                        </p>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}

export default SettingModal;
