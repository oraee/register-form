import {
  Alert,
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useSteps } from "../hooks/useSteps";
import { PersonalInfo } from "../components/PersonalInfo";
import { LoginInfo } from "../components/LoginInfo";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../mockApi/api";
import { RegisteredMsg } from "../components/RegisteredMsg";

const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  profilePic: Yup.string(),
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export type RegisterForm = Yup.InferType<typeof registrationSchema>;

export const Register = () => {
  const { currentStep, previousStep, nextStep } = useSteps([0, 1]);

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
  });
  const formik = useFormik<RegisterForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      profilePic: "",
      userName: "",
      password: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      registerUserMutation.mutate(values);
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  if (registerUserMutation.isSuccess) {
    return <RegisteredMsg />;
  }

  return (
    <Box sx={{ maxWidth: "100vw", width: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Stepper activeStep={currentStep} orientation="vertical">
          <Step key={"personalInfo"}>
            <StepLabel>personal information </StepLabel>
            <StepContent>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <>
                    <PersonalInfo formik={formik} />
                    <Button
                      variant="contained"
                      onClick={nextStep}
                      disabled={
                        Boolean(formik.errors.firstName) ||
                        Boolean(formik.errors.lastName)
                      }
                      sx={{ mt: 1, mr: 1 }}
                    >
                      next step
                    </Button>
                  </>
                </Box>
              </StepContent>
            </StepContent>
          </Step>
          <Step key={"loginInfo"}>
            <StepLabel>login information </StepLabel>
            <StepContent>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <LoginInfo formik={formik} />
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mt: 1, mr: 1 }}
                      disabled={registerUserMutation.isLoading}
                    >
                      submit
                    </Button>
                    <Button onClick={previousStep} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                    {registerUserMutation.isError && (
                      <Alert severity="error">
                        An error occurred during registeration
                      </Alert>
                    )}
                  </div>
                </Box>
              </StepContent>
            </StepContent>
          </Step>
        </Stepper>
      </form>
    </Box>
  );
};
