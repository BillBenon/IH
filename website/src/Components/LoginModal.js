import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Backdrop, Modal, Fade } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import clsx from "clsx";
import UserFormForConsultation from "./UserFormForConsultation";
import CalendlyModal from "./CalendlyModal";

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
      padding: "unset",
    },
    width: "480px",
    borderRadius: "4px",
    textAlign: "center",
    position: "relative",
    "&:focus": {
      outline: "none",
    },
  },
  zeroPadding: {
    padding: "0 !important"
  },
  crossIcon: {
    width: "1rem !important",
    height: "1rem !important",
    position: "absolute",
    top: "21px",
    right: "21px",
    cursor: "pointer",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      top: "-17px",
      right: "-12px"
    }
  },
}));

export default function LoginModal({
  open,
  handleClose,
  focusForm,
  resetFocusForm,
  setEmail,
  isCalendlyModal,
  calendlyPrefillData,
  setCalendlyPrefillData
}) {
  const classes = useStyles();
  
  return (
    <>
        <Modal
          className={classes.root}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          disableAutoFocus
        >
          <Fade in={open}>
            <div className={clsx(classes.modalContent, isCalendlyModal ? classes.thankYouModal : "")}>
              
              {isCalendlyModal ?
                <CalendlyModal
                  open={isCalendlyModal}
                  setIsIFrameOpen={handleClose}
                  prefillData={calendlyPrefillData}
                />
                :
                <><ClearIcon className={classes.crossIcon} onClick={handleClose} />
                <div style={{ display: "flex" }}>
                  <UserFormForConsultation
                    focusName={focusForm}
                    resetFocusName={resetFocusForm}
                    setEmail={setEmail}
                    setFormData={(e) => setCalendlyPrefillData(e)}
                    fullWidth
                  />
                </div></>
              }
            </div>
          </Fade>
        </Modal>
    </>
  );
}
