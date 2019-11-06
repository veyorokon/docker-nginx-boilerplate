import React from "react";
import AppBar from "@material-ui/core/AppBar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";

import {fade} from "@material-ui/core/styles";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

//const apiUrl = process.env.REACT_APP_BACKEND_API;

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  search: {
    position: "relative",
    height: "4rem",
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    fontSize: "1.4rem",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 150
    }
  },
  pageTitle: {fontSize: "6.8rem", marginBottom: "0.55em"},
  pageDescription: {
    fontSize: "1.8rem",
    color: "rgba(0, 0, 0, 0.7)",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.6rem"
    }
  },
  heroContent: {
    background:
      "linear-gradient(90deg, #fff 20px, transparent 1%) center, linear-gradient(#fff 20px, transparent 1%) center, #d6ddff",
    backgroundSize: "22px 22px",
    padding: "9rem 0",
    marginTop: "7rem"
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6)
  }
});

class Landing extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar style={{height: "7rem"}}>
            <DashboardIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              App Bar
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{"aria-label": "search"}}
                onChange={e => this.setState({search: e.target.value})}
              />
            </div>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Fade in={true} timeout={1000}>
                <Typography
                  className={classes.pageTitle}
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Frontend
                </Typography>
              </Fade>
              <Fade in={true} timeout={2000}>
                <Typography
                  align="center"
                  color="textSecondary"
                  paragraph
                  className={classes.pageDescription}
                >
                  Some description
                </Typography>
              </Fade>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="lg">
            <Typography
              align="center"
              color="textSecondary"
              paragraph
              className={classes.pageDescription}
            >
              Some other stuff here
            </Typography>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Landing);
