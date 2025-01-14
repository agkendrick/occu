import * as React from 'react'
import styled from 'styled-components'
import { statuses } from './data.js';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const StatusList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
`;

export default function () {
    return (
        <Container style={{ marginTop: "2%" }}>
            <StatusList>
                {statuses.map(({ id, status }, index) => (
                    <Badge style={{ padding: "2%", fontSize: "24px" }} className={getStatusColor(status)} key={index}>
                        <Badge style={{ marginRight: "10px" }} bg="secondary">{id}</Badge>
                        {status}
                    </Badge>
                ))}
            </StatusList>
        </Container>
    )
}

const getStatusColor = (status) => {
    switch (status) {
        case "Pass":
            return "bg-success";
        case "Fail":
            return "bg-danger";
        case "Warn":
            return "bg-warning";
    }
}