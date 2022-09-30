import styled from 'styled-components';

export const Wrapper = styled.div`
    flex-basis: 60%;
    background: #F3E2DD;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 30px 40px;
`;

export const CardWrapper = styled.div`
    border-radius: 10px;
    padding: 30px 40px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    align-items: center;
    font-weight: 600;
`;

export const CardTitle = styled.div`
    font-size: 22px;
    margin-bottom: 25px;
`;

export const Count = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    border-radius: 50%;
    background: steelblue;
    color: #ffffff;
    width: 50px;
    height: 50px;
`;