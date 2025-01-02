 import * as React from 'react';
 import Drawer from '@mui/material/Drawer';
 import List from '@mui/material/List';
 import ListItemIcon from '@mui/material/ListItemIcon';
 import ListItemText from '@mui/material/ListItemText';
 import HomeIcon from '@mui/icons-material/Home';
 import PeopleIcon from '@mui/icons-material/People';
 import { useRouter } from 'next/router';
 import ListItemLink from './ListItemLink';
 import ListItem from '@mui/material/ListItem';
 import Collapse from '@mui/material/Collapse';
 import ExpandLess from '@mui/icons-material/ExpandLess';
 import ExpandMore from '@mui/icons-material/ExpandMore';
 import AddIcon from '@mui/icons-material/Add';

 const drawerWidth = 240;

 const Sidebar: React.FC = () => {
  const router = useRouter();
  const [openUsersSubMenu, setOpenUsersSubMenu] = React.useState(false);

  const handleClickUsersSubMenu = () => {
  setOpenUsersSubMenu(!openUsersSubMenu);
  };

  return (
  <Drawer
  variant="permanent"
  sx={{
  width: drawerWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
  }}
  >
  <List>
  <ListItemLink href="/" selected={router.pathname === '/'}>
  <ListItemIcon>
  <HomeIcon />
  </ListItemIcon>
  <ListItemText primary="Home" />
  </ListItemLink>
  <ListItem component="button" onClick={handleClickUsersSubMenu}>
  <ListItemIcon>
  <PeopleIcon />
  </ListItemIcon>
  <ListItemText primary="Usuários" />
  {openUsersSubMenu ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={openUsersSubMenu} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
  <ListItemLink href="/users/new" selected={router.pathname === '/users/new'} sx={{ pl: 4 }}>
  <ListItemIcon>
  <AddIcon />
  </ListItemIcon>
  <ListItemText primary="Novo Usuário" />
  </ListItemLink>
  <ListItemLink href="/users" selected={router.pathname === '/users'} sx={{ pl: 4 }}>
  <ListItemIcon>
  <PeopleIcon />
  </ListItemIcon>
  <ListItemText primary="Usuários" />
  </ListItemLink>
  </List>
  </Collapse>
  </List>
  </Drawer>
  );
 };

 export default Sidebar;
