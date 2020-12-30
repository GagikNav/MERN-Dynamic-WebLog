import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import ContactsIcon from '@material-ui/icons/Contacts';
const sideBar = {
  title: 'About',
  //
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [{ title: 'March 2020', url: '#' }],
  //
  social: [
    {
      name: 'GitHub',
      icon: GitHubIcon,
      linkTo: 'https://github.com/GagikNav/MERN-Dynamic-WebLog',
    },
    {
      name: 'WebSite',
      icon: LanguageIcon,
      linkTo: 'https://www.gagik.me',
    },
    {
      name: 'Linkedin',
      icon: LinkedinIcon,
      linkTo: 'https://www.linkedin.com/in/gagik-n/',
    },
    {
      name: 'Contact',
      icon: ContactsIcon,
      linkTo: 'https://www.gagik.me/contact.html/',
    },
  ],
};
export { sideBar };
