import styled from "styled-components";

export const ModalFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 18px;

    input {
        width: 100%;
    }
`;

export const Label = styled.div`
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 20px;

    .required {
      color: red;
    }
`;

export const Title = styled.div`
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 30px;
    text-align: center;
`;

export const FieldSet = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SubmitProfile = styled.div`
    display: flex;
    justify-content: center;
    button {
        width: 45%;
        font-size: 16px;
    }
`;