import styled from "styled-components";

export const NotificationWrapper = styled.div`
    position: fixed;
    top: 65px;
    right: 10px;

    .toast-header {
        color: #fff;
        background: #066E1B;
        font-size: 18px;
        justify-content: space-between;
    }

    button.close {
        color: #fff;
    }
`;