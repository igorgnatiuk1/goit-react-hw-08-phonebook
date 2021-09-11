import { useState } from 'react';
import {
    useGetContactsQuery,
    useAddContactMutation,
} from '../redux/phonebookApi';



export default function Form({ onCloseModal }) {
    const [contactName, setContactName] = useState('');
    const [number, setNumber] = useState('');
    const { data: contacts } = useGetContactsQuery();
    const [addContact] = useAddContactMutation();

    const handleInputChange = event => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case 'name':
                setContactName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (contacts) {
            const isExistedName = contacts.find(
                contact => contact.name.toLowerCase() === contactName.toLowerCase(),
            );

            if (isExistedName) {
                alert(contactName + ' is already in your contacts');
                return;
            }

            addContact({ name: contactName, number });
        }
        reset();
        onCloseModal();
    };

    const reset = () => {
        setContactName('');
        setNumber('');
    };

    return (
        <form  autoComplete="off" onSubmit={handleSubmit}>
            <label>
                Name
                <input

                    type="text"
                    name="name"
                    value={contactName}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label >
                Phone Number
                <input

                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    onChange={handleInputChange}
                    required
                />
            </label>
            <button  type="submit">
                Add Contact
            </button>
        </form>
    );
}