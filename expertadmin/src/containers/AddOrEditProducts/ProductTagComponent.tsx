import { yupResolver } from "@hookform/resolvers/yup";
import { EditAlt } from "@styled-icons/boxicons-solid/EditAlt";
import { AddButton } from "components/AddButton";
import { AdvancedForm } from "components/AdvancedComponents/AdvancedForm";
import { EllipsedSpan } from "components/CommonStyles";
import { DisableButton } from "components/DisableButton";
import { Heading2 } from "components/Heading2";
import { ModalComponent } from "components/Modal";
import { SearchButton } from "components/SearchButton";
import { TableStyles } from "components/TableStyles";
import { DataTable } from "containers/Common/DataTable";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { ProductTags } from "types";
import { defaultProductTagInfo } from "utils/defaults";
import { tagInfoLocalization, tagInfoPlaceholder, tagInfoSize, tagInfoType, tagSchema, } from "./ProductTagHelper";
import { Close } from "@styled-icons/remix-fill/Close";
import { IconContainer } from "../../components/IconContainer";

export type TagComponentProps = {
    setProductTags: Function;
    productTags: ProductTags[];
    tagList: any
};

export const ProductTagComponent = ({
    productTags,
    setProductTags,
    tagList
}: TagComponentProps) => {

    const [productTag, setProductTag] = useState<ProductTags>(
        defaultProductTagInfo
    );
    const [options, setOptions] = useState<any>({
        key: [],
        value: []
    });
    const [disabledFields, setDisabledFields] = useState<any>({
        key: false
    });
    const [showProductTagPopUp, setShowProductTagPopUp] = useState<boolean>(
        false
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editingIdx, setEditingIdx] = useState(-1);

    const methods = useForm<ProductTags>({
        resolver: yupResolver(tagSchema),
        defaultValues: productTag,
        mode: "onChange",
        shouldFocusError: true,
    });

    const { errors, getValues } = methods;


    useEffect(() => {
        if (tagList) {
            let selectedTags: string[] = [];
            if (productTags) {
                selectedTags = selectedTags.concat(...productTags.map(tag => {
                    return tag.value
                }));
            }

            let valuesOptions: any = productTag.key ? tagList.find((tag: any) => tag.key == productTag.key).value?.map((val: string) => {
                return { label: val, value: val };
            }) : [];
            valuesOptions = valuesOptions.filter((item: any) => !selectedTags.includes(item.value));

            setOptions({
                key: tagList.map((tag: { key: string; }) => {
                    return { label: tag.key, value: tag.key }
                }),
                value: valuesOptions
            });
        }
    }, [tagList, productTag]);

    const columns = [
        {
            Header: "Key",
            accessor: "key",
            Cell: function cell(data: any) {
                return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
            },
            style: {
                width: "15%",
            },
        },
        {
            Header: "Values",
            accessor: "value",
            Cell: function cell(data: any) {
                const renderText = data.cell?.value.join(', ');
                return <EllipsedSpan>{renderText}</EllipsedSpan>;
            },
            style: {
                width: "25%",
            },
        },
        {
            Header: "Actions",
            accessor: "",
            Cell: (data: any) => {
                return (
                    <div className="d-flex align-items-center justify-content-start">
                        <IconContainer
                            icon={EditAlt}
                            onClick={() => handleRowClick(data.row.original)}
                        />
                        <IconContainer
                            color={"#dc3545"}
                            icon={Close}
                            onClick={() => onDeleteTag(data.row.original)}
                        />
                    </div>
                );
            },
            style: {
                width: "10%",
            },
        },
    ];

    const onDeleteTag = (data: any) => {
        const inx = productTags?.findIndex((e: any) => e === data);
        if (productTags != undefined && productTags[inx] && inx != undefined && inx != -1) {
            const tags = [...productTags];
            tags.splice(inx, 1);
            setProductTags(tags);
        }
    };

    const onSaveProductTag = () => {
        if (Object.keys(errors).length) return;
        const info = getValues();
        const values: any = info.value.map((item: any) => {
            return item.value
        });

        const updatedTag: ProductTags = { key: info.key, value: values };
        if (isEditing) {
            updateTag(editingIdx, updatedTag);
        } else {
            //checking if already exist
            const inx = productTags.findIndex((item: { key: string; }) => item.key === info.key);
            if (productTags && productTags.length && inx != -1) {
                updatedTag.value = [...productTags[inx].value, ...updatedTag.value];
                updateTag(inx, updatedTag);
            } else {
                setProductTag({ key: info.key, value: info.value });
                setProductTags((values: any) => [...values, updatedTag]);
            }
        }

        setShowProductTagPopUp(false);
    };

    const updateTag = (index: number, updatedValue: ProductTags) => {
        const tempTags: ProductTags[] = [...productTags];
        tempTags.splice(index, 1, updatedValue);
        setProductTags(tempTags);
    }

    const handleRowClick = (data?: any) => {
        const inx = productTags?.findIndex((e: any) => e === data);
        if (productTags && productTags.length && inx != -1) {
            setIsEditing(true);
            setEditingIdx(inx);
            setDisabledFields({ key: true });
            const values: any = productTags[inx].value.map((item: any) => {
                return { label: item, value: item }
            });
            setProductTag({ key: productTags[inx].key, value: values });
        } else {
            setIsEditing(false);
            setEditingIdx(-1);
            setDisabledFields({ key: false });
            setProductTag(defaultProductTagInfo);
        }
        setShowProductTagPopUp(true);
    };

    function handleOnChangeValue() {
        const selectedValues = methods.getValues('value');
        setProductTag({ ...productTag, value: selectedValues });
    }

    const handleTagsKeysChange = () => {
        const selectedTagKey = methods.getValues('key');
        setProductTag({ ...productTag, key: selectedTagKey });
        methods.setValue("value", []);
    }

    const onChangeHandlers = {
        key: () => handleTagsKeysChange(),
        value: () => handleOnChangeValue()
    }

    return (
        <>
            <ModalComponent
                show={showProductTagPopUp}
                handleClose={() => setShowProductTagPopUp(false)}
                showCloseIcon={true}
                header={"Tag Information"}
                isStatic={true}
                footer={
                    <Row>
                        <Col className="p-0">
                            <DisableButton
                                style={{ marginRight: ".5rem" }}
                                type="button"
                                onClick={() => setShowProductTagPopUp(false)}
                            >
                                {"Cancel"}
                            </DisableButton>
                        </Col>
                        <Col className="p-0">
                            <AddButton
                                style={{ marginRight: ".5rem" }}
                                type="button"
                                onClick={() => onSaveProductTag()}
                            >
                                {"Save"}
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
                                defaultValue={productTag || {}}
                                type={tagInfoType}
                                localization={tagInfoLocalization}
                                fieldsize={tagInfoSize}
                                placeholder={tagInfoPlaceholder}
                                options={options || {}}
                                onChangeHandlers={onChangeHandlers}
                                disabledFields={disabledFields}
                            />
                        </Col>
                    </Form>
                </FormProvider>
            </ModalComponent>
            <hr />
            <Col className="d-flex align-items-center justify-content-end w-100">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Heading2>{"Tags Information"}</Heading2>
                    <SearchButton
                        style={{ marginRight: ".5rem" }}
                        type="button"
                        onClick={() => handleRowClick()}
                    >
                        {"+ Add Tag"}
                    </SearchButton>
                </div>
            </Col>
            <br />
            {!!productTags && !!productTags.length && (
                <TableStyles>
                    <DataTable
                        columns={columns}
                        data={productTags}
                        loading={false}
                        idKey="url"
                        hiddenColumns={[]}
                    />
                </TableStyles>
            )}
        </>
    );
};
