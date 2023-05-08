import React from 'react';
import { Skeleton } from 'primereact/skeleton';

const LoadingEditor = () => {
    return (
        <div className="card">
            <div className="border-round border-1 surface-border p-4 surface-card">
                <div className="flex mb-3">
                  <Skeleton width="10rem" className="mb-2"></Skeleton>
                  <Skeleton width="5rem" className="mb-2"></Skeleton>
                  <Skeleton height=".5rem"></Skeleton>
                </div>
                <Skeleton width="100%" height="150px"></Skeleton>
                <div className="flex justify-content-between mt-3">
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
            </div>
        </div>
    );
};

export default LoadingEditor;