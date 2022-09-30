import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { makeTreeNode } from "../../../../components/TreeView/MakeTreeNode";
import TreeViewComponent from "../../../../components/TreeView/TreeViewComponent";
import { meetingService } from "../../../../services/meeting";
import { RootState } from "../../../../store";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useLoader } from "context/loaderContext";

import { ColorCode, Entity } from "../../../../utilities/constants";
import {
  CandidateTrackTree,
  IFocussedModule,
} from "containers/Meeting/meetingTypes";

interface IModuleSelectionComponent {
  trackId: string;
  meetingDetailId: string;
  onClose: Function;
}

export const ModuleSelectionComponent = ({
  trackId,
  meetingDetailId,
  onClose,
}: IModuleSelectionComponent) => {
  const Loader = useLoader();
  const expertId = useSelector((state: RootState) => state.auth.user.expertId);
  const [currentTrack, setcurrentTrack] = useState<
    CandidateTrackTree | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<any>();
  const [filterVal, setFilterVal] = useState<string | undefined>();
  const [showCheckedOnly, setShowCheckedOnly] = useState<boolean>();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [defaultQuestions, setDefaultQuestions] = useState<string[]>([]);
  const [initialModulesFromCandidate, setInitialModulesFromCandidate] =
    useState<Boolean>(true);

  const legend = [
    {
      color: ColorCode[Entity.CATEGORY],
      text: "Category",
    },
    {
      color: ColorCode[Entity.SUBCATEGORY],
      text: "SubCategory",
    },
    {
      color: ColorCode[Entity.CAPABILITY],
      text: "Capability",
    },
    {
      color: ColorCode[Entity.QUESTION],
      text: "Question",
    },
  ];

  const prepareSaveData = (checkedNodes: any) => {
    let data: IFocussedModule[] = [];
    for (let i = 0; i < checkedNodes.length; i++) {
      const selectedBranchArr = checkedNodes[i].split("-");
      const catInx = selectedBranchArr.findIndex(
        (b: string) => b === Entity.CATEGORY
      );
      if (catInx > 0) {
        const categoryId = selectedBranchArr[catInx - 1];
        let categoryInxInData = data.findIndex(
          (d) => d.entityId === categoryId
        );
        if (categoryInxInData === -1) {
          data.push({
            entity: "CATEGORY",
            entityId: categoryId,
            children: [],
          });
          categoryInxInData = data.length - 1;
        }
        let subcatInx = selectedBranchArr.findIndex(
          (b: string) => b === Entity.SUBCATEGORY
        );
        if (subcatInx > 0) {
          const subCategoryId = selectedBranchArr[subcatInx - 1];
          let subcatInxInData = data[categoryInxInData].children.findIndex(
            (s) => s.entityId === subCategoryId
          );
          if (subcatInxInData === undefined || subcatInxInData === -1) {
            data[categoryInxInData].children.push({
              entity: "SUBCATEGORY",
              entityId: subCategoryId,
              children: [],
            });
            subcatInxInData =
              (data[categoryInxInData].children.length || 0) - 1;
          }
          const capInx = selectedBranchArr.findIndex(
            (b: string) => b === Entity.CAPABILITY
          );
          if (capInx > 0) {
            const capabilityId = selectedBranchArr[capInx - 1];
            let capInxInData = data[categoryInxInData].children[
              subcatInxInData
            ].children.findIndex((s: any) => s.entityId === capabilityId);
            if (capInxInData === undefined || capInxInData === -1) {
              data[categoryInxInData].children[subcatInxInData].children.push({
                entity: "CAPABILITY",
                entityId: capabilityId,
                children: [],
              });
              capInxInData =
                (data[categoryInxInData].children[subcatInxInData].children
                  .length || 0) - 1;
            }
            const quesInx = selectedBranchArr.findIndex(
              (b: string) => b === Entity.QUESTION
            );
            if (quesInx > 0) {
              const questionId = selectedBranchArr[quesInx - 1];
              const quesInxInData = data[categoryInxInData].children[
                subcatInxInData
              ].children[capInxInData].children.findIndex(
                (s: any) => s.entityId === questionId
              );
              if (quesInxInData === undefined || quesInxInData === -1) {
                data[categoryInxInData].children[subcatInxInData].children[
                  capInxInData
                ].children.push({
                  entity: "QUESTION",
                  entityId: questionId,
                  children: [],
                });
              }
            }
          }
        }
      }
    }
    return data;
  };

  const onCheck = (checkedItems: string[]) => {
    const existingCheckedItems = checkedKeys.slice();
    checkedItems = checkedItems.filter((t) => t.includes(Entity.QUESTION));
    const questionsInView: string[] = [];
    treeData[0].children.map((cat: any) =>
      cat.children.map((subcat: any) =>
        subcat.children.map((cap: any) =>
          cap.children.map((ques: any) => questionsInView.push(ques.id))
        )
      )
    );
    const checkedItemsNotInView = existingCheckedItems.filter((c) => {
      const inx = questionsInView.findIndex((q) => c.includes(q));
      return inx === -1;
    });
    setCheckedKeys(checkedItems.concat(checkedItemsNotInView));
  };

  const handleExpandedKeys = (xpandedKeys: string[]) => {
    setExpandedKeys(xpandedKeys);
  };

  const handleSave = async () => {
    const focusedModules = prepareSaveData(checkedKeys);
    Loader.showLoader();
    await meetingService.saveFocusedModule({
      meetingDetailId,
      focusedModules,
      expertId,
    });
    Loader.hideLoader();
    onClose();
  };

  const addCapabilitiesSelByCandidate = (cap: any) => {
    let output = true;
    if (filterVal) {
      output = cap.capabilityText
        .toLowerCase()
        .includes(filterVal?.toLowerCase());
    }
    if (showCheckedOnly) {
      output = output && checkedKeys.some((c) => c.includes(cap.capabilityId));
    }
    return output;
  };

  const addQuestionsSelectedBefore = (ques: any) => {
    let output = true;
    if (filterVal) {
      output = ques.title.toLowerCase().includes(filterVal?.toLowerCase());
    }
    if (showCheckedOnly) {
      output = output && checkedKeys.some((c) => c.includes(ques.questionId));
    }
    return output;
  };

  const setTree = useCallback(
    (currentTrack: CandidateTrackTree) => {
      if (currentTrack) {
        const categories = currentTrack.categories;
        const trackName = "All Categories";
        const tree = [];
        const xpandedKeys: string[] = [];
        const filteredCats =
          filterVal || showCheckedOnly
            ? initialModulesFromCandidate
              ? categories.filter((cat) =>
                  cat.subCategories.some((subcat) =>
                    subcat.capabilities.some(addCapabilitiesSelByCandidate)
                  )
                )
              : categories.filter((cat) =>
                  cat.subCategories.some((subcat) =>
                    subcat.capabilities.some((cap: any) =>
                      cap.questions.some(addQuestionsSelectedBefore)
                    )
                  )
                )
            : categories;
        const categoryTree = filteredCats.map((cat: any) => {
          const subcats = cat.subCategories;
          const filteredSubcats =
            filterVal || showCheckedOnly
              ? initialModulesFromCandidate
                ? subcats.filter((subcat: any) =>
                    subcat.capabilities.some(addCapabilitiesSelByCandidate)
                  )
                : subcats.filter((subcat: any) =>
                    subcat.capabilities.some((cap: any) =>
                      cap.questions.some(addQuestionsSelectedBefore)
                    )
                  )
              : subcats;
          const categories = filteredSubcats?.map((subcat: any) => {
            const caps = subcat.capabilities;
            const filteredCaps =
              filterVal || showCheckedOnly
                ? initialModulesFromCandidate
                  ? subcat.capabilities.filter(addCapabilitiesSelByCandidate)
                  : subcat.capabilities.filter((cap: any) =>
                      cap.questions.some(addQuestionsSelectedBefore)
                    )
                : caps;
            const subcatkey =
              cat.categoryId +
              "-" +
              Entity.CATEGORY +
              "-" +
              subcat?.subCategoryId +
              "-" +
              Entity.SUBCATEGORY;
            xpandedKeys.push(subcatkey);
            return {
              key: subcatkey,
              id: subcat?.subCategoryId,
              title: makeTreeNode({
                title: subcat.subCategoryName,
                style: {
                  color: ColorCode[Entity.SUBCATEGORY],
                  fontSize: "14px",
                },
              }),
              children: filteredCaps?.map((cap: any) => {
                const quess = cap.questions;
                const filteredQues =
                  filterVal || showCheckedOnly
                    ? quess.filter(addQuestionsSelectedBefore)
                    : quess;
                const capkey =
                  subcatkey + "-" + cap.capabilityId + "-" + Entity.CAPABILITY;
                xpandedKeys.push(capkey);
                return {
                  id: cap.capabilityId,
                  key: capkey,
                  title: makeTreeNode({
                    title: cap.capabilityText,
                    style: {
                      color: ColorCode[Entity.CAPABILITY],
                      fontSize: "12px",
                    },
                  }),
                  children: filteredQues?.map((ques: any) => {
                    const quesKey =
                      capkey + "-" + ques.questionId + "-" + Entity.QUESTION;
                    xpandedKeys.push(quesKey);
                    return {
                      id: ques.questionId,
                      key: quesKey,
                      title: makeTreeNode({
                        title: ques.title,
                        style: {
                          color: ColorCode[Entity.QUESTION],
                          fontSize: "12px",
                        },
                      }),
                    };
                  }),
                };
              }),
            };
          });
          const catkey = cat.categoryId + "-" + Entity.CATEGORY;
          xpandedKeys.push(catkey);
          return {
            key: catkey,
            id: cat.categoryId,
            title: makeTreeNode({
              title: cat.categoryName,
              style: { color: ColorCode[Entity.CATEGORY], fontSize: "16px" },
            }),
            children: categories,
          };
        });
        setExpandedKeys(xpandedKeys);
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
    },
    [trackId, checkedKeys, filterVal, showCheckedOnly]
  );

  useEffect(() => {
    if (currentTrack) {
      setTree(currentTrack);
    }
  }, [currentTrack, setTree]);

  useEffect(() => {
    if (!currentTrack) {
      const getTreeCheckedKeys = (treeData: IFocussedModule[]) => {
        const keys: string[] = [];
        for (let i = 0; i < treeData.length; i++) {
          const cat = treeData[i];
          !cat.children.length && keys.push(cat.entityId + "-" + cat.entity);
          for (let j = 0; j < cat.children.length; j++) {
            const subcat = cat.children[j];
            !subcat.children.length &&
              keys.push(
                cat.entityId +
                  "-" +
                  cat.entity +
                  "-" +
                  subcat.entityId +
                  "-" +
                  subcat.entity
              );
            for (let k = 0; k < subcat.children.length; k++) {
              const cap = subcat.children[k];
              !cap.children.length &&
                keys.push(
                  cat.entityId +
                    "-" +
                    cat.entity +
                    "-" +
                    subcat.entityId +
                    "-" +
                    subcat.entity +
                    "-" +
                    cap.entityId +
                    "-" +
                    cap.entity
                );
              for (let l = 0; l < cap.children.length; l++) {
                const ques = cap.children[l];
                keys.push(
                  cat.entityId +
                    "-" +
                    cat.entity +
                    "-" +
                    subcat.entityId +
                    "-" +
                    subcat.entity +
                    "-" +
                    cap.entityId +
                    "-" +
                    cap.entity +
                    "-" +
                    ques.entityId +
                    "-" +
                    ques.entity
                );
              }
            }
          }
        }
        return keys;
      };

      const evaluationTrackData = async () => {
        if (trackId) {
          setLoading(true);
          const output = await meetingService.getTrackTree({
            trackId,
            expertId,
          });
          setLoading(false);
          setcurrentTrack(output.output);
        }
      };
      const getMeetingFocusedModules = async () => {
        setLoading(true);
        const output = await meetingService.getMeetingFocusedModules({
          expertId,
          meetingDetailId,
        });
        const checkedItems = getTreeCheckedKeys(output.output.focusedModules);
        setCheckedKeys(checkedItems);
        setDefaultQuestions(checkedItems);
        setLoading(false);
      };

      evaluationTrackData();
      getMeetingFocusedModules();
    }
  }, [trackId, currentTrack, expertId, meetingDetailId]);
  return (
    <Row>
      <Col className="module-selection-container">
        {loading && (
          <Spinner
            style={{ height: "1rem", width: "1rem" }}
            animation="border"
          />
        )}
        {useMemo(
          () =>
            currentTrack && (
              <TreeViewComponent
                checkedKeys={
                  initialModulesFromCandidate && showCheckedOnly
                    ? checkedKeys
                    : !initialModulesFromCandidate && !showCheckedOnly
                    ? checkedKeys
                    : []
                }
                filterPlaceholder={"Search Question..."}
                legend={legend}
                checkable={true}
                defaultQuestions={defaultQuestions}
                onCheck={onCheck}
                data={treeData}
                showFilter={true}
                headerClassname={"floating"}
                bodyClassname={"moduleSelectionBody"}
                handleExpandedKeys={handleExpandedKeys}
                onFilterChange={(
                  filterVal?: string,
                  showCheckedOnly?: boolean
                ) => {
                  setFilterVal(filterVal);
                  setShowCheckedOnly(showCheckedOnly);
                  if (!showCheckedOnly) {
                    setInitialModulesFromCandidate(false);
                    setTree(currentTrack);
                  }
                }}
              />
            ),
          [
            treeData,
            checkedKeys,
            legend,
            currentTrack,
            setTree,
            filterVal,
            showCheckedOnly,
          ]
        )}
      </Col>
      <Col xs={12} className="mt-2 pr-0">
        <div className="col-12 d-flex justify-content-end align-items-center">
          <Button
            className="btn-sm mr-2 btn-secondary"
            onClick={() => onClose()}
          >
            {"Cancel"}
          </Button>
          <Button className="btn-sm" onClick={handleSave}>
            {"Add"}
          </Button>
        </div>
      </Col>
    </Row>
  );
};
