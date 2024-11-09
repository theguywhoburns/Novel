import { useState } from 'react';
import { useTheme } from '@/theme';
import { IconFilter } from '@/icons';
import { IPlace, Place } from './Place';
import styles from './Interests.module.css';

const PlaceList : Record<string, IPlace[]> = {
    "Парки": [
        {
            name: "Парк Победы",
            imgSrc: undefined,
            rating: 4.5,
            description: "Описание парка",
            address: "ул. Победы, 1"
        },
        {
            name: "Парк Победы но второй",
            imgSrc: undefined,
            rating: 4.1,
            description: "Описание парка но чуточку другое",
            address: "ул. Победы, 2"
        }
    ],
    "Культура": [
        {
            name: "Музей Культуры",
            imgSrc: undefined,
            rating: 4.7,
            description: "Описание музея",
            address: "ул. Культуры, 0"
        },
        {
            name: "Музей Культуры но второй",
            imgSrc: undefined,
            rating: 4.3,
            description: "Описание музея но чуточку другое",
            address: "ул. Культуры, 1"
        }
    ]
}

export const Interests = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const placeTypes = Object.entries(PlaceList).map(([type, _]) => ({
        type
    }));
    const [placeType, setPlaceType] = useState('Парки');
    const theme = useTheme();
    return (
        <>
            <div style={{display: 'flex', gap: 10}}>
                <button style={{display: 'flex', borderRadius: 50, padding: 10, justifyContent: 'center', alignItems: 'center'}}><IconFilter/></button>
                {
                    placeTypes.map(({type}) => (
                        <button style={{background: placeType === type ? theme.accent_color : theme.button_background_color, color: placeType === type ? theme.button_background_color : theme.accent_color}} key={type} onClick={() => setPlaceType(type)}>{type}</button>
                    ))
                }
            </div>
            Рекомендуемые места
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                {
                    PlaceList[placeType].map(place => (
                        <Place key={place.name} {...place}/>
                    ))
                }
            </div>
        </>
    );
};