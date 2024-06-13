import { IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonList, IonModal, IonPage, IonRange, IonSelect, IonSelectOption, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { settingsOutline, shareOutline } from 'ionicons/icons';
import { useState } from 'react';

export function SettingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleCheckboxChange = (event: { detail: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.detail.checked);
        console.log('Checkbox value:', event.detail.checked);
    };
    const handleShare = () => {
        const shareData = {
            title: 'Check out this app!',
            text: 'I found this awesome app, and I think you will love it!',
            url: 'https://mytimer-ab4a6.web.app',
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(shareData.url)
                .then(() => {
                    setShowToast(true);
                    console.log('Link copied to clipboard');
                })
                .catch((error) => console.log('Error copying to clipboard', error));
        }
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Timer</IonTitle>
                    <IonButtons class='header-setting' slot="end">
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon icon={settingsOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonModal  isOpen={showModal}  onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Setting</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
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

                    <IonContent>
                        {/* Your modal content here */}
                        <IonFab vertical="bottom" horizontal="start" slot="fixed">
                            <IonFabButton onClick={handleShare}>
                                <IonIcon icon={shareOutline} />
                            </IonFabButton>
                        </IonFab>
                    </IonContent>
                </IonModal>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Link copied to clipboard"
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
}

export default SettingModal;
