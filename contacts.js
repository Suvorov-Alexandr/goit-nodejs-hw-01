const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4 } = require("uuid");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundСontact = contacts.find(({ id }) => id === contactId);
  return foundСontact ? foundСontact : null;
}

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
