import { IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonList, IonModal, IonPage, IonRange, IonSelect, IonSelectOption, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { arrowBackOutline, settingsOutline, shareOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
 interface dataProps{
    setVibration: React.Dispatch<React.SetStateAction<boolean>>;
    setSound: React.Dispatch<React.SetStateAction<boolean>>;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    setSoundStrenght: React.Dispatch<React.SetStateAction<number>>;
}
export const SettingModal:React.FC<dataProps> = ({setVibration, setColor, setSound, setSoundStrenght }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [soundChecked, setSoundChecked] = useState(true);
    const [soundStrenght, setSoundStrength] = useState<number>(1);
    const [colorChecked, setColorChecked] = useState<string>("Favorite color");
    const [showColor, setShowColor] = useState<string>(colorChecked);

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleVibrationCheckboxChange = (event: { detail: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.detail.checked);
        console.log('Vibration Checkbox value:', event.detail.checked);
        setVibration(event.detail.checked);
    };
    
    const handleSoundCheckboxChange = (event: { detail: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setSoundChecked(event.detail.checked);
        console.log('Sound checkbox value:', event.detail.checked);
        setSound(event.detail.checked);
    };

    const handleColorCheckboxChange  = (event: CustomEvent) => {
        const value = event.detail.value as string;
        setShowColor(value === "danger"? "Red": value === "Dark"? "Black": value === "success"?"Green": value === "dark"? "White":"Favorite color" )
        setColorChecked(value)
        console.log('color value:', value);
        setColor(value);
    };

    const handleSoundStrenghtCheckboxChange= (event: CustomEvent) => {
        const value = event.detail.value as number;
        setSoundStrength(event.detail.value);
        console.log('Sound checkbox value:', event.detail.value);
        setSoundStrenght(event.detail.value);
    };

    const handleShare = () => {
        const shareData = {
            title: 'Check out this app!',
            text: 'I found this awesome app, and I think you will love it!',
            url: 'https://mytimer-ab4a6.web.app',
        };
    
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
        const smsURL = `sms:?body=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    
        // Check if navigator.share is supported
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
                
        } else if (navigator.share && isMobile) {
            navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else if (navigator.clipboard && isMobile) {
            navigator.clipboard.writeText(shareData.url)
                .then(() => {
                    setShowToast(true);
                    console.log('Link copied to clipboard');
                })
                .catch((error) => console.log('Error copying to clipboard', error));
        }  else {
            // Fallback options
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareData.url)
                    .then(() => {
                        setShowToast(true);
                        console.log('Link copied to clipboard');
                    })
                    .catch((error) => console.log('Error copying to clipboard', error));
            }
    
            const whatsappButton = document.createElement('button');
            whatsappButton.textContent = 'Share on WhatsApp';
            whatsappButton.onclick = () => window.open(whatsappURL, '_blank');
            
            const smsButton = document.createElement('button');
            smsButton.textContent = 'Share via SMS';
            smsButton.onclick = () => window.open(smsURL, '_blank');

            // Create a container for the buttons
            const shareContainer = document.createElement('div');
            shareContainer.appendChild(whatsappButton);
            shareContainer.appendChild(smsButton);
    
            // Assuming you have a modal or toast to show these buttons
            // Here is a simple example of appending buttons to the body
            document.body.appendChild(whatsappButton);
            document.body.appendChild(shareContainer);
            document.body.appendChild(smsButton);
        }
    };
    
    useEffect(()=>{
        //updation show color
    }, [showColor, handleColorCheckboxChange])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Timer</IonTitle>
                    <IonButtons class='header-setting' slot="end">
                        <IonButton size='large' onClick={() => setShowModal(true)}>
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
                                <IonButton onClick={() => setShowModal(false)}>
                                <IonIcon size='large' icon={arrowBackOutline}></IonIcon>
                                </IonButton>
                                
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding"> 
                        
                        <IonList>
                            <IonItem>
                                <IonSelect label="Color" placeholder={showColor}
                                    onIonChange={handleColorCheckboxChange}>
                                    <IonSelectOption value="danger">Red</IonSelectOption>
                                    <IonSelectOption value="Dark">Black</IonSelectOption>
                                    <IonSelectOption value="success">Green</IonSelectOption>
                                    <IonSelectOption value="dark">White</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                            <IonCheckbox id='checkBox'
                                checked={soundChecked}
                                onIonChange={handleSoundCheckboxChange}
                                style={{ marginLeft: 'auto' }}>Enable sound</IonCheckbox>
                        </IonItem>

                            <IonItem>
                                <IonSelect value={colorChecked} onIonChange={handleColorCheckboxChange} label="Sound" labelPlacement="fixed" placeholder="Favorite sound">
                                    <IonSelectOption value="sound1">Sound1</IonSelectOption>
                                    <IonSelectOption value="sound2">Sound2</IonSelectOption>
                                    <IonSelectOption value="sound3">Sound3</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonList>

                        <IonRange value={soundStrenght} onIonChange={handleSoundStrenghtCheckboxChange}>
                            <div slot="label">
                                <IonText color="primary">Sound strength</IonText>
                            </div>
                        </IonRange>

                        <IonItem>
                            <IonCheckbox id='checkBox'
                                checked={checked}
                                onIonChange={handleVibrationCheckboxChange}
                                style={{ marginLeft: 'auto' }}>Enable vibration</IonCheckbox>
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
