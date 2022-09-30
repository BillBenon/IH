import React from "react";
import { MyDeskJob } from "types/Jobs";
import { NotificationsCircle as NotificationIcon } from '@styled-icons/ionicons-solid/NotificationsCircle';
import {
    CardWrapper,
    JobTitle,
    JobNotifications,
    NotificationTitle
} from "./styles";

const NotificationCard = ({ jobId, notifications, title }: MyDeskJob) => {
    return (
        <CardWrapper>
            <JobTitle>
                {title}
            </JobTitle>
            <JobNotifications>
                {notifications.map((notification) => (
                    <div className="d-flex">
                        <NotificationIcon color="#18632F" width={'30px'} />
                        <NotificationTitle>{notification}</NotificationTitle>
                    </div>

                ))}
            </JobNotifications>
        </CardWrapper>
    )
};

export default NotificationCard;