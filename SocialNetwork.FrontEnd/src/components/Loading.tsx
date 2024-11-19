import React from 'react';
import styles from '@/styles/loading.module.scss'; // Đường dẫn đến file CSS

const Loading: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;
