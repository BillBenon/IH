import { RootState } from 'app/rootReducer';
import { FilterInput } from 'components/FilterInput';
import { SearchButton } from 'components/SearchButton';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { LastModifiedDates } from 'utils/constants';

type FilterRequestsType = {
    lastModified: string
}

const filterRequest: FilterRequestsType = {
    lastModified: ""
}

const EmailStatusFilter = () => {
    const {
        handleSubmit,
        register,
    } = useForm<FilterRequestsType>({ defaultValues: filterRequest });

    const expertId = useSelector((state: RootState) => state.tools);

    const handleStatusFilter = (data: any) => {
        console.log(data);
    }

    return (
        <Form onSubmit={handleSubmit(handleStatusFilter)}>
            <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
                <Col className="mr-0 pr-0" md={3} lg={3} sm={5}>
                    <FilterInput
                        ref={register}
                        name="updatedDateFrom"
                        as="select"
                        placeholder="Last Modified">
                        <option value={''}>{'Last Modified'}</option>
                        {LastModifiedDates?.map((data: any) => (
                            <option key={data.id} value={data.id}>
                                {data.name}
                            </option>
                        ))}
                    </FilterInput>
                </Col>
                <Col md={2} lg={2} sm={2}>
                    <SearchButton
                        disabled={expertId.loading}
                        type="submit"
                        style={{ width: '90px' }}>
                        {'Search'}
                    </SearchButton>
                </Col>
            </Row>
        </Form>
    )
}

export default EmailStatusFilter;