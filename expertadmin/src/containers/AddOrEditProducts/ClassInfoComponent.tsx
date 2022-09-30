import { yupResolver } from "@hookform/resolvers/yup";
import { EditAlt } from '@styled-icons/boxicons-solid/EditAlt';
import { AddButton } from 'components/AddButton';
import { AdvancedForm } from "components/AdvancedComponents/AdvancedForm";
import { EllipsedSpan } from "components/CommonStyles";
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { DisableButton } from "components/DisableButton";
import { Heading2 } from "components/Heading2";
import { ModalComponent } from "components/Modal";
import { SearchButton } from "components/SearchButton";
import { TableStyles } from "components/TableStyles";
import { DataTable } from "containers/Common/DataTable";
import { useAddOrEditProduct } from "features/addOrEditProducts/useAddOrEditProduct";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { ClassInfo } from "types";
import { isNumeric } from "utils/commonutils";
import { ProductType, TimePeriod } from "utils/constants";
import { defaultClassInfo } from "utils/defaults";
import {
    classInfoLocalization, classInfoPlaceholder, classInfoSize, classInfoType, classSchema
} from "./AddOrEditProductHelper";
import { ClassScheduleComponent } from "./ClassScheduleComponent";

const columns = [
    {
        Header: 'Expert',
        accessor: 'expertId',
        Cell: function cell(data: any) {
            return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
        },
        style: {
            width: '15%',
        },
    },
    {
        Header: 'Zoom Details',
        accessor: 'zoomDetails',
        Cell: function cell(data: any) {
            return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
        },
        style: {
            width: '35%',
        },
    },
    {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: function cell(data: any) {
            return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
        },
        style: {
            width: '20%',
        },
    },
    {
        Header: 'End Date',
        accessor: 'endDate',
        Cell: function cell(data: any) {
            return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
        },
        style: {
            width: '20%',
        },
    },
    {
        Header: 'Actions',
        accessor: 'id',
        Cell: () => {
            return (
                <CustomStyledIcon height={'20px'} color={'#5B94E3'} icon={EditAlt} />
            );
        },
        style: {
            width: '10%',
        },
    }
];

export const ClassInfoComponent = () => {
    const [
        {
            product,
            params,
            expertId,
            expertList,
            dispatchGetClassInfo,
            dispatchCreateClassInfo,
            dispatchUpdateClassInfo,
        },
    ] = useAddOrEditProduct();
    const [classInfo, setClassInfo] = useState<ClassInfo>(defaultClassInfo);
    const [showSchedule, setshowSchedule] = useState<boolean>(false);
    const [classes, setClasses] = useState<ClassInfo[]>();

    const methods = useForm<ClassInfo>({
        resolver: yupResolver(classSchema),
        defaultValues: classInfo,
        mode: "onChange",
        shouldFocusError: true,
    });

    const { control, errors, getValues } = methods;

    const onSaveSchedule = () => {
        if (Object.keys(errors).length) return;
        const info = getValues();
        const productId = params.id;
        if (isNumeric(productId)) {
            alert("Kindly save Product Information First");
        } else {
            info.productId = productId;
            info.expertId = expertId;
            if (info.startDate)
                info.startDate = moment(info.startDate).format("MM/DD/yyyy");
            if (info.endDate)
                info.endDate = moment(info.endDate).format("MM/DD/yyyy");
            if (info.schedule) {
                info.schedule = info.schedule.map(s => {
                    s.dateAndTime = moment(s.dateAndTime).format("MM/DD/yyyy  HH:mm:ss")
                    return s;
                });
            }
            if (!classInfo.id) {
                dispatchCreateClassInfo(info);
            } else {
                dispatchUpdateClassInfo(info);
            }
        }
    }

    const handleRowClick = (data?: any, inx?: number) => {
        if (classes && classes.length && inx != undefined) {
            const info = JSON.parse(JSON.stringify(classes[inx]));
            if (info.startDate)
                info.startDate = moment(info.startDate).format("yyyy-MM-DD");
            if (info.endDate)
                info.endDate = moment(info.endDate).format("yyyy-MM-DD");
            if (info.schedule) {
                info.schedule = info.schedule.map((s: any) => {
                    s.dateAndTime = moment(s.dateAndTime).format("yyyy-MM-DDThh:mm")
                    return s;
                });
            }
            setClassInfo(info);
        } else {
            setClassInfo(defaultClassInfo);
        }
        setshowSchedule(true);
    }

    useEffect(() => {
        if (product.editProduct && product.editProduct.productType == ProductType.IHCLASS) {
            dispatchGetClassInfo({ productId: params.id, timePeriod: TimePeriod.ALL });
        }
    }, [product.editProduct])

    useEffect(() => {
        if (product?.classInfo) {
            setClasses(product.classInfo);
            setshowSchedule(false);
        }
    }, [product.classInfo])

    return (
        <>
            <ModalComponent
                show={!!showSchedule}
                handleClose={() => setshowSchedule(false)}
                showCloseIcon={true}
                header={'Class Information'}
                isStatic={true}
                footer={
                    <Row>
                        <Col className="p-0">
                            <DisableButton
                                style={{ marginRight: '.5rem' }}
                                type="button"
                                onClick={() => setshowSchedule(false)}
                            >
                                {'Cancel'}
                            </DisableButton>
                        </Col>
                        <Col className="p-0">
                            <AddButton
                                style={{ marginRight: '.5rem' }}
                                type="button"
                                onClick={() => onSaveSchedule()}
                            >
                                {'Save'}
                            </AddButton>
                        </Col>
                    </Row>
                }
            >
                <FormProvider {...methods}>
                    <Form>
                        <Col>
                            <AdvancedForm
                                hideFooter={true}
                                defaultValue={classInfo || {}}
                                type={classInfoType}
                                localization={classInfoLocalization}
                                fieldsize={classInfoSize}
                                placeholder={classInfoPlaceholder}
                                options={{ expertId: expertList || [] }}
                            >
                                <ClassScheduleComponent control={control} name="schedule" />
                            </AdvancedForm>
                        </Col>
                    </Form>
                </FormProvider>
            </ModalComponent>
            <hr />
            <Col className="d-flex align-items-center justify-content-end w-100">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Heading2>{'Class Information'}</Heading2>
                    <SearchButton
                        style={{ marginRight: '.5rem' }}
                        type="button"
                        onClick={() => handleRowClick()}
                    >
                        {'+ Create Schedule'}
                    </SearchButton>
                </div>
            </Col>
            <br />
            {!!classes && !!classes.length &&
                <TableStyles>
                    <DataTable
                        columns={columns}
                        data={classes}
                        loading={product.loading}
                        idKey="id"
                        cellClickFunc={handleRowClick}
                        hiddenColumns={[]}
                    />
                </TableStyles>
            }
        </>
    )
}
