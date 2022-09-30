import { makeStyles } from "@material-ui/core/styles";
import React, {useState} from "react";
import { Backdrop, Modal, Fade, CircularProgress } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { CALENDLY_URL, formatCalendlyUrl } from "../utils/Constants";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "0 20px",
    },
  },
  modalContent: {
    padding: "2.75rem",
    [theme.breakpoints.down("sm")]: { 
      width: "100%",
      padding: "unset"
    },
    width: "50%",
    borderRadius: "4px",
    textAlign: "center",
    position: "relative",
    "&:focus": {
      outline: "none",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
  },
  crossIcon: {
    width: "1rem !important",
    height: "1rem !important",
    position: "absolute",
    top: "21px",
    right: "21px",
    cursor: "pointer",
    color: "white",
  },
  circularLoader: {
    width: "60px",
    height: "60px",
    position: "absolute",
    margin: "0 auto",
    top: "50%",
    left: "0",
    right: "0",
    zIndex: 1
},
}));

export default function CalendlyModal({
  open,
  setIsIFrameOpen,
  prefillData
}) {

  const classes = useStyles();

  const src = formatCalendlyUrl({
    url: CALENDLY_URL,
    prefill: prefillData,
    embedType: "Inline",
  });

  const [isLoading, setIsloading] = useState(true);

  const onLoad = () => {
    setIsloading(false);
  }

  return (
    <Modal
      className={classes.root}
      open={open}
      onClose={() => setIsIFrameOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableAutoFocus
    >
      <Fade in={open}>
        <div className={classes.modalContent}>

          {isLoading ? <CircularProgress  className={classes.circularLoader}/> : <ClearIcon className={classes.crossIcon} onClick={() => setIsIFrameOpen(false)} />}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <iframe
              style={{ width: "100%", height: "80vh" }}
              frameBorder="0"
              title="calendly iframe"
              src={src}
              onLoad={onLoad}
            >
            </iframe>
      
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
