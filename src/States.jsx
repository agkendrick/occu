import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { states } from './data';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaRegTrashAlt, FaPencilAlt, FaCopy } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EditModal from './Modals/Edit.jsx';
import CreateModal from './Modals/Create.jsx';

const StateList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
`;

export default function States() {

    const [items, setItems] = useState(states);
    const [searchField, setSearchField] = useState("Name");
    const [searchText, setSearchText] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        search();
    }, [items, searchText]);

    const deleteItem = (stateName) => {
        const newItems = {...items};
        delete newItems[stateName];
        setItems(newItems);

        const newFilterItems = {...filteredItems};
        delete newFilterItems[stateName];
        setFilteredItems(newFilterItems);
    }

    const copyItem = (key, item) => {
        setItems({...items, [`${key}-${Date.now()}`]: {...item, }});
    }

    const updateItem = (key, value) => {
        const itemsCopy = items;
        if (Object.keys(items).includes(editItem.name)) {
            delete itemsCopy[editItem.name];
        } 
        setItems({ ...itemsCopy, [key]: value })
    }

    const search = () => {
        let filtered = {};
        Object.keys(items).forEach(key => {
            const item = items[key];
            const searchContent = searchField == "Name" ? key : item[searchField.toLowerCase()];
            if(searchContent.toLowerCase().includes(searchText.toLowerCase())) {
                filtered = {...filtered, [key]: item };
            }
        });

        return setFilteredItems(filtered);
    }

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Search field</Form.Label>
                <Form.Select onChange={({target: value}) => setSearchField(value.value)}>
                    <option>Name</option>
                    <option>Abbreviation</option>
                    <option>Capital</option>
                    <option>Region</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="text" value={searchText} onChange={({ target: value }) => setSearchText(value.value)} placeholder="Search..." />
            </Form.Group>
        
            <div style={{marginBottom: "2%"}} className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => setShowCreateModal(true)}>
                    Create
                </Button>
            </div>
        
            <StateList>
                { 
                    Object.keys(filteredItems).map((key, index) => { 
                        const {capital, region, abbreviation, timeStamp} = filteredItems[key];
                        return (
                            <Card key={index} style={{ width: '18rem' }}>
                                <Card.Header>{key}</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>Capital:</b> {capital}</ListGroup.Item>
                                    <ListGroup.Item><b>Region:</b> {region}</ListGroup.Item>
                                    <ListGroup.Item><b>Abbreviation:</b> {abbreviation}</ListGroup.Item>
                                    <ListGroup.Item><b>Updated:</b> {timeStamp}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <Button variant="danger" onClick={() => deleteItem(key)}>
                                        <FaRegTrashAlt />
                                    </Button>
                                    <Button variant="secondary" onClick={() => { setEditItem({ ...filteredItems[key], name: key }); setShowEditModal(true); }}>
                                        <FaPencilAlt />
                                    </Button>
                                    <Button variant="secondary" onClick={() => copyItem(key, filteredItems[key])}>
                                        <FaCopy />
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </StateList>

            { showCreateModal && <CreateModal
                existingNames={Object.keys(items)}
                createItem={(key, value) => setItems({...items, [key]: value}) }
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
            /> }

            { showEditModal && <EditModal
                existingNames={Object.keys(items)}
                saveItem={(key, value) => { updateItem(key, value)}}
                editItem={editItem}
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
            /> }
        </>
    )
}