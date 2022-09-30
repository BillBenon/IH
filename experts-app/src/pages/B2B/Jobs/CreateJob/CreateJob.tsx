import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Form, Formik, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import useJobDispatcher, { jobTypes } from 'containers/HiringManager/Jobs.util';
import TreeViewComponent from 'components/TreeView/TreeViewComponent';
import { Category } from 'containers/Meeting/meetingTypes';
import { ColorCode, Entity } from 'utilities/constants';
import { makeTreeNode } from 'components/TreeView/MakeTreeNode';
import { ModalComponent } from 'components/Modals/Modal';
import { FieldSet, Label, Title, ModalFormWrapper, SubmitButton } from '../Jobs.styled';
import { resetTrackTree } from "actions/hiringManager/jobs/jobsSlice";

type Props = {
    setShowCreateJobForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ValidationSchema = Yup.object({
    track: Yup.string()
        .required("Job Role is required"),
    openPositions: Yup.string()
        .required("Position is required"),
    jobType: Yup.string()
        .required("Job Type is required")
});

const CreateJob = ({ setShowCreateJobForm }: Props) => {
    const { jobTracks, loading, trackTree } = useSelector((state: RootState) => state.jobs);
    const { getAllTracksForJob, getTrackTree, createJob } = useJobDispatcher();
    const [treeData, setTreeData] = useState<any>();
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [selectedTrackId, setSelectedTrackId] = useState<string>('');
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [checkedNodes, setCheckedNodes] = useState<string[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!jobTracks.length && !loading) {
            getAllTracksForJob();
        }
    }, [getAllTracksForJob, jobTracks.length, loading]);

    const closeModal = () => {
        dispatch(resetTrackTree());
        setShowCreateJobForm(false);
    }

    const setTree = useCallback((categories: Category[]) => {
        const trackName = "All Categories";
        const tree = [];
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
                    title: makeTreeNode({
                        title: subcat.subCategoryName,
                        style: { color: ColorCode[Entity.SUBCATEGORY], fontSize: '14px' },
                    })
                };
            });
            const catkey = cat.categoryId + '-' + Entity.CATEGORY;
            return {
                key: catkey,
                id: cat.categoryId,
                title: makeTreeNode({
                    title: cat.categoryName,
                    style: { color: ColorCode[Entity.CATEGORY], fontSize: '16px' },
                }),
                children: categories,
            };
        });
        setExpandedKeys([selectedTrackId]);
        tree.push({
            key: selectedTrackId,
            entity: Entity.TRACK,
            title: makeTreeNode({
                title: trackName,
            }),
            children: categoryTree,
        });
        setTreeData(tree);
    }, [selectedTrackId]);

    useEffect(() => {
        if (trackTree.length) {
            setTree(trackTree);
        }
    }, [setTree, trackTree]);

    const handleTrackChange = (trackId: string) => {
        trackId && getTrackTree(trackId);
        setSelectedTrackId(trackId);
    }

    const handleSubmit = (values: any) => {
        const { track, openPositions, jobType } = values;
        const [trackId, title] = track.split('-');
        closeModal();
        createJob({ trackId, openPositions, jobType, title, description: '', profileRequirements: '', checkedNodes, trackTree });
    }

    const legend = [
        {
            color: ColorCode[Entity.CATEGORY],
            text: "Category"
        },
        {
            color: ColorCode[Entity.SUBCATEGORY],
            text: "SubCategory"
        }
    ];

    const position = Array.from({ length: 20 }, (v, k) => ({ key: k + 1, value: k + 1 }));

    const handleExpandedKeys = (expandedKeys: string[]) => {
        setExpandedKeys(expandedKeys);
        setCheckedKeys(keys => {
            return [...keys]
        });
    };

    const onCheck = (treeData: string[], e: any) => {
        setCheckedKeys(treeData);
        setCheckedNodes(e.checkedNodes);
    }

    const disableSubmit = (formik: any) => {
        return !formik.isValid || checkedKeys.length < 1;
    }

    return (
        <ModalComponent
            handleClose={() => closeModal()}
            show={true}
            showCloseIcon={true}
        >
            <ModalFormWrapper>
                <Formik
                    initialValues={{ track: "", openPositions: "", jobType: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={ValidationSchema}
                >
                    {(formik) => (
                        <Form>
                            <Title>Create Job</Title>
                            <FieldSet className="mt-4 mb-4">
                                <Label className="font-weight-bold">Select Job Role</Label>
                                <Field name='track' keyParam='trackId' valueParam='title' title='Select Job Role' addNameToValue options={jobTracks} type='text' onChange={handleTrackChange} component={SelectComponent} />
                            </FieldSet>
                            <FieldSet className="mt-4 mb-4">
                                <Label className="font-weight-bold">Total Open Positions</Label>
                                <Field name='openPositions' keyParam='key' valueParam='value' title='Select No of Open Positions' options={position} type='text' component={SelectComponent} />
                            </FieldSet>
                            <FieldSet className="mt-4 mb-4">
                                <Label className="font-weight-bold">Job Type</Label>
                                <Field name='jobType' keyParam='key' valueParam='value' title='Select Job Type' options={jobTypes} type='text' component={SelectComponent} />
                            </FieldSet>
                            <FieldSet className="mt-4 mb-4">
                                <Label className="font-weight-bold">Attributes</Label>
                                {treeData ? (
                                    <TreeViewComponent
                                        expandedKeys={expandedKeys}
                                        checkedKeys={checkedKeys}
                                        legend={legend}
                                        checkable={true}
                                        data={treeData}
                                        onCheck={onCheck}
                                        handleExpandedKeys={handleExpandedKeys}
                                    />
                                ) : (
                                    <select name="tree-view" className="form-control">
                                        <option value={''}>Select Attributes</option>
                                    </select>
                                )}
                            </FieldSet>
                            <SubmitButton disabled={disableSubmit(formik)} type="submit" style={{ marginTop: '40px', width: '100%' }}>Submit</SubmitButton>
                        </Form>
                    )}
                </Formik>
            </ModalFormWrapper>
        </ModalComponent>
    );
};

type SelectProps = {
    title: string;
    keyParam: string;
    valueParam: string;
    addNameToValue?: boolean;
    onChange?: (e: string) => void;
    options: { key: string, value: string }[];
} & FieldProps;

const SelectComponent = ({ title, options, form, field, keyParam, valueParam, addNameToValue, onChange }: SelectProps) => {
    const { name } = field;
    const handleOnChange = (selectedOption: ChangeEvent<HTMLSelectElement>) => {
        const { value } = selectedOption.target
        form.setFieldValue(name, value);
        onChange && onChange(addNameToValue ? value.split('-')[0] : value);
    };

    return (
        <select name={name} className="form-control" onChange={handleOnChange}>
            <option value={''}>{title}</option>
            {options?.map(
                (opt: any, index: number) => (
                    <option key={index + name} value={addNameToValue ? `${opt[keyParam]}-${opt[valueParam]}` : opt[keyParam]}>
                        {opt[valueParam]}
                    </option>
                )
            )}
        </select>
    )
};

export default CreateJob;