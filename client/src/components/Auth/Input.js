import React from "react";
import { IconButton, InputAdornment, TextField, Grid } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={{
          endAdornment: name === "password" && (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} edge="end">
                {type === "text" ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default Input;
