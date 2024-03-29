import { Select, MenuItem } from "@mui/material";

export default function CustomSelect({
  placeholder,
  selectedValue,
  setSelectedValue,
  allValues,
  disabled,
  labelKey,
  valueKey,
  error,
  styleOverride,
}) {
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Select
      value={selectedValue}
      onChange={handleChange}
      displayEmpty
      renderValue={selectedValue !== "" ? undefined : () => placeholder}
      disabled={disabled}
      sx={{
        ...selectMainStyle,
        backgroundColor: error ? "rgba(255, 0, 0, 0.25)" : "#FFFFFF",
        ...styleOverride,
      }}
    >
      {allValues?.map((value) => (
        <MenuItem key={value[valueKey]} value={value}>
          {value[labelKey]}
        </MenuItem>
      ))}
    </Select>
  );
}

const selectMainStyle = {
  width: "100%",
  textAlign: "left",
  "&&": {
    marginBottom: 1,
  },
};
