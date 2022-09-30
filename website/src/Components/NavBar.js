import React from "react";
import clsx from "clsx";
import { Grid, Container, Button, Menu } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import Logo from "../assets/logo/logo.svg";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import WorkIcon from "@material-ui/icons/Work";
import ShopIcon from "@material-ui/icons/Shop";
import { useHistory } from "react-router-dom";
import { MenuItem, Grow, Paper, Popper, MenuList } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import GroupWork from "@material-ui/icons/GroupWork";
import Facebook from "@material-ui/icons/Facebook";
import LoginModal from "./LoginModal";
import { hasChildren } from "../utils/helper";
import Link from "@material-ui/core/Link";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E3EDFF",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },

  title: {
    paddingLeft: "32px",
    color: "#000000",
    textDecoration: "none",
    fontSize: "1rem",
    "&:hover": {
      color: "#315CD5",
      cursor: "pointer"
    },
  },
  subMenuItem: {
    padding: "15px",
    color: "#000000",
    textDecoration: "none",
    fontSize: "1rem",
    "&:hover": {
      color: "#315CD5",
    },
    lineHeight: "13px",
  },

  title2Wrapper: {
    border: "1.5px solid black",
    padding: "2px 6px",
    display: "flex",
    justifyContent: "space-between",
    marginRight: "10px",
    background: "#E25252",
  },

  title2: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "1rem",
    "&:hover": {
      color: "#315CD5",
    },
    margin: "0 8px",
  },

  flexRow: {
    display: "flex",
  },

  flexCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  signIn: {
    background: "#E25252",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "1rem",
    "&:hover": {
      color: "#315CD5",
    },
    border: "1.5px solid black",
    marginRight: "10px",
  },

  register: {
    background: "#E25252",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "1rem",
    "&:hover": {
      color: "#315CD5",
    },
    border: "1.5px solid black",
  },

  connectUs: {
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    marginTop: "10px",
    color: "#000000",
    textDecoration: "none",
    fontSize: "1rem",
    "&:hover": {
      color: "#315CD5",
    },
    background: "#FFE599",
    border: "2px solid black",
  },

  toolbar: {
    padding: "24px",
  },

  appBar: {
    backgroundColor: "#FFF",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.08)",
  },

  appBarShift: {
    //width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    color: "#315CD5",
  },

  hide: {
    display: "none",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },

  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  registerBtnRoot: {
    backgroundColor: "#E25252",
    borderRadius: "4px",
    marginLeft: "32px",
    boxShadow: "none",
    "&:hover": {
      background: "#D73C3C",
    },
    "&:active": {
      background: "#D33030",
      boxShadow: "none",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0",
    },
  },
  mobileToolbar: {
    display: "flex",
    justifyContent: "space-between",
    "& .logo": {
      display: "flex",
      alignItems: "center",
    },
  },
  navList: {
    color: `${theme.palette.primary.main} !important`,
  },

  subMenuArrow: {
    '& .MuiSvgIcon-root': {
        width: '30px !important'
    }
  },
}));

export default function PersistentDrawerLeft({ setFocusOfUserForm, focusForm, resetFocusForm, email, setEmail, calendlyPrefillData, setCalendlyPrefillData}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subMenuItems, setSubMenuItems] = React.useState([]);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [calendlyModalOpen, setCalendlyModalOpen] = React.useState(false);

  const MenuItems = [
    {
      href: "/",
      title: "Home",
      icon: <HomeIcon className="nav-icon" />,
    },

    {
      href: "#",
      title: 'FAANG Tracks',
      icon: <Facebook className='nav-icon' />,
      subMenu: [
        {
          href: "/track/technical-program-manager",
          title: 'Technical Program Manager'
        },
        {
          href: "/track/software-engineering-manager",
          title: 'Software Development Manager'
        },
        {
          href: "/track/software-development-engineer",
          title: 'Software Development Engineer'
        },
        {
          href: "/track/system-design",
          title: 'System Design'
        },
        {
          href: "/track/amazon-behavior-interview",
          title: 'Amazon Behavior Interview'
        },
      ]
    },
    {
      href: "/mock-interview",
      title: 'Mock Interview',
      icon: <ShopIcon className='nav-icon' />,
      subMenu: [
        {
          href: "/mock-interview?track=technical-program-manager",
          title: 'Technical Program Manager'
        },
        {
          href: "/mock-interview?track=software-engineering-manager",
          title: 'Software Engineering Manager'
        },
        {
          href: "/mock-interview?track=software-development-engineer",
          title: 'Software Development Engineer'
        },
        {
          href: "/mock-interview?track=system-design",
          title: 'System Design'
        },
      ]
    },
    {
      href: "https://airtable.com/shrQvzd7c5DQhOyIG/tbljf2SstA54WWPn3",
      title: 'Classes',
      icon: <GroupWork className='nav-icon' />,
      subMenu: [
        {
          href: "https://airtable.com/shrQvzd7c5DQhOyIG/tbljf2SstA54WWPn3",
          title: 'Advanced coding classes',
          target: "_blank"
        },
        {
          href: "https://airtable.com/shrMP4HO2Xf0tHOU7/tbljf2SstA54WWPn3 ",
          title: 'Distributed System Design',
          target: "_blank"
        }
      ]
    },
    {
      href: "/jobs",
      title: "Jobs",
      icon: <WorkIcon className="nav-icon" />,
    },
    {
      href: "https://interviewhelp.io/blog",
      title: "Blog",
      icon: <LocalLibraryIcon className="nav-icon" />,
    }
    // {
    //   href: '/employer',
    //   title: 'Employer',
    //   icon: <PersonSharpIcon className='nav-icon' />
    // },
    
    // {
    //   href: 'https://bitly.com/browseinterviewquestions',
    //   title: 'Interviews',
    //   icon: <QuestionAnswerIcon className='nav-icon' />
    // },
    
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const moveToFreeTrialForm = () => {
    handleDrawerClose();
    if (history.location.pathname !== "/") {
      setLoginModalOpen(true);
      setCalendlyModalOpen(false);
    } else setFocusOfUserForm(true);
  };

  function handleMenuHover(event, menuItems) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
      setSubMenuItems(menuItems);
    }
  }

  function handleSubMenuClose() {
    setAnchorEl(null);
  }

  function handleSetEmail(e){
    setEmail(e);
    setLoginModalOpen(false);
    setCalendlyModalOpen(true);
  }

  const SubMenuItemsComponent = ({ anchorEl, handleSubMenuClose, subMenuItems }) => {
    return (
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        onMouseLeave={handleSubMenuClose}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <MenuList
                autoFocusItem={Boolean(anchorEl)}
                id="composition-menu"
                aria-labelledby="composition-button"
                style={{ marginTop: '20px' }}
              >
                {subMenuItems.map((data, index) => (
                  <MenuItem key={index}>
                    <Typography
                      key={data.title}
                      component="a"
                      href={data.href}
                      variant="h6"
                      className={classes.subMenuItem}
                      target={data.target || "_self"}
                    >
                      {data.title}
                    </Typography>
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  };

  const MobileMenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
  };

  const SingleLevel = ({ item }) => {
    return (
      <ListItem 
      button 
      key={item.title}
      component="a"
      href={item.href}
      className={classes.navList}>
        {item.icon}
        <ListItemText primary={item.title} />
      </ListItem>
    );
  };

  const MultiLevel = ({ item }) => {
    const { subMenu: children } = item;
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen((prev) => !prev);
    };
  
    return (
      <React.Fragment>
        <ListItem 
        button  
        key={item.title}
        className={classes.navList} >
            {item.icon}
            <Link href={item.href} underline="none">
              <ListItemText primary={item.title} />
            </Link>
            <div onClick={handleClick} className={classes.subMenuArrow}> {open ? <ExpandLess /> : <ExpandMore />} </div>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((child, key) => (
                <MobileMenuItem key={key} item={child} />
              ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  return (
    <span>
      <span className="desktop-nav">
        <Grid container className={classes.root}>
          <Container>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar className={classes.toolbar}>
                <span>
                  <a href="/">
                    <img alt="" src={Logo}></img>
                  </a>
                </span>
                <span>
                  <Typography
                    key="InterviewHelp"
                    component="a"
                    className="headerTitle"
                    href="/"
                  >
                    InterviewHelp
                  </Typography>
                </span>
                <span className="headerRight">
                  {MenuItems.map((data) => (
                    <Typography
                      key={data.title}
                      component="a"
                      href={data.href}
                      variant="h6"
                      className={classes.title}
                      onMouseOver={(e) => handleMenuHover(e, data.subMenu)}
                    >
                      {data.title}
                    </Typography>
                  ))}

                  {subMenuItems && subMenuItems.length > 0 && (
                    <SubMenuItemsComponent anchorEl={anchorEl} subMenuItems={subMenuItems} handleSubMenuClose={handleSubMenuClose} />
                  )}
                  <Button
                    type="button"
                    component="button"
                    variant="contained"
                    onClick={moveToFreeTrialForm}
                    classes={{ root: classes.registerBtnRoot }}
                    disableRipple
                  >
                    {"Get FREE consultation"}
                  </Button>
                </span>
              </Toolbar>
            </AppBar>
          </Container>
        </Grid>
      </span>
      <span className="mobile-nav">
        <Grid container className={classes.root}>
          <Container>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar className={classes.mobileToolbar}>
                <div className="logo">
                  <span>
                    <a href="/">
                      <img alt="" src={Logo}></img>
                    </a>
                  </span>
                  <span>
                    <Typography
                      key="InterviewHelp"
                      component="a"
                      className="headerTitle"
                      href="/"
                    >
                      InterviewHelp
                    </Typography>
                  </span>
                </div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton)}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="right"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                {MenuItems.map((data, index) => (
                    <MobileMenuItem key={data.title} item={data} />
                ))}
                <ListItem>
                  <Button
                    type="button"
                    component="button"
                    variant="contained"
                    onClick={moveToFreeTrialForm}
                    classes={{ root: classes.registerBtnRoot }}
                    disableRipple
                  >
                    {"Get FREE consultation"}
                  </Button>
                </ListItem>
              </List>
              <Divider />
            </Drawer>
          </Container>
        </Grid>
        {(loginModalOpen || (calendlyModalOpen && email)) && <LoginModal
          open={loginModalOpen || calendlyModalOpen}
          handleClose={() => {setCalendlyModalOpen(false); setLoginModalOpen(false)}}
          focusForm={focusForm}
          resetFocusForm={resetFocusForm}
          setEmail={(e) => handleSetEmail(e)}
          isCalendlyModal={calendlyModalOpen}
          calendlyPrefillData={calendlyPrefillData}
          setCalendlyPrefillData={setCalendlyPrefillData}
        />
      }
      </span>
    </span>
  );
}
