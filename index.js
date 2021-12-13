const { Command } = require('commander');
const chalk = require('chalk')
const { listContacts, getContactById, removeContact, addContact } = require('./contact')

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const contacts = await listContacts();
          console.table(contacts)
      break;

    case 'get':
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(chalk.green('Contact found'));
        console.log(contactById);
        return;
      }
      console.log(chalk.yellow('Contact not found'));
      break;

    case 'add':
      const contact = await addContact(name, email, phone)
      console.log(chalk.green('Contact added successfully'));
      break;

    case 'remove':

      const isDeleted = await removeContact(id);
      if (isDeleted) {
        console.log(chalk.green(`Contact deleteted successfully`));
        return;
      }
      console.log(chalk.yellow('Contact not found'));
      break;

    default:
      console.warn(chalk.red('Unknown action type!'));
  }
}

invokeAction(argv);