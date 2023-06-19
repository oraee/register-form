import { Avatar, Button, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { RegisterForm } from "../pages/Register";

type Props = {
  formik: FormikProps<RegisterForm>;
};

export const PersonalInfo = ({ formik }: Props) => {
  return (
    <>
      <Avatar
        src={formik.values.profilePic}
        sx={{ mx: "auto", width: "100px", height: "100px" }}
      />
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            formik.setFieldValue(
              "profilePic",
              URL.createObjectURL(e.target.files[0])
            );
          }
        }}
      />
      <label htmlFor="raised-button-file">
        <Button component="span">Upload image</Button>
      </label>
      <Button
        component="span"
        color="error"
        onClick={() => formik.setFieldValue("profilePic", "")}
      >
        delete image
      </Button>

      <TextField
        margin="normal"
        required
        fullWidth
        type="string"
        id="firstName"
        label="firstName"
        name="firstName"
        autoComplete="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="string"
        id="lastName"
        label="lastName"
        name="lastName"
        autoComplete="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
    </>
  );
};
