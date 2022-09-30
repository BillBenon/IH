import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import { BigSpan, BoldSpan, SmallSpan } from 'components/CommonStyles';
import { makeTreeNode } from 'components/TreeView/MakeTreeNode';
import TreeViewComponent from 'components/TreeView/TreeViewComponent';
import { CandidateTrackTree } from 'containers/Meeting/meetingTypes';
import { useLoader } from 'context/loaderContext';
import React, { useEffect, useState, useMemo } from 'react';
import { Button, Col, FormControl, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { meetingService } from 'services/meeting';
import { RootState } from 'store';
import { useMessagePopup } from 'context/messagePopContext';

import {
    ColorCode, Entity
} from "utilities/constants";


interface IAddCustomQuestion {
    trackId: string;
    onCancel: Function;
    onSave: Function;
    customQuestionId?: string;
    meetingDetailId: string;
}

export const AddCustomQuestion = ({ trackId, onCancel, onSave, meetingDetailId, customQuestionId }: IAddCustomQuestion) => {
    const expertId = useSelector((state: RootState) => state.auth.user.expertId);
    const Loader = useLoader();
    const message = useMessagePopup();
    const [title, settitle] = useState<string>("");
    const [description, setdescription] = useState<string>("");
    const [currentTrack, setcurrentTrack] = useState<CandidateTrackTree>();
    const [loading, setLoading] = useState<boolean>(false);
    const [treeData, setTreeData] = useState<any>();
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [titleerror, setTitleError] = useState<string>("");
    const [descriptionerror, setDescriptionError] = useState<string>("");
    const [capabilityerror, setCapabilityError] = useState<string>("");

    const legend = [
        {
            color: ColorCode[Entity.CATEGORY],
            text: "Category"
        },
        {
            color: ColorCode[Entity.SUBCATEGORY],
            text: "SubCategory"
        },
        {
            color: ColorCode[Entity.CAPABILITY],
            text: "Capability"
        }
    ]

    const setTree = (currentTrack: CandidateTrackTree) => {
        const categories = currentTrack.categories
        const trackName = "All Categories";
        const tree = [];
        const xpandedKeys: string[] = [];
        const categoryTree = categories.map((cat: any) => {
            const categories = cat.subCategories?.map((subcat: any) => {
                const subcatkey =
                    cat.categoryId + '-' + Entity.CATEGORY +
                    '-' +
                    subcat?.subCategoryId +
                    '-' +
                    Entity.SUBCATEGORY;
                return {
                    key: subcatkey,
                    id: subcat?.subCategoryId,
                    disableCheckbox: true,
                    title: makeTreeNode({
                        title: subcat.subCategoryName,
                        style: { color: ColorCode[Entity.SUBCATEGORY], fontSize: '14px' },
                    }),
                    children: subcat.capabilities?.map((cap: any) => {
                        const capkey =
                            subcatkey + '-' + cap.capabilityId + '-' + Entity.CAPABILITY;
                        return {
                            id: cap.capabilityId,
                            key: capkey,
                            title: makeTreeNode({
                                title: cap.capabilityText,
                                style: {
                                    color: ColorCode[Entity.CAPABILITY],
                                    fontSize: '12px',
                                },
                            })
                        };
                    }),
                };
            });
            const catkey = cat.categoryId + '-' + Entity.CATEGORY;
            xpandedKeys.push(catkey);
            return {
                disableCheckbox: true,
                key: catkey,
                id: cat.categoryId,
                title: makeTreeNode({
                    title: cat.categoryName,
                    style: { color: ColorCode[Entity.CATEGORY], fontSize: '16px' },
                }),
                children: categories,
            };
        });
        setExpandedKeys(xpandedKeys);
        tree.push({
            key: trackId,
            disableCheckbox: true,
            entity: Entity.TRACK,
            title: makeTreeNode({
                title: trackName,
            }),
            children: categoryTree,
        });
        setTreeData(tree);
    }

    const handleExpandedKeys = (xpandedKeys: string[]) => {
        setExpandedKeys(xpandedKeys);
    }

    const onCheck = (treeData: string[]) => {
        const newkey = treeData.filter(t => !checkedKeys.includes(t));
        setCheckedKeys(newkey);
        if (capabilityerror)
            setCapabilityError("");
    }

    const handleSave = async () => {
        if (!title) {
            setTitleError("Question Title is required");
            return;
        }
        if (!description) {
            setDescriptionError("Question Description is required");
            return;
        }
        if (checkedKeys.length) {
            const selectedBranchArr = checkedKeys[0].split('-');
            const capInx = selectedBranchArr.findIndex((b: string) => b === Entity.CAPABILITY);
            const capabilityId = selectedBranchArr[capInx - 1];
            const input = {
                questionId: customQuestionId,
                expertId,
                title,
                description,
                capabilityId,
                meetingDetailId,
            };
            Loader.showLoader();
            const result = await meetingService.addQuestionsForMeeting(input);
            if(result.error){
                message.fail(result.output)
            }
            else {
                onSave(result.output);
            }
            Loader.hideLoader();
        } else {
            setCapabilityError("Please select question capabilities.");
            const elem = document.getElementById('capability-error');
            if (elem) {
                elem.scrollIntoView(true);
            }
        }
    }

    const handleCancel = () => {
        onCancel()
    }

    const fetchCustomQuestion = async (customQuestionId: string) => {
        const input = {
            expertId,
            questionId: customQuestionId
        };
        const response = await meetingService.getQuestionsDetails(input);
        settitle(response.output.title);
        setdescription(response.output.description);
        const catId = response.output.capabilities[0].categoryId;
        const capId = response.output.capabilities[0].capabilityId;
        const subcatId = response.output.capabilities[0].subCategoryId;
        if (catId && capId && subcatId) {
            const checkedKey = catId + "-" + Entity.CATEGORY + "-" + subcatId + "-" + Entity.SUBCATEGORY + "-" + capId + "-" + Entity.CAPABILITY;
            setCheckedKeys([checkedKey]);
        }
    }

    useEffect(() => {
        if (customQuestionId) {
            fetchCustomQuestion(customQuestionId);
        }
    }, [customQuestionId])

    useEffect(() => {
        if (currentTrack)
            setTree(currentTrack);
    }, [currentTrack])

    useEffect(() => {
        if (!currentTrack) {
            const evaluationTrackData = async () => {
                setLoading(true);
                const output = await meetingService.getTrackTree({
                    trackId,
                    expertId,
                });
                setLoading(false);
                setcurrentTrack(output.output);
            }
            evaluationTrackData();
        }
    }, [currentTrack])

    return (
        <Row className="h-100">
            <Col xs={12} style={{ marginTop: '-10px', marginBottom: '10px' }}>
                <BigSpan>{'Add New Custom Question'}</BigSpan>
            </Col>
            <div className="custom-question-body">
                <Col xs={12}>
                    <BoldSpan>{'Enter Question Title'}</BoldSpan>
                    {titleerror && <SmallSpan className="ml-2 text-danger">{titleerror}</SmallSpan>}
                    <FormControl
                        aria-label="title"
                        className="w-100"
                        id={'title'}
                        value={title}
                        onChange={(event: any) => { settitle(event?.target.value); setTitleError("") }}
                        placeholder='Question Title here...'
                    />
                </Col>
                <Col xs={12} className="mt-3">
                    <BoldSpan>{'Enter Question Description'}</BoldSpan>
                    {descriptionerror && <SmallSpan className="ml-2 text-danger">{descriptionerror}</SmallSpan>}
                    <RichTextEditor
                        id={'description'}
                        disabled={false}
                        value={description}
                        onChange={(data: string) => { setdescription(data); setDescriptionError("") }}
                        placeholder='Question Description here...'
                        customStyles={{ height: '150px' }}
                    />
                </Col>
                <hr />
                <Col xs={12} className="mt-3">
                    <BoldSpan>{'Select Question Capabilities'}</BoldSpan>
                    {capabilityerror && <SmallSpan id="capability-error" className="ml-2 text-danger">{capabilityerror}</SmallSpan>}
                    {loading && <Spinner style={{ height: "1rem", width: "1rem" }} animation="border" />}
                    <TreeViewComponent
                        legend={legend}
                        checkable={true}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        data={treeData}
                        handleExpandedKeys={handleExpandedKeys}
                    />
                </Col>
            </div>
            <Col xs={12} className="mt-5 pr-0">
                <div className="col-12 d-flex justify-content-end align-items-center">
                    <Button className="btn-sm mr-2 btn-secondary" onClick={() => handleCancel()}>{'Cancel'}</Button>
                    <Button className="btn-sm" onClick={handleSave}>{'Add Question'}</Button>
                </div>
            </Col>
        </Row >
    )
}
