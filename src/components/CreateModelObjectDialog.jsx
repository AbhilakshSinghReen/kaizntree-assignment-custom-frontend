import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  TextField,
  Typography,
  List,
  LinearProgress,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { BeatLoader } from "react-spinners";

// import { toast } from "react-toastify";
import CustomSelect from "./Select";
import apiServices from "../api/services";

export default function CreateModelObjectDialog({ open, setOpen, modelLabel, modelUrlPrefix, fields, onSuccess }) {
  const [isCreating, setIsCreating] = useState(false);
  const [fieldValues, setFieldValues] = useState(fields.reduce((acc, field) => ((acc[field.name] = ""), acc), {}));

  const handleFieldValueChange = (fieldName, newValue) => {
    const updatedFieldValues = { ...fieldValues };
    updatedFieldValues[fieldName] = newValue;
    // do validation here
    setFieldValues(updatedFieldValues);
  };

  const resetFieldValues = () => {
    setFieldValues(fields.reduce((acc, field) => ((acc[field.name] = ""), acc), {}));
  };

  const handleCreateButtonClick = async (event) => {
    setIsCreating(true);

    const response = await apiServices.models.create(modelUrlPrefix, fieldValues);
    if (!response.success) {
      console.log(response);

      let alertMessage = `Failed to create a new ${modelLabel}.`;

      if (response?.errors?.non_field_errors) {
        if (response.errors.non_field_errors[0] === "The fields organization, name must make a unique set.") {
          alertMessage += ` ${modelLabel} with the name "${fieldValues.name}" already exists.`;
        }
      }

      setIsCreating(false);
      window.alert(alertMessage);
      return;
    }

    await onSuccess();
    setIsCreating(false);
    resetFieldValues();
    window.alert(`${modelLabel} created successfully.`);
    setOpen(false);
  };

  useEffect(() => {
    console.log("fields: ", fields.length);
  }, [fields]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => {
        if (isCreating) {
          return;
        }
        setOpen(false);
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Create {modelLabel}</h2>
      </DialogTitle>

      <DialogContent>
        {fields.map((field) => (
          <Box sx={styles.inputFieldContainer} key={field.name}>
            <Box sx={styles.inputFieldHalfContainer}>
              <Typography variant="h6">{`${field.label}: `}</Typography>
            </Box>

            <Box sx={styles.inputFieldHalfContainer}>
              {field.type === "foreignKey" || field.type === "selectField" ? (
                <CustomSelect
                  placeholder={field.label}
                  selectedValue={fieldValues[field.name]}
                  setSelectedValue={(newValue) => handleFieldValueChange(field.name, newValue)}
                  allValues={field.allValues}
                  labelKey={field.labelKey}
                  valueKey={field.valueKey}
                  styleOverride={{
                    backgroundColor: "#DDDDDD",
                  }}
                />
              ) : field.type === "dependantForeignKey" ? (
                <CustomSelect
                  placeholder={field.label}
                  selectedValue={fieldValues[field.name]}
                  setSelectedValue={(newValue) => handleFieldValueChange(field.name, newValue)}
                  allValues={field.allValues(
                    Object.entries(fieldValues).reduce((acc, [key, value]) => {
                      if (field.dependsOn.includes(key)) {
                        acc[key] = value;
                      }
                      return acc;
                    }, {})
                  )}
                  labelKey={field.labelKey}
                  valueKey={field.valueKey}
                  styleOverride={{
                    backgroundColor: "#DDDDDD",
                  }}
                  disabled={!field.dependsOn.every((dependency) => fieldValues?.[dependency] !== "")}
                />
              ) : (
                <TextField
                  sx={styles.dialogInputTextField}
                  type="text"
                  autoComplete="off"
                  value={fieldValues[field.name]}
                  onChange={(event) => handleFieldValueChange(field.name, event.target.value)}
                />
              )}
            </Box>
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={styles.dialogActions}>
        <Box width="100%" display="flex" flexDirection="row" justifyContent="center" mb={2}>
          <Button variant="contained" color="primary" onClick={handleCreateButtonClick} disabled={isCreating}>
            {isCreating ? <BeatLoader color="blue" loading={true} size={14} /> : `Create ${modelLabel}`}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  dialogInputTextField: {
    width: "100%",
  },
  dialogActions: {
    "&&": {
      justifyContent: "center",
    },
  },
  inputFieldContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#CCCCCC",
    marginBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1,
    paddingBottom: 1,
    borderRadius: 1,
  },
  inputFieldHalfContainer: {
    width: "50%",
  },
};
