import { UserRole } from "../types";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Button, Link, Stack, TextField,
  ToggleButton, ToggleButtonGroup, Typography
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link as RRDLink, useNavigate } from "react-router-dom";
import { API } from "../services";
import { errorSnackbar, getErrorMessage, successSnackbar } from "../utils";

const defaultTheme = createTheme();

// ✅ local type
type CreateUserSchema = {
  email: string;
  password: string;
  name: string;
  mobileNumber: string;
  role: UserRole;
};

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    defaultValues: { role: UserRole.buyer },
  });

  const onSubmit: SubmitHandler<CreateUserSchema> = async (data) => {
    try {
      await API.signup(data);
      successSnackbar("Signup success");
      navigate("/login");
    } catch (error) {
      errorSnackbar(getErrorMessage(error));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage:
              'url("https://i.pinimg.com/564x/9c/0e/3e/9c0e3e9046902a3e32544baa3fe87ac3.jpg")',
            backgroundSize: "cover",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper}>
          <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            <Avatar><LockOutlinedIcon /></Avatar>
            <Typography variant="h5">Signup</Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>

              <TextField fullWidth label="Email"
                {...register("email", { required: "Email required" })}
                error={!!errors.email}
                helperText={errors.email?.message as string || ""}
              />

              <TextField fullWidth label="Password"
                {...register("password", { required: "Password required" })}
                error={!!errors.password}
                helperText={errors.password?.message as string || ""}
              />

              <TextField fullWidth label="Name"
                {...register("name", { required: "Name required" })}
                error={!!errors.name}
                helperText={errors.name?.message as string}
              />

              <TextField fullWidth label="Mobile"
                {...register("mobileNumber", { required: "Mobile required" })}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber?.message as string}
              />

              <Stack sx={{ mt: 2 }}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      {...field}
                      exclusive
                      onChange={(_, val) => setValue("role", val)}
                    >
                      <ToggleButton value={UserRole.buyer}>Buyer</ToggleButton>
                      <ToggleButton value={UserRole.seller}>Seller</ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
              </Stack>

              <Button fullWidth type="submit" sx={{ mt: 3 }}>
                Signup
              </Button>

              <Link component={RRDLink} to="/login">
                Already have account?
              </Link>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
