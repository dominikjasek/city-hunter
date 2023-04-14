import React, { useState } from 'react';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import LogoWhite from '@public/Logo-white.svg';
import Image from 'next/image';
import { useIsMobile } from '~/hooks/use-is-mobile';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';

interface NavbarLink {
  title: string;
  href: string;
}

const drawerWidth = 250;
const navbarLinks: NavbarLink[] = [
  { title: 'Hrát', href: '/play' },
  { title: 'Žebříček', href: '/ranking' },
];

const MobileNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={2}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Image
          priority
          src={LogoWhite}
          alt="Follow us on Twitter"
          height={42}
          style={{ fill: 'white' }}
        />
        <Typography
          variant="h6"
          fontSize={24}
          sx={{
            py: 2,
            color: 'white',
          }}
        >
          CITY HUNTER
        </Typography>
      </Stack>
      <Divider />
      <List>
        {navbarLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color={'primary'}>
        <Toolbar variant={'dense'}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navbarLinks.map((item) => (
              <Button key={item.title} sx={{ color: '#fff' }}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};

const DesktopNavbar: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <nav>
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
        mx={10}
        py={3}
      >
        <Link href={'/'} className="link-no-style">
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Image
              priority
              src={LogoWhite}
              alt="Follow us on Twitter"
              height={40}
              style={{ fill: 'white' }}
            />
            <Typography fontSize={24}>CITY HUNTER</Typography>
          </Stack>
        </Link>
        <Box>
          <SignedIn>
            <UserButton
              userProfileUrl={'/user'}
              userProfileMode={'navigation'}
            />
          </SignedIn>
          <SignedOut>
            <Button
              color={'secondary'}
              variant={'contained'}
              onClick={() => setLoginDialogOpen(true)}
            >
              Přihlásit se
            </Button>
            <Dialog
              onClose={() => setLoginDialogOpen(false)}
              PaperProps={{
                style: { borderRadius: '1rem' },
              }}
              open={loginDialogOpen}
            >
              <SignIn />
            </Dialog>
          </SignedOut>
        </Box>
      </Stack>
    </nav>
  );
};

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};
