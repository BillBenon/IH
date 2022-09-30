import styled from 'styled-components';

export const Wrapper = styled.div`
    flex-basis: 40%;
    background: #C8D3D4;
    padding: 30px 20px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right: 1px solid;
`;

export const CardWrapper = styled.div`
    background: #ffffff;
    box-shadow: 0px 0px 20px rgba(22, 52, 134, 0.15);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    border-top: 6px solid #638384;
    padding: 10px 20px;
`;

export const JobTitle = styled.div`
    margin-bottom: 16px;
    font-weight: 600;
    text-align: center;
    font-size: 20px;
`;

export const JobNotifications = styled.div`
    display: flex;
    flex-direction: column;
`;

export const NotificationTitle = styled.div`
    color: green;
    font-size: 18px;
`;