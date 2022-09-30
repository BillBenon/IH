import {
    ColDef, ColGroupDef, ColumnApi, GridApi, GridReadyEvent
} from "ag-grid-community";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { evaluationPlatformService } from 'services/evaluationPlatform';
import styled from 'styled-components';
import { ITODOLIST } from 'types';
import { Candidate_Id } from 'utilities/constants';

const GridContiner = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    .toolbar {
        flex: 2;
    }
`;

export const TrackPlan = () => {
    const gridApi = useRef();
    let columnApi: ColumnApi;
    const candidateTrackId = getValueBrowserStorage('candidateTrackId');
    const candidateId = getValueBrowserStorage(Candidate_Id);
    const [rowData, setRowData] = useState<any>([]);

    const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
        { headerName: "Sequence", field: 'sequence', editable: true, resizable: true },// rowGroup: true, hide: true, enableRowGroup: true
        { headerName: "Task", field: 'task', editable: true, resizable: true },
        { headerName: "Status", field: 'status', editable: true, resizable: true },
        { headerName: "Remarks(If any)", field: 'remarks', editable: true, resizable: true },
    ])

    const getTodoList = async (candidateTrackId: string) => {
        const input: ITODOLIST = {
            candidateTrackId,
            toDoListType: "CANDIDATE_TO_DO_LIST"
        }
        try {
            const output = await evaluationPlatformService.getToDoList(input);
            setRowData(output.output.candidateToDoList);
        } catch (e: any) {
            console.log('no todo list found for the candidate')
        }

    }

    const addRow = () => {
        if (gridApi?.current) {
            const gridData = (gridApi?.current as any)?.getRenderedNodes();
            (gridApi?.current as any)?.applyTransaction({
                add: [{ sequence: gridData.length + 1 }]
            });
        }
    }

    const removeRow = () => {
        if (gridApi) {
            const gridData = (gridApi?.current as any)?.getRenderedNodes();
            const selectedNotes = getSelectedRowData();
            if (selectedNotes) {
                (gridApi?.current as any)?.applyTransaction({
                    remove: selectedNotes
                });
            }
        }
    }

    const getSelectedRowData = () => {
        if (gridApi) {
            let selectedNodes = (gridApi?.current as any)?.getSelectedNodes();
            let selectedData = selectedNodes.map((node: any) => node.data);
            return selectedData;
        }
    };

    const renderTable = useMemo(() => {
        const onGridReady = (params: GridReadyEvent) => {
            if (gridApi)
                gridApi.current = params.api as any;
            columnApi = params.columnApi;
            params.api.sizeColumnsToFit();
        };
        return <AgGridReact
            headerHeight={40}
            rowHeight={40}
            onGridReady={onGridReady}
            rowData={rowData}
            rowGroupPanelShow='always'
            rowSelection="multiple"
            columnDefs={columnDefs}>
        </AgGridReact>
    }, [rowData, columnDefs])

    const saveData = async () => {
        if (candidateTrackId && gridApi && candidateId) {
            const gridData = (gridApi?.current as any)?.getRenderedNodes();
            const input = {
                candidateTrackId,
                updatedBy: "CANDIDATE",
                updateById: candidateId,
                data: gridData.map((d: any) => d.data),
                toDoListType: "CANDIDATE_TO_DO_LIST",
            }
            await evaluationPlatformService.setToDoList(input);
        }
    }

    useEffect(() => {
        if (candidateTrackId) {
            getTodoList(candidateTrackId);
        }
    }, [candidateTrackId])

    return (
        <GridContiner className="ag-theme-alpine">
            <Col xs={12} className="toolbar py-2 d-flex justify-content-end">
                <Button variant="success" onClick={addRow}>{'+ Add'}</Button>
                <Button variant="danger" className="ml-2" onClick={removeRow}>{'- Remove'}</Button>
                <Button variant="primary" className="ml-2" onClick={saveData}>{'Save'}</Button>
            </Col>
            <Col xs={12}>
                {renderTable}
            </Col>
        </GridContiner>
    )
}
