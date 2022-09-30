import React, { useContext } from "react";

import { Accordion, AccordionContext } from 'react-bootstrap';
import { DropdownIcon, DropupIcon } from "../../../containers/Feedback/TabContent/Submissions/SubmissionDetail/SubmissionDetail.styles";

export default function AccordionToggle({ eventKey }: any) {
    const currentEventKey = useContext(AccordionContext);

    return (
        <Accordion.Toggle
            as={currentEventKey === eventKey ? DropupIcon : DropdownIcon}
            variant="link"
            eventKey={eventKey} />
    );
}