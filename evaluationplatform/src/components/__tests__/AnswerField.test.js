import React from 'react';
import { AnswerField } from 'components/Question/QuestionField/AnswerSet/AnswerField';
import { renderWithProviders } from 'utilities/test.js';
import { screen, waitFor } from '@testing-library/dom';
import { fireEvent, waitForElement, render } from '@testing-library/react';

const CONTAINER = 'answerfield-container';
const TEXTAREA = 'answerfield-textarea';
const EDIT_BUTTON = 'answerfield-editbutton';

const apiCallSuccess = jest.fn(() => {
  return new Promise((resolve, reject) => {
    resolve({
      output: {
        questionAnswerId: 'sample questionAnswerId',
        questionId: 'sample questionId',
        answer: 'sample answer',
        questionAnswerId: 'sample questionAnswerId',
        createdAt: new Date().toUTCString(),
      },
    });
  });
});

const apiCallFail = jest.fn(() => {
  return new Promise((resolve, reject) => {
    reject({ error: {} });
  });
});

let isSaved = false;
let isEditing = false;

const setIsSaved = (status) => {
  isSaved = status;
};
const setIsEditing = (status) => {
  isEditing = status;
};

describe('Creating answer', () => {
  beforeEach(() => {
    renderWithProviders(
      <AnswerField
        answer={null}
        isSaved={isSaved}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setIsSaved={setIsSaved}
        saveResponseForQuestionOfCandidateTrack={apiCallSuccess}
      />
    );
  });

  test('Container should be loaded', () => {
    expect(screen.getByTestId(CONTAINER)).toBeInTheDocument();
  });

  test('Edit button should be hidden for the first time', () => {
    expect(screen.queryByTestId(EDIT_BUTTON)).toBeNull();
  });

  test('Textarea should be enabled for the first time', () => {
    expect(screen.getByTestId(TEXTAREA).disabled).toBeFalsy();
  });

  test('Testing blur', () => {
    fireEvent.blur(screen.getByTestId(TEXTAREA));
    expect(screen.getByTestId('answerfield-statustext').textContent).toMatch(/^Saved successfully at/);
  });

  test('Inputing text', () => {
    fireEvent.change(screen.getByTestId(TEXTAREA), { target: { value: 'sample text' } });
    expect(screen.getByTestId('answerfield-statustext').textContent).toMatch(/^Saved successfully at/);
  });
});

describe('Testing status text', () => {
  it('when isSaving is true', () => {
    renderWithProviders(<AnswerField answer={null} isSaved={true} />);
    expect(screen.getByTestId('answerfield-container')).toBeInTheDocument();
    expect(screen.getByTestId('answerfield-statustext').textContent).toMatch(/^Saved successfully at/);
  });
});

describe('Testing status text when error', () => {
  it('when isSaving is true', () => {
    renderWithProviders(
      <AnswerField
        answer={null}
        isSaved={isSaved}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setIsSaved={setIsSaved}
        saveResponseForQuestionOfCandidateTrack={apiCallFail}
      />
    );
    fireEvent.blur(screen.getByTestId(TEXTAREA));
    expect(screen.getByTestId('answerfield-container')).toBeInTheDocument();
    expect(screen.getByTestId('answerfield-statustext').textContent).toMatch(/^Saved successfully at/);
  });
});

describe('Updating answer', () => {
  beforeEach(() => {
    renderWithProviders(
      <AnswerField
        answer={{ answer: 'sample answer' }}
        isSaved={isSaved}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setIsSaved={setIsSaved}
      />
    );
  });

  test('Container should be loaded', () => {
    expect(screen.getByTestId(CONTAINER)).toBeInTheDocument();
  });

  test('Edit button should be shown for the first time', () => {
    expect(screen.getByTestId(EDIT_BUTTON)).toBeInTheDocument();
  });

  test('Textarea should be disabled for the first time', () => {
    expect(screen.getByTestId(TEXTAREA).disabled).toBeTruthy();
  });

  describe('After clicking the edit button', () => {
    // beforeAll(() => {
    //   fireEvent.click(screen.getByTestId(EDIT_BUTTON));
    // });

    // test('Edit button should be hidden', () => {
    //   fireEvent.click(screen.getByTestId(EDIT_BUTTON));
    //   expect(screen.queryByTestId(EDIT_BUTTON)).toBeNull();
    // });

    test('Textarea should be enabled', () => {
      fireEvent.click(screen.getByTestId(EDIT_BUTTON));
      expect(screen.getByTestId(TEXTAREA).disabled).toBeFalsy();
    });
  });
});

// describe('AnswerField component test', () => {
//   // container

//   // edit-button updating shown

//   test('it should have root-div', () => {
//     let { getByTestId, queryByTestId } = renderWithProviders(<AnswerField answer={"asdf"} isSaved={false} isEditing={false}/>);
//     expect(getByTestId('root-div')).toBeInTheDocument();
//     expect(queryByTestId('edit-button')).toBeInTheDocument();
//   });

//   // edit-button updating after click not shown

//   // edit-button while typing not shown

//   // edit-button saved but still editing not shown

//   // edit-button after blur shown

//   // disabled creating not disable

//   // disabled updating disabled

//   // disabled after auto saving, still focused not disabled

//   // disabled after lose focus, disabled

//   // status text creating updating not showing

//   // status text saving when saving

//   // status text timestamp after saved

//   // status text error when error

//   // status text none when writing

//   // snackbar text success when saved successfully

//   // snackbar text fail when save fail

//   // snackbar text none when not reach settimeout time but saved

//   // focus when click edit button

//   // focus when editing

//   // focus lose when blur

//   // it('should occur handle Edit Click', async () => {
//   //   fireEvent.click(getByTestId('edit-button'));
//   //   await expect(getByTestId('modal')).toBeInTheDocument();
//   //   expect(queryByTestId('modal')).toBeNull();
//   // });
// });
