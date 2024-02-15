import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, TextField, Button, Link } from "@mui/material";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import apiServices from "../api/services";
import validateFields from "../utils/validators";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [shouldDisplayErrors, setShouldDisplayErrors] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginButtonClick = async () => {
    if (Object.keys(validationErrors).length > 0) {
      setShouldDisplayErrors(true);
      return;
    }

    setIsLoading(true);

    const response = await apiServices.auth.login(username, password);
    if (!response.success) {
      setErrorMessage(response.errorMessage);
      return;
    }

    const accessToken = response.data.accessToken;
    setAuth({
      username: username,
      tokens: {
        access: accessToken,
      },
    });

    console.log("Login successful");

    setIsLoading(false);
    toast("You have been registered successfully. Redirecting to login page.");
    setTimeout(() => navigate("/auth/login"), 5000);
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <Grid>
      <Paper
        elevation={20}
        style={{
          padding: "30px 20px",
          width: 300,
          margin: "20px auto",
        }}
      >
        <h2>Login</h2>

        <form onSubmit={handleLoginButtonClick}>
          <TextField
            type="text"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={inputTextFieldStyle}
            error={shouldDisplayErrors && !!validationErrors.username}
            helperText={shouldDisplayErrors && validationErrors.username}
            // TODO: validate
          />

          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={inputTextFieldStyle}
            error={shouldDisplayErrors && !!validationErrors.password}
            helperText={shouldDisplayErrors && validationErrors.password}
            // TODO: validate
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleLoginButtonClick}
            disabled={isLoading || (shouldDisplayErrors && Object.keys(validationErrors).length !== 0)}
          >
            {isLoading ? <BeatLoader color="white" loading={true} size={10} /> : "Login"}
          </Button>
        </form>

        <div sx={alternateLinkTextStyle}>
          <Link href="/auth/register">Don't have an account? Register here.</Link>
        </div>

        {/* <div sx={alternateLinkTextStyle}>
          <Link href="/auth/request-reset-password">Forgot Password?</Link>
        </div> */}
      </Paper>
    </Grid>
  );
}

const inputTextFieldStyle = {
  width: 300,
  "&&": {
    marginBottom: 1,
  },
};

const alternateLinkTextStyle = {
  marginTop: 20,
};
