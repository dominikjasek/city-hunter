import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
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
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';
import { UserBox } from '~/components/navbar/UserBox';
import { useRouter } from 'next/router';

interface NavbarLink {
  title: string;
  href: string;
}

const drawerWidth = 250;
const navbarLinks: NavbarLink[] = [
  { title: 'Hrát', href: '/play' },
  { title: 'Žebříček', href: '/ranking' },
  { title: 'Zapoj se', href: '/contribute' },
];

const MobileNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

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
        sx={{ backgroundColor: theme.palette.primary.main, cursor: 'pointer' }}
        onClick={() => router.push('/')}
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
          <Link key={item.title} className={'link-no-style'} href={item.href}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ justifyContent: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <UserBox />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    typeof window === undefined ? undefined : () => window.document.body;

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
      <AppBar component="nav" color={'primary'} enableColorOnDark>
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
  const theme = useTheme();

  return (
    <nav>
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
        mx={10}
        py={3}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <Link href={'/'} className="link-no-style">
          <Stack direction={'row'} alignItems={'center'} gap={2}>
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
        <Stack direction={'row'} alignItems={'center'} gap={3}>
          {navbarLinks.map((item) => (
            <Link className={'link-no-style'} key={item.title} href={item.href}>
              <Typography
                sx={{ '&:hover': { color: theme.palette.secondary.main } }}
              >
                {item.title.toUpperCase()}
              </Typography>
            </Link>
          ))}
          <UserBox />
        </Stack>
      </Stack>
    </nav>
  );
};

export const Navbar: React.FC = () => {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  );
};
