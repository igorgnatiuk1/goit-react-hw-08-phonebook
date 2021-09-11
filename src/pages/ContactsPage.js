import { useState } from 'react';

import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import ContactList from '../components/ContactList';
import Filter from '../components/Filter';
import Form from '../components/Form';
import Modal from '../components/Modal';
import {
    useGetContactsQuery,
    useDeleteContactMutation,
} from '../redux/phonebookApi';



export default function ContactsPage() {
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { data: contacts } = useGetContactsQuery();
    const [deleteContact] = useDeleteContactMutation();

    const handleFilterOnChange = e => {
        setFilter(e.target.value);
    };

    const getFilteredContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
        return filteredContacts;
    };

    const toggleModal = () => {
        setShowModal(prev => !prev);
    };

    return (
        <>
            <div >
                <Filter filterValue={filter} onChange={handleFilterOnChange} />

                <div >
                    <IconButton edge="start" aria-label="delete" onClick={toggleModal}>
                        <Tooltip title="Add new Contact" aria-label="add">
                            <AddIcon color="secondary" fontSize="large" />
                        </Tooltip>
                    </IconButton>
                </div>
            </div>

            {contacts && (
                <ContactList
                    contacts={getFilteredContacts()}
                    onDelete={deleteContact}
                />
            )}

            {showModal && (
                <Modal onCloseModal={toggleModal}>
                    <Form onCloseModal={toggleModal} />
                </Modal>
            )}
        </>
    );
}