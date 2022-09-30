import { EditAlt } from '@styled-icons/boxicons-solid/EditAlt';
import { Close } from '@styled-icons/remix-fill/Close';
import { CheckedTableCell } from 'components/CheckedTableCell';
import { EllipsedSpan } from 'components/CommonStyles';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { ImageCircle } from 'components/ImageCircle';
import { SubTableStyles } from 'components/SubTableStyles';
import { DataTable } from 'containers/Common/DataTable';
import { TrackSettingFormType } from 'containers/TrackSettings/TrackSettingForms';
import React from 'react';
import { Form } from 'react-bootstrap';

export const seoInfoCols = [
    {
        Header: 'Meta Title',
        accessor: 'metaTitle',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '10%',
        },
    },
    {
        Header: 'Meta Description',
        accessor: 'metaDescription',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Header 1 (H1)',
        accessor: 'h1',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Header 2 (H2)',
        accessor: 'h2',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '15%',
        },
    },
    {
        Header: 'Canonical Tag',
        accessor: 'canonicalTag',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '10%',
        },
    },
    {
        Header: 'Keywords',
        accessor: 'keywords',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '10%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'seo',
        Cell: function cell(data: any) {
            return (
                <div className="d-flex align-items-center justify-content-center py-2" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.cell.value?.onEdit(TrackSettingFormType.SEO)} />
                </div>
            );
        }
    }
];

export const trackPitchCols = [
    {
        Header: 'Title',
        accessor: 'title',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '40%',
        },
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '40%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'trackPitch',
        Cell: function cell(data: any) {
            return (
                <div className="d-flex align-items-center justify-content-center py-2" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.cell.value?.onEdit(TrackSettingFormType.TrackPitch)} />
                </div>
            );
        }
    }
];

export const landingPageInfoCols = [
    {
        Header: 'Heading',
        accessor: 'heading',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '25%',
        },
    },
    {
        Header: 'Sub Heading',
        accessor: 'subHeading',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '25%',
        },
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '30%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'landingPageInfo',
        Cell: function cell(data: any) {
            return (
                <div className="d-flex align-items-center justify-content-center py-2" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.cell.value?.onEdit(TrackSettingFormType.LandingPage)} />
                </div>
            );
        }
    }
];

export const trackInfoCols = [
    {
        Header: 'Logo',
        accessor: 'logo',
        Cell: function cell(data: any) {
            return (
                <CheckedTableCell
                    name="description"
                    checked={data.cell.value?.visible}
                    onChange={() => data.cell.value?.invert && data.cell.value?.invert()}
                >
                    <ImageCircle
                        image={data.cell.value?.value}
                        initials={'T'}
                    />
                </CheckedTableCell>
            );
        },
        style: {
            width: '10%',
        },
    },
    {
        Header: 'Title',
        accessor: 'title',
        Cell: (data: any) => getCheckedTableCell(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: (data: any) => getCheckedTableCell(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Detailed Description',
        accessor: 'detailsDescription',
        Cell: (data: any) => getCheckedTableCell(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Tags',
        accessor: 'tags',
        Cell: (data: any) => getCheckedTableCell(data),
        style: {
            width: '15%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'track',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center py-2" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.cell.value?.onEdit(TrackSettingFormType.TrackInformation)} />
                </div>
            );
        }
    },
];
export const nextLevelKeysCols = [
    {
        Header: 'Key Points',
        accessor: 'value',
        Cell: function cell(data: any) {
            return (
                <EllipsedSpan className="d-flex align-items-center" style={{ color: 'rgba(0, 0, 0, 0.56)' }} id="description" dangerouslySetInnerHTML={{ __html: data.row.original.value }}></EllipsedSpan>
            );
        },
        style: {
            width: '85%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'visible',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.KeyPoint)} />
                    <Form.Check className="mx-1"
                        name="visible"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.row.original.onDelete(data.row.index)} />
                </div>
            );
        }
    },
];

export const pointCols = [
    {
        Header: 'Points',
        accessor: 'value',
        Cell: function cell(data: any) {
            return (
                <div className="d-flex align-items-center justify-content-between">
                    <EllipsedSpan className="d-flex align-items-center" style={{ color: 'rgba(0, 0, 0, 0.56)' }} id="description" dangerouslySetInnerHTML={{ __html: data.cell.value }}></EllipsedSpan>
                    <div className="d-flex align-items-center">
                        <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.KeyPoint)} />
                        <Form.Check className="mx-1"
                            name="visible"
                            type="checkbox"
                            label={""}
                            checked={data.row.original.visible}
                            onChange={() => data.row.original?.invert && data.row.original?.invert()}
                        />
                        <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.row.original.onDelete()} />
                    </div>
                </div>
            );
        }
    }
];

export const planDetailCols = [
    {
        Header: 'Plan Name',
        accessor: 'planName',
        Cell: (data: any) => getCheckedTableCell(data),
        style: {
            width: '10%',
        },
    },
    {
        Header: 'Display Name',
        accessor: 'displayName',
        Cell: (data: any) => getCheckedTableCell(data)
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: (data: any) => getCheckedTableCell(data)
    },
    {
        Header: 'Points',
        accessor: 'displayDescription',
        Cell: function cell(data: any) {
            return (
                <CheckedTableCell
                    name="displayDescription"
                    checked={data.cell.value?.visible}
                    onChange={() => data.cell.value?.invert && data.cell.value?.invert()}
                    showAdd={true}
                    onAdd={() => data.cell.value?.onAdd(TrackSettingFormType.KeyPoint)}
                >
                    <SubTableStyles>
                        {!!data.cell.value?.values?.length && <DataTable
                            columns={pointCols}
                            data={data.cell.value?.values.filter((v: any) => !v.isDeleted)}
                            loading={false}
                            idKey="value"
                            cellClickFunc={() => { }}
                            hiddenColumns={[]}
                            hideHeading={true}
                        />}
                    </SubTableStyles>
                </CheckedTableCell>);
        },
        style: {
            width: '45%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'track',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.PlanDetail)} />
                    <Form.Check className="mx-1"
                        name="description"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.row.original.onDelete(data.row.index)} />
                </div>
            );
        }
    },
];

export const categoryCols = [
    {
        Header: 'Category Name',
        accessor: 'categoryName',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Capabilities',
        accessor: 'capabilities',
        Cell: function cell(data: any) {
            return (
                <>
                    <CheckedTableCell
                        name="capabilities"
                        checked={data.cell.value?.visible}
                        onChange={() => data.cell.value?.invert && data.cell.value?.invert()}
                        showAdd={true}
                        onAdd={() => data.cell.value?.onAdd(TrackSettingFormType.Capability)}
                    >
                        <SubTableStyles>
                            {!!data.cell.value?.values?.length && <DataTable
                                columns={CapabilityCols}
                                data={data.cell.value?.values?.filter((v: any) => !v.isDeleted)}
                                loading={false}
                                idKey="value"
                                cellClickFunc={() => { }}
                                hiddenColumns={[]}
                                hideHeading={true}
                            />}
                        </SubTableStyles>
                    </CheckedTableCell>
                </>
            );
        },
        style: {
            width: '60%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'visible',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.Category)} />
                    <Form.Check className="mx-1"
                        name="visible"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.cell.value?.onDelete(data.row.index)} />
                </div>
            );
        }
    }
]

export const OurProcessCols = [
    {
        Header: 'Step Title',
        accessor: 'stepTitle',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Step Description',
        accessor: 'stepDescription',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '60%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'visible',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.OurProcess)} />
                    <Form.Check className="mx-1"
                        name="visible"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.row.original.onDelete(data.row.index)} />
                </div>
            );
        }
    }
]

export const CapabilityCols = [
    {
        Header: 'Capability Text',
        accessor: 'capabilityText',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Description',
        accessor: 'capabilityDescription',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '65%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'visible',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.Capability)} />
                    <Form.Check className="mx-1"
                        name="visible"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.row.original.onDelete(data.row.index)} />
                </div>
            );
        }
    },
];
export const faqCols = [
    {
        Header: 'Question',
        accessor: 'question',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Answer',
        accessor: 'answer',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '65%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'visible',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.FAQ)} />
                    <Form.Check className="mx-1"
                        name="visible"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.row.original.onDelete(data.row.index)} />
                </div>
            );
        }
    }
];

export const successStoriesCols = [
    {
        Header: 'Name',
        accessor: 'name',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '10%',
        },
    },
    {
        Header: 'Profile',
        accessor: 'profile',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '25%',
        },
    },
    {
        Header: 'Video URL',
        accessor: 'videoURL',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '10%',
        },
    },
    {
        Header: 'Company Logo',
        accessor: 'companyLogo',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'visible',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.SuccessStory)} />
                    <Form.Check className="mx-1"
                        name="visible"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.cell.value?.onDelete(data.row.index)} />
                </div>
            );
        }
    },
];

export const freeBeeCols = [
    {
        Header: 'Logo',
        accessor: 'logo',
        Cell: function cell(data: any) {
            return (
                <ImageCircle
                    image={data.cell.value}
                    initials={'T'}
                />
            );
        },
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Title',
        accessor: 'title',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '40%',
        },
    },
    {
        Header: 'URL',
        accessor: 'url',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '25%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'visible',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.FreeBee)} />
                    <Form.Check className="mx-1"
                        name="visible"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.cell.value?.onDelete(data.row.index)} />
                </div>
            );
        }
    },
];

export const relatedTrackCols = [
    {
        Header: 'Title',
        accessor: 'title',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '25%',
        },
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '30%',
        },
    },
    {
        Header: 'Detailed Description',
        accessor: 'detailsDescription',
        Cell: (data: any) => getEllipsedSpanWithValue(data),
        style: {
            width: '30%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'visible',
        Cell: (data: any) => {
            return (
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#5B94E3'} icon={EditAlt} onClick={() => data.row.original.onEdit && data.row.original.onEdit(TrackSettingFormType.RelatedTrack)} />
                    <Form.Check className="mx-1"
                        name="visible"
                        type="checkbox"
                        label={""}
                        checked={data.row.original.visible}
                        onChange={() => data.row.original?.invert && data.row.original?.invert()}
                    />
                    <CustomStyledIcon className="mx-0" height={'15px'} color={'#dc3545'} icon={Close} onClick={() => data.cell.value?.onDelete(data.row.index)} />
                </div>
            );
        }
    },
];

const getEllipsedSpanWithValue = (data: any) => {
    return <EllipsedSpan className="d-flex align-items-center" style={{ color: 'rgba(0, 0, 0, 0.56)' }} dangerouslySetInnerHTML={{ __html: data.cell?.value }}></EllipsedSpan>
}

const getCheckedTableCell = (data: any) => {
    return (
        <CheckedTableCell
            className="d-flex align-items-center py-2"
            name="title"
            checked={data.cell.value?.visible}
            onChange={() => data.cell.value.invert && data.cell.value.invert()}
        >
            <EllipsedSpan className="d-flex align-items-center" style={{ color: 'rgba(0, 0, 0, 0.56)' }} dangerouslySetInnerHTML={{ __html: data.cell.value?.value }}></EllipsedSpan>
        </CheckedTableCell>
    );
}