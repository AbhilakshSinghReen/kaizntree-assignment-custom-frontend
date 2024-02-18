import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, TextField, Button, Link } from "@mui/material";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import CustomSelect from "../components/Select";
import apiServices from "../api/services";
import validateFields from "../utils/validators";

export default function Register() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
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

    setAvailableOrganizations(response.data);
  };

  const handleRegisterButtonClick = async () => {
    if (Object.keys(validationErrors).length > 0) {
      setShouldDisplayErrors(true);
      return;
    }

    setIsLoading(true);

    const response = await apiServices.auth.register(fullName, email, username, password, selectedOrganization.id);
    if (!response.success) {
      setErrorMessage(response.errorMessage);
      return;
    }

    setIsLoading(false);
    toast("You have been registered successfully. Redirecting to login page.");
    setTimeout(() => navigate("/auth/login"), 5000);
  };

  useEffect(() => {
    document.title = "Register";

    getAvailableOrganizations();
  }, []);

  useEffect(() => {
    const validationErrors = validateFields({
      fullName: fullName,
      email: email,
      username: username,
      password: password,
      organization: selectedOrganization,
    });

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setValidationErrors(validationErrors);
  }, [fullName, email, username, password, confirmPassword, selectedOrganization]);

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

        <form onSubmit={handleRegisterButtonClick}>
          <TextField
            type="text"
            label="Full Name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            sx={inputTextFieldStyle}
            error={shouldDisplayErrors && !!validationErrors.fullName}
            helperText={shouldDisplayErrors && validationErrors.fullName}
          />

          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={inputTextFieldStyle}
            error={shouldDisplayErrors && !!validationErrors.email}
            helperText={shouldDisplayErrors && validationErrors.email}
          />

          <TextField
            type="text"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={inputTextFieldStyle}
            error={shouldDisplayErrors && !!validationErrors.username}
            helperText={shouldDisplayErrors && validationErrors.username}
          />

          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={inputTextFieldStyle}
            error={shouldDisplayErrors && !!validationErrors.password}
            helperText={shouldDisplayErrors && validationErrors.password}
          />

          <TextField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            sx={inputTextFieldStyle}
            error={shouldDisplayErrors && !!validationErrors.confirmPassword}
            helperText={shouldDisplayErrors && validationErrors.confirmPassword}
          />

          <CustomSelect
            placeholder="Organization"
            selectedValue={selectedOrganization}
            setSelectedValue={setSelectedOrganization}
            allValues={availableOrganizations}
            labelKey="name"
            valueKey="id"
            error={shouldDisplayErrors && !!validationErrors.organization}
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

        <div sx={alternateLinkTextStyle}>
          <Link href="/auth/login">Already have an account? Login here.</Link>
        </div>
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
