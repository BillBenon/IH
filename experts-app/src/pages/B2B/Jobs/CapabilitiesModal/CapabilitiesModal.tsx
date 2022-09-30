import React, { useState } from "react";
import { ModalComponent } from 'components/Modals/Modal';
import { Table, Form } from 'react-bootstrap';
import { AttributeEntity, AttributeEntityChildren } from "types/Jobs";
import {
    Category,
    SubCategory,
    SubCategoryWrapper,
    Score,
    AttributesToggleContainer,
    THead,
    TData,
    ToggleContainer
} from "./styled";
import styled from "styled-components";
import { theme } from "pages/B2B/constants";

type AttributeModalProps = {
    name?: string;
    attributes: AttributeEntity[];
    secondaryAttributes?: AttributeEntity[];
    show: boolean;
    showScore?: boolean;
    handleClose: (e: boolean) => void;
    dialogClassName?: string;
};

type ScoreAttrs = {
    score: number;
    attrs: AttributeEntityChildren[];
};

const CapabilitiesModal = ({
    name,
    attributes,
    secondaryAttributes = [],
    show,
    showScore,
    dialogClassName,
    handleClose
}: AttributeModalProps) => {
    const [isPrimaryCheck, setIsPrimaryCheck] = useState(true);
    const [attributesList, setAttributesList] = useState(attributes);

    const toggleCheck = () => {
        !isPrimaryCheck ? setAttributesList(attributes) : setAttributesList(secondaryAttributes);
        setIsPrimaryCheck(!isPrimaryCheck);
    };

    const header = name ? `${isPrimaryCheck ? 'Primary' : 'Secondary'} Capabilities of ${name}` : 'Capabilities';

    return (
        <ModalComponent
            header={header}
            handleClose={() => handleClose(false)}
            show={show}
            showCloseIcon={true}
            dialogClassName={dialogClassName}
        >
            <Form>
                {showScore && (
                    <AttributesToggleContainer>
                        <ToggleContainer>
                            <div className="category">Primary Capabilities&nbsp;&nbsp;</div>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                onChange={toggleCheck}
                                label=""
                            />
                            <div className="category">Secondary Capabilities</div>
                        </ToggleContainer>
                    </AttributesToggleContainer>
                )}
                <Table bordered>
                    <thead>
                        <tr style={{ background: 'whitesmoke' }}>
                            <THead>Category</THead>
                            <THead>Sub-category</THead>
                            {showScore && <THead>Score</THead>}
                        </tr>
                    </thead>
                    <tbody>
                        {attributesList.map((attr) => {
                            const childAttrs: ScoreAttrs[] = [];
                            const scoreIndexArr: number[] = [];
                            attr.children?.forEach((subCategory: AttributeEntityChildren) => {
                                let score = subCategory.score || -1;
                                const index = scoreIndexArr.indexOf(score);
                                if (index !== -1) {
                                    childAttrs[index]['attrs'].push(subCategory);
                                } else {
                                    childAttrs.push({
                                        score,
                                        attrs: [subCategory]
                                    });
                                    scoreIndexArr.push(score);
                                }
                            })
                            return (
                                childAttrs.map((childAttr, index, arr) => {
                                    const { score, attrs } = childAttr;
                                    const scoreVal = score === -1 ? 'Not evaluated' : score;
                                    return (
                                        <tr>
                                            {index === 0 && <TData rowSpan={arr.length}><Category>{attr.entityTitle}</Category></TData>}
                                            <TData><ScoreCategories attrs={attrs} /></TData>
                                            {showScore && <TData><Score>{scoreVal}</Score></TData>}
                                        </tr>
                                    )
                                })
                            );
                        })}
                    </tbody>
                </Table>
            </Form>
        </ModalComponent>
    );
};

const ScoreCategories = ({ attrs }: { attrs: AttributeEntityChildren[] }) => {
    return (
        <SubCategoryWrapper className="score-categories">
            {attrs.map((attr) => {
                return (
                    <SubCategory>{attr.entityTitle}</SubCategory>
                )
            })}
        </SubCategoryWrapper>
    )
};

export const CapabilityLink = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-top: 20px;
    color: ${theme.colors.PRIMARY_01};
    cursor: pointer;

    svg {
        height: 13px;
        margin-left: 4px;
        margin-bottom: 3px;
    }
`;

export default CapabilitiesModal;