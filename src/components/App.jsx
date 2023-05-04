// import React, { Component } from 'react';
// import ContactForm from './ContactForm';
// import { nanoid } from 'nanoid';

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   handleFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   handleDelete = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   formSubmitHandler = data => {
//     console.log(data.name);
//     const existingContact = this.state.contacts.find(
//       contact => contact.name === data.name
//     );

//     if (existingContact) {
//       alert(`${this.data.name} is already in contacts!`);
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name: data.name,
//       number: data.number,
//     };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//       name: '',
//       number: '',
//     }));
//   };
//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.formSubmitHandler} />
//         <h2>Contacts</h2>
//         {contacts.length > 0 && (
//           <>
//             <input
//               type="text"
//               name="filter"
//               value={filter}
//               onChange={this.handleFilter}
//               placeholder="Search contacts"
//             />
//             <ul>
//               {filteredContacts.map(contact => (
//                 <li key={contact.id}>
//                   {contact.name}: {contact.number}
//                   <button onClick={() => this.handleDelete(contact.id)}>
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  formSubmitHandler = data => {
    console.log(data.name);
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${data.name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
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
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        {/* {filteredContacts.length > 0 && ( */}
        <>
          <Filter filter={filter} onSearch={this.handleFilter} />
          <ContactList
            contacts={filteredContacts}
            onDelete={this.handleDelete}
          />
        </>
        {/* )} */}
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
export default App;
