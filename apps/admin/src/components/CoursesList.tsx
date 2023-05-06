/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { api, type RouterOutputs } from "~/utils/api";
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

type Course = RouterOutputs["course"]["byAuthor"][number];

export default function BasicDemo() {
    const [layout, setLayout] = useState('grid');

		const courses = api.course.byAuthor.useQuery();

    const getSeverity = (course: Course) => {
        switch (course.published) {
            case true:
                return 'success';

            case false:
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (course: Course) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${course.image}`} alt={course.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{course.name}</div>
														<div className="text-2xl font-bold text-900">Modules: {course._count.modules}</div>
														<div className="text-2xl font-bold text-900">Lessons: {course._count.lessons}</div>
														<div className="text-2xl font-bold text-900">Students: {course._count.students}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">€35</span>
                            <Button icon="pi pi-arrow-right" className="p-button-rounded" ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (course: Course) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{course.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (course: Course, layout: string) => {
        if (!course) {
            return;
        }

        if (layout === 'list') return listItem(course);
        else if (layout === 'grid') return gridItem(course);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={courses} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div>
    )
}
        