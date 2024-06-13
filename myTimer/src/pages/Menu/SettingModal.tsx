import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonList, IonModal, IonPage, IonRange, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import { useState } from 'react';

export function SettingModal() {
    const [isOpen, setIsOpen] = useState(false);

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event: { detail: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.detail.checked);
        console.log('Checkbox value:', event.detail.checked);
    };
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
                        {/* TODO
                        use the valuse below to specify the color, sound and sound strenght, vibration ...
                        use for that a varibale or functions, that allow you sending this values to the tabs
                        suggestion: find out how to set the color in myTimer.tsx, so it would be easier
                        */}
                        <IonList>
                            <IonItem>
                                <IonSelect label="Color" placeholder="Favorite color">
                                    <IonSelectOption value="red">Red</IonSelectOption>
                                    <IonSelectOption value="black">Black</IonSelectOption>
                                    <IonSelectOption value="white">White</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonSelect label="Sound" labelPlacement="fixed" placeholder="Favorite sound">
                                    <IonSelectOption value="sound1">Sound1</IonSelectOption>
                                    <IonSelectOption value="sound2">Sound2</IonSelectOption>
                                    <IonSelectOption value="sound3">Sound3</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonList>

                        <IonRange>
                            <div slot="label">
                                <IonText color="primary">Sound strength</IonText>
                            </div>
                        </IonRange>
                        <IonItem>
                            <IonCheckbox id='checkBox'
                                checked={checked}
                                onIonChange={handleCheckboxChange}
                                style={{ marginLeft: 'auto' }}>Vibration</IonCheckbox>
                        </IonItem>

                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}

export default SettingModal;
