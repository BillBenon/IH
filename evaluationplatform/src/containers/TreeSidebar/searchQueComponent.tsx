import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'store';
import { StyledInput } from '../../components/Common/TextField'
import { IHandleNavigationMetadata, ISearchQuestionMetadata } from 'types';
import { saveCandidateLastActivity, setCurrentAnsVersionId } from 'store/evaluationPlatform';
import { highlight } from 'utilities/helperFunctions';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import { StyledCheckBox } from 'components/Common/StyledCheckBox';

const StyledSearchComponent = styled.div`
    position: fixed;
    display: none;
    border-radius: 8px;
    background: white;
    border: 2px solid black;
    backdrop-filter: saturate(180%) blur(4px);
    overflow: hidden;
    width: calc(100vw - 40vw);
    transition: opacity 1s;
    text-align: left;
    z-index: 999;
    padding: 20px;
    input{
        margin-bottom: 10px;
        height: 40px;
    }
    .questionInfo{
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        margin-top:10px;
    }
    .answer{
        font-size: 12px;
        :hover {
            text-decoration: underline;
            cursor: pointer;
        }
        p {
            margin-top: 7px;
        }
    }
    .answerWrapper {
        max-height: 40px;
    }
    .additionalInfo{
        font-size: 10px;
    }
    mark{
        background: transparent;
        color: #5b94e3;
        padding: 0;
    }
    .question{
        margin-left: 5px;
    }
    .question,.additionalInfo{
        :hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .searchComponent{
        height: auto;
        min-height:calc(100vh - 75vh);
        max-height: calc(100vh - 50vh);
        overflow-y: auto;
        padding-left: 10px;
        padding-left: 10px;
        padding-right: 10px;
        .questionTitle{
            span{
                margin-right: 5px;
            }
            :last-child {
                margin-bottom: 20px;
            }    
            font-weight: 400;
            font-size: 16px;
            width: 60%;
        }

        ::-webkit-scrollbar {
            width: 8px;
        }
    
        /* Track */
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey; 
            border-radius: 10px;
        }
    
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: grey; 
            border-radius: 10px;
            cursor: pointer !important;
        }
    
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #b8b4b4; 
        }
    }
    .closeBtn{
        cursor: pointer;
        position: absolute;
        top: 2px;
        right: 2px;
    }
`;

interface Iprops {
    toggleQueSearch: Function;
    setCapability: Function;
    setQuestionId: Function;
    setCurrentAnsVersionId: Function;
}

export default (props: Iprops) => {
    const capabilities = useSelector((state: RootState) => state.evaluationPlatform?.currentTrack?.candidateTrack[0]?.capabilities)
    const [isAnswerOnly, setIsAnswerOnly] = useState<boolean>(false);
    const [allQuestions] = useState(capabilities.reduce((acc: Array<any>, cv: any) => {
        let commonData = {
            category: cv.category,
            subCategory: cv.subCategory,
            capabilityName: cv.capabilityName,
            capabilityId: cv.capabilityId,
        }
        let temp: any = []

        cv.questions.forEach((ques: any) => {
            temp.push({
                question: ques.question,
                answers: ques.answers,
                ...commonData
            })
        })

        return [...acc, ...temp]
    }, []))
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredRes, setFilteredRes] = useState([])
    const dispatch = useDispatch();
    const inputRef = useRef<any>(null)

    useEffect(() => {
        inputRef.current?.focus()
        const tog = (e: any) => (e.keyCode === 27) && props.toggleQueSearch()
        document.addEventListener('keydown', tog)
        return () => document.removeEventListener('keydown', tog)
    }, [])// eslint-disable-line

    const searchInString = (str: string, filterTex: string) => str?.toLowerCase().includes(filterTex?.toLowerCase())
    const mark = (text: string) => (searchTerm && searchInString(text, searchTerm)) ? highlight(text, searchTerm) : text

    const handleChange = (e: any) => {
        let _searchTerm = e.target.value
        setSearchTerm(_searchTerm)
        setFilteredRes(allQuestions.filter((questionInfo: ISearchQuestionMetadata) => {
            return searchInString(questionInfo.capabilityName, _searchTerm) ||
                searchInString(questionInfo.category, _searchTerm) ||
                searchInString(questionInfo.subCategory, _searchTerm) ||
                searchInString(questionInfo.question.title, _searchTerm) ||
                searchInString(questionInfo.answers.map(ans => ans.answer?.answer).join(), _searchTerm)
        }))
    }
    const handleNavigation = (e: any, questionInfo: IHandleNavigationMetadata, questionTitle = false) => {
        e.preventDefault();
        props.setCapability(questionInfo?.capabilityId)
        if (questionTitle) {
            props.setQuestionId(questionInfo.question._id)
        }
        if (questionInfo.answer) props.setCurrentAnsVersionId({ currentAnsVersionId: questionInfo.answer._id });
        dispatch(saveCandidateLastActivity({
            selectedCapabilityId: questionInfo?.capabilityId,
            currentQuestionId: questionTitle ? questionInfo.question._id : '',
            currentAnsVersionId: questionInfo?.answer?._id || ""
        }))
        props.toggleQueSearch()
    }
    return <StyledSearchComponent>
        <StyledInput
            ref={inputRef}
            placeholder={'Search for Question/Capability/Category/SubCategory'}
            onChange={handleChange}
        />
        <CloseOutline
            className='closeBtn'
            title='Close Search'
            width='2%'
            onClick={props.toggleQueSearch as any}
        />
        <StyledCheckBox
            className="mx-1"
            name="visible"
            type="checkbox"
            label={"Answer Only"}
            inline={true}
            checked={isAnswerOnly}
            onChange={() => setIsAnswerOnly(!isAnswerOnly)}
        />
        <div className='searchComponent'>
            {(searchTerm ? filteredRes : allQuestions).map((questionfo: ISearchQuestionMetadata, idx: number) => {
                return (questionfo.answers?.length || !isAnswerOnly) ? <span className={'questionInfo'} key={`${questionfo.question._id}_${idx}`}>
                    <div className={!isAnswerOnly ? 'questionTitle' : ''}>
                        {!isAnswerOnly && <>
                            <span>{idx + 1}.</span>
                            <span
                                className={'question'}
                                onClick={(e) => handleNavigation(e, questionfo, true)}
                                dangerouslySetInnerHTML={{ __html: mark(questionfo.question.title) }}></span>
                        </>}
                        <div className="mt-2">
                            {questionfo.answers?.map((ans, inx) => {
                                const info: IHandleNavigationMetadata = { ...questionfo, answer: ans.answer };
                                return <div className="d-flex answerWrapper">
                                    <code>{'Ans.V' + (inx + 1) + ':'}</code>
                                    <span
                                        className={'answer d-flex align-items-center justify-content-between ml-2 overflow-hidden'}
                                        onClick={(e) => handleNavigation(e, info, !!questionfo.question)}
                                        dangerouslySetInnerHTML={{ __html: mark(ans.answer.answer) }}>
                                    </span>
                                </div>
                            })}
                        </div>
                    </div>
                    <div
                        className={'additionalInfo'}
                        onClick={(e) => handleNavigation(e, questionfo, false)}
                        dangerouslySetInnerHTML={{ __html: mark(`${questionfo.category} : ${questionfo.subCategory} : ${questionfo.capabilityName}`) }}>
                    </div>
                </span> : <></>
            }
            )}
        </div>
    </StyledSearchComponent>
}