import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = () => {
    return (
        <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>
    );
};

export default Loading;