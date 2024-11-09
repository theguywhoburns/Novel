import { useState } from 'react';
import styles from './Place.module.css';
import { BaseModal } from '@/components/BaseModal';

export interface IPlace {
    name: string;
    imgSrc?: React.Component;// TODO
    rating: number; // 1.0-5.0
    description: string;
    address: string; // We will use open street map to get the latitude and longitude from this address
}

export const Place = ({name, rating}: IPlace) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <>
            <button className={styles.place}>
                <div className={styles.placeName}>{name}</div>
                <div className={styles.placeDesc}>(звёздочка): {rating}</div>
                <div className={styles.placeDesc}>? км от вас</div>
            </button>
            <BaseModal name={name} visible={isModalVisible} setVisible={setIsModalVisible}>
                {/* TODO: Add place info here */}
            </BaseModal>
        </>
    )
};