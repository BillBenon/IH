import React, { Fragment } from 'react';
import QuestionComponent from '../Components/QuestionComponent';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import question2 from '../assets/faang/question2-uniuqe-BST.svg';
import question3 from '../assets/faang/question3-uniuqe-BST.svg';

let styles = (theme) => {

    return {
        text: {
            fontFamily: 'Poppins',
            color: '#000000',
            paddingTop: 20
        },
        subtext: {
            paddingTop: 25,
            color: '#989898',
            fontFamily: 'Poppins',
            fontSize: 17
        }
    }
}

const data = [{
    question_title: "Question 1",
    question: "<p>A sentence S is given, composed of words separated by spaces. Each word consists of lowercase and uppercase letters only.<p/><p>We would like to convert the sentence to \"Goat Latin\" (a made-up language similar to Pig Latin.)</p><p>The rules of Goat Latin are as follows:</p>",
    description: "If a word begins with a vowel (a, e, i, o, or u), append \"ma\" to the end of the word. For example, the word 'apple' becomes 'applema'.<p>If a word begins with a consonant (i.e. not a vowel), remove the first letter and append it to the end, then add \"ma\".</p><p>For example, the word \"goat\" becomes \"oatgma\".</p><p>Add one letter \"a\" to the end of each word per its word index in the sentence, starting with 1.</p><p>For example, the first word gets \"a\" added to the end, the second word gets \"aa\" added to the end and so on.</p><p>Return the final sentence representing the conversion from S to Goat Latin.</p><p>Example 1: </p><p>Input: \"I speak Goat Latin\"</p> Output: \"Imaa peaksmaaa oatGmaaaa atinLmaaaaa\"</p><p>Example 2: </p><p>Input: \"The quick brown fox jumped over the lazy dog\"</p> <p>Output: \"heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa\"</p><p>Notes:</p><p>S contains only uppercase, lowercase and spaces. Exactly one space between each word.</p><p> 1 <= S.length <= 150.</p>",
}, {
    question_title: "Question 2",
    question: "Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?",
    description: "<p>Example:</p> <p>Input: 3</p> <p>Output: 5</p> <p>Explanation:</p> <p>Given n = 3, there are a total of 5 unique BST's:</p>",
    imageURL: question2
}, {
    question_title: "Question 3",
    question: "Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1 ... n.",
    description: "Example:",
    imageURL: question3
}
];

function FAANGHeader({ classes, icon, text, subtext }) {
    return (
        <Fragment>
            <h2 className="interview-heading">Questions Asked in FAANG Interviews</h2>
            <h4 className="interview-description"><span>Questions Asked in FAANG (Facebook, Amazon, Apple, Netflix, Google)</span>
                <span>interviews (from Easy to Hard). Solve and see where you stand by answering.</span><span>following three questions. Answers will be released every Friday via Slack</span></h4>
            <Button
                variant="contained"
                className={classes.button + ' btnRegisterInterview'}
                href="https://join.slack.com/t/interviewhelpiogroup/shared_invite/zt-dcrkvyuv-g8sY1HxexCvHU9Xbi~PUUw"
            >
                View Answers
        </Button>

            <QuestionComponent data={data} />
        </Fragment>
    )
}

export default withStyles(styles)(FAANGHeader);
