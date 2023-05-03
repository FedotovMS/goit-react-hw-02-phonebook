import React, { Component } from 'react';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  nameInputId = nanoid();

  handleInput = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const existingContact = this.state.contacts.find(
      contact => contact.name === this.state.name
    );

    if (existingContact) {
      alert(`${this.state.name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={this.nameInputId}>
            Input name
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleInput}
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              id={this.nameInputId}
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              value={this.state.number}
              onChange={this.handleInput}
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
        <h2>Contacts</h2>
        {contacts.length > 0 && (
          <>
            <input
              type="text"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
              placeholder="Search contacts"
            />
            <ul>
              {filteredContacts.map(contact => (
                <li key={contact.id}>
                  {contact.name}: {contact.number}
                  <button onClick={() => this.handleDelete(contact.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import ContactForm from './ContactForm';
// import ContactList from './ContactList';
// import Filter from './Filter';
// import { nanoid } from 'nanoid';

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   addContact = (name, number) => {
//     const existingContact = this.state.contacts.find(
//       contact => contact.name === name
//     );

//     if (existingContact) {
//       alert(`${name} is already in contacts!`);
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />
//         <h2>Contacts</h2>
//         {filteredContacts.length > 0 && (
//           <Filter value={filter} onChange={this.changeFilter} />
//         )}
//         <ContactList
//           contacts={filteredContacts}
//           onDelete={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

// export default App;
