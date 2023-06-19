import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import { RegisterForm } from "../pages/Register";
type Props = {
  formik: FormikProps<RegisterForm>;
};
export const LoginInfo = ({ formik }: Props) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        type="string"
        id="userName"
        label="userName"
        name="userName"
        autoComplete="username"
        value={formik.values.userName}
        onChange={formik.handleChange}
        error={formik.touched.userName && Boolean(formik.errors.userName)}
        helperText={formik.touched.userName && formik.errors.userName}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="password"
        id="password"
        label="password"
        name="password"
        autoComplete="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
    </>
  );
};
