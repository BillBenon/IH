import { yupResolver } from "@hookform/resolvers/yup";
import { EditAlt } from "@styled-icons/boxicons-solid/EditAlt";
import { AddButton } from "components/AddButton";
import { AdvancedForm } from "components/AdvancedComponents/AdvancedForm";
import { EllipsedSpan } from "components/CommonStyles";
import { DisableButton } from "components/DisableButton";
import { Heading2 } from "components/Heading2";
import { ModalComponent } from "components/Modal";
import { SearchButton } from "components/SearchButton";
import { TableStyles } from "components/TableStyles";
import { DataTable } from "containers/Common/DataTable";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { TrackVideo } from "types";
import { TrackVideoTypesArr } from "utils/constants";
import { defaultTrackVideoInfo } from "utils/defaults";
import {
    videoInfoLocalization,
    videoInfoPlaceholder,
    videoInfoSize,
    videoInfoType,
    videoSchema,
} from "./TrackVideoHelper";
import { useAddOrEditTrack } from "../../features/addOrEditTrack/useAddOrEditTrack";
import { Close } from "@styled-icons/remix-fill/Close";
import { IconContainer } from "../../components/IconContainer";

export type VideoComponentProps = {
    handleRemoveVideo: Function;
    handleAddVideo: Function;
    handleReplaceVideo: Function;
    trackVideos: TrackVideo[];
};

export const TrackVideoComponent = ({
    handleRemoveVideo,
    trackVideos,
    handleAddVideo,
    handleReplaceVideo,
}: VideoComponentProps) => {
    const { track, loading } = useAddOrEditTrack();
    const [trackVideo, setTrackVideo] = useState<TrackVideo>(
        defaultTrackVideoInfo
    );
    const [showTrackVideoPopUp, setShowTrackVideoPopUp] = useState<boolean>(
        false
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editingIdx, setEditingIdx] = useState(0);
    const methods = useForm<TrackVideo>({
        resolver: yupResolver(videoSchema),
        defaultValues: trackVideo,
        mode: "onChange",
        shouldFocusError: true,
    });

    const { errors, getValues } = methods;

    const columns = [
        {
            Header: "Title",
            accessor: "title",
            Cell: function cell(data: any) {
                return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
            },
            style: {
                width: "15%",
            },
        },
        {
            Header: "Description",
            accessor: "description",
            Cell: function cell(data: any) {
                return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
            },
            style: {
                width: "25%",
            },
        },
        {
            Header: "Video Url",
            accessor: "url",
            Cell: function cell(data: any) {
                return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
            },
            style: {
                width: "30%",
            },
        },
        {
            Header: "Type",
            accessor: "type",
            Cell: function cell(data: any) {
                return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
            },
            style: {
                width: "20%",
            },
        },
        {
            Header: "Actions",
            accessor: "",
            Cell: (data: any) => {
                return (
                    <div className="d-flex align-items-center justify-content-start">
                        <IconContainer
                            icon={EditAlt}
                            onClick={() => handleRowClick(data.row.original)}
                        />
                        <IconContainer
                            color={"#dc3545"}
                            icon={Close}
                            onClick={() => onDeleteVideo(data.row.original)}
                        />
                    </div>
                );
            },
            style: {
                width: "10%",
            },
        },
    ];

    const onDeleteVideo = (data: any) => {
        const inx = trackVideos?.findIndex((e) => e === data);
        handleRemoveVideo(inx);
    };

    const onSaveTrackVideo = () => {
        if (Object.keys(errors).length) return;
        const info = getValues();
        if (isEditing) {
            handleReplaceVideo(editingIdx, info);
        } else {
            handleAddVideo(info);
        }
        setShowTrackVideoPopUp(false);
    };

    const handleRowClick = (data?: any) => {
        const inx = trackVideos?.findIndex((e) => e === data);
        if (trackVideos && trackVideos.length && inx != -1) {
            setIsEditing(true);
            setEditingIdx(inx);
            setTrackVideo(trackVideos[inx]);
        } else {
            setIsEditing(false);
            setTrackVideo(defaultTrackVideoInfo);
        }
        setShowTrackVideoPopUp(true);
    };

    useEffect(() => {
        if (track.videos && track.videos.length) {
            setShowTrackVideoPopUp(false);
        }
    }, [track.videos]);

    return (
        <>
            <ModalComponent
                show={showTrackVideoPopUp}
                handleClose={() => setShowTrackVideoPopUp(false)}
                showCloseIcon={true}
                header={"Video Information"}
                isStatic={true}
                footer={
                    <Row>
                        <Col className="p-0">
                            <DisableButton
                                style={{ marginRight: ".5rem" }}
                                type="button"
                                onClick={() => setShowTrackVideoPopUp(false)}
                            >
                                {"Cancel"}
                            </DisableButton>
                        </Col>
                        <Col className="p-0">
                            <AddButton
                                style={{ marginRight: ".5rem" }}
                                type="button"
                                onClick={() => onSaveTrackVideo()}
                            >
                                {"Save"}
                            </AddButton>
                        </Col>
                    </Row>
                }
            >
                <FormProvider {...methods}>
                    <Form>
                        <Col>
                            <AdvancedForm
                                hideFooter={true}
                                defaultValue={trackVideo || {}}
                                type={videoInfoType}
                                localization={videoInfoLocalization}
                                fieldsize={videoInfoSize}
                                placeholder={videoInfoPlaceholder}
                                options={{ type: TrackVideoTypesArr || [] }}
                            ></AdvancedForm>
                        </Col>
                    </Form>
                </FormProvider>
            </ModalComponent>
            <hr />
            <Col className="d-flex align-items-center justify-content-end w-100">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Heading2>{"Videos Information"}</Heading2>
                    <SearchButton
                        style={{ marginRight: ".5rem" }}
                        type="button"
                        onClick={() => handleRowClick()}
                    >
                        {"+ Add Video"}
                    </SearchButton>
                </div>
            </Col>
            <br />
            {!!trackVideos && !!trackVideos.length && (
                <TableStyles>
                    <DataTable
                        columns={columns}
                        data={trackVideos}
                        loading={loading}
                        idKey="url"
                        hiddenColumns={[]}
                    />
                </TableStyles>
            )}
        </>
    );
};
