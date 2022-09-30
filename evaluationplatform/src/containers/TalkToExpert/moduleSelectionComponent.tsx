import {
    makeTreeNode
} from 'components/TreeView/MakeTreeNode';
import TreeViewComponent from 'components/TreeView/TreeViewComponent';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { evaluationPlatformService } from 'services/evaluationPlatform';
import {
    Candidate_Track_Id, ColorCode, Entity,
    Track_Id
} from "utilities/constants";
import { CandidateTrackTree, IFocussedModule } from './meetingTypes';
import "./moduleSelection.css";


interface IModuleSelectionComponent {
    onCheck: (data: IFocussedModule[]) => void;
    checkedKeys?: string[];
}

export const ModuleSelectionComponent = (props: IModuleSelectionComponent) => {
    const [currentTrack, setcurrentTrack] = useState<CandidateTrackTree | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const savedCandidateTrackId = getValueBrowserStorage(Candidate_Track_Id);
    const [treeData, setTreeData] = useState<any>();
    const [checkedKeys, setCheckedKeys] = useState<string[]>(props.checkedKeys || []);
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
        const trackId = getValueBrowserStorage(Track_Id);
        const categories = currentTrack.categories
        const trackName = "All Categories";
        const tree = [];
        const categoryTree = categories?.map((cat: any) => {
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
                    }),
                    children: subcat.capabilities?.map((cap: any) => {
                        const capkey =
                            subcatkey + '-' + cap.capabilityId + '-' + Entity.CAPABILITY;
                        return {
                            id: cap.capabilityId,
                            key: capkey,
                            title: makeTreeNode({
                                title: cap.capabilityName,
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
        tree.push({
            key: trackId,
            entity: Entity.TRACK,
            title: makeTreeNode({
                title: trackName,
            }),
            children: categoryTree,
        });
        setTreeData(tree);
    }

    const prepareSaveData = (checkedNodes: any) => {
        let data: IFocussedModule[] = [];
        for (let i = 0; i < checkedNodes.length; i++) {
            const selectedBranchArr = checkedNodes[i].split('-');
            const catInx = selectedBranchArr.findIndex((b: string) => b === Entity.CATEGORY);
            if (catInx > 0) {
                const categoryId = selectedBranchArr[catInx - 1];
                let categoryInxInData = data.findIndex(d => d.entityId === categoryId);
                if (categoryInxInData === -1) {
                    data.push({
                        entity: "CATEGORY",
                        entityId: categoryId,
                        children: []
                    });
                    categoryInxInData = data.length - 1;
                }
                let subcatInx = selectedBranchArr.findIndex((b: string) => b === Entity.SUBCATEGORY);
                if (subcatInx > 0) {
                    const subCategoryId = selectedBranchArr[subcatInx - 1];
                    let subcatInxInData = data[categoryInxInData].children.findIndex(s => s.entityId === subCategoryId)
                    if ((subcatInxInData === undefined || subcatInxInData === -1)) {
                        data[categoryInxInData].children.push({
                            entity: "SUBCATEGORY",
                            entityId: subCategoryId,
                            children: []
                        });
                        subcatInxInData = (data[categoryInxInData].children.length || 0) - 1;
                    }
                    const capInx = selectedBranchArr.findIndex((b: string) => b === Entity.CAPABILITY);
                    if (capInx > 0) {
                        const capabilityId = selectedBranchArr[capInx - 1];
                        const capInxInData = data[categoryInxInData].children[subcatInxInData].children.findIndex((s: any) => s.entityId === capabilityId);
                        if ((capInxInData === undefined || capInxInData === -1)) {
                            data[categoryInxInData].children[subcatInxInData].children.push({
                                entity: "CAPABILITY",
                                entityId: capabilityId,
                                children: [],
                            });
                        }
                    }
                }
            }
        }
        return data;
    }

    const onCheck = (treeData: any[]) => {
        const data = prepareSaveData(treeData);
        setCheckedKeys(treeData);
        props.onCheck(data);
    }

    useEffect(() => {
        if (currentTrack)
            setTree(currentTrack);
    }, [currentTrack])

    useEffect(() => {
        if (!currentTrack) {
            const evaluationTrackData = async () => {
                if (savedCandidateTrackId) {
                    setLoading(true);
                    const output = await evaluationPlatformService.getCandidateTrackTree({
                        candidateTrackId: savedCandidateTrackId,
                    });
                    setLoading(false);
                    setcurrentTrack(output.output);
                }
            }
            evaluationTrackData();
        }
    }, [savedCandidateTrackId, currentTrack])
    
    return (
        <div>
            <div className="h5 m-3 text-center">
                <span>{'Select the modules you want to focus on during the meeting'}</span><span className="text-danger">(Optional)</span>
            </div>
            {loading && <Spinner style={{ height: "1rem", width: "1rem" }} animation="border" />}
            <TreeViewComponent
                className={"module-wrapper"}
                legend={legend}
                checkable={true}
                onCheck={onCheck}
                data={treeData}
                checkedKeys={checkedKeys}
            /></div>
    )
}