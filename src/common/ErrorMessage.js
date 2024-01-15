import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";

const ErrorMessage = (props) => {
  const clickHandler = () => {
    props.onClick();
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
      onClick={clickHandler}
    >
      <Stack sx={{ width: "40vw" }} spacing={2}>
        <Alert severity="error" width="100%">
          <AlertTitle>Error</AlertTitle>
          <strong>{props.text}</strong>
        </Alert>
      </Stack>
    </Backdrop>
  );
};

export default ErrorMessage;