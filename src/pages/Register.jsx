import { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { BeatLoader } from "react-spinners";

import apiServices from "../api/services";
import validateFields from "../utils/validators";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [availableOrganizations, setAvailableOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("");

  const [shouldDisplayErrors, setShouldDisplayErrors] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const getAvailableOrganizations = async () => {
    const response = await apiServices.organizations.getAll();
    if (!response.success) {
      setErrorMessage(response.errorMessage);
      return;
    }
    console.log(response.data);
    setAvailableOrganizations(response.data);
  };

  const handleRegisterButtonClick = async () => {
    if (Object.keys(validationErrors).length > 0) {
      setShouldDisplayErrors(true);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getAvailableOrganizations();
  }, []);

  useEffect(() => {
    const validationErrors = validateFields({
      email: email,
      username: username,
      password: password,
    });

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setValidationErrors(validationErrors);
  }, [email, username, password, confirmPassword]);

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
        <h2>Register</h2>

        <form
        //   className={classes.formContainer}
        //   onSubmit={handleRegisterButtonClick}
        >
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={inputTextFieldStyles}
            error={shouldDisplayErrors && validationErrors.email}
            helperText={shouldDisplayErrors && validationErrors.email}
          />

          <TextField
            type="text"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={inputTextFieldStyles}
            error={shouldDisplayErrors && validationErrors.username}
            helperText={shouldDisplayErrors && validationErrors.username}
          />

          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={inputTextFieldStyles}
            error={shouldDisplayErrors && validationErrors.password}
            helperText={shouldDisplayErrors && validationErrors.password}
          />

          <TextField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            sx={inputTextFieldStyles}
            error={shouldDisplayErrors && validationErrors.confirmPassword}
            helperText={shouldDisplayErrors && validationErrors.confirmPassword}
          />

          <TextField
            type="text"
            label="Organization"
            value={selectedOrganization}
            onChange={(event) => setSelectedOrganization(event.target.value)}
            sx={inputTextFieldStyles}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleRegisterButtonClick}
            disabled={isLoading || (shouldDisplayErrors && Object.keys(validationErrors).length !== 0)}
          >
            {isLoading ? <BeatLoader color="white" loading={true} size={10} /> : "Register"}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

const inputTextFieldStyles = {
  width: 300,
  "&&": {
    marginBottom: 1,
  },
};
