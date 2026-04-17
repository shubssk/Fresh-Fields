import { UserRole } from "../types"; // ✅ local file
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button, Link, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as RRDLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { API } from "../services";
import { errorSnackbar, getErrorMessage, successSnackbar } from "../utils";

const defaultTheme = createTheme();

// ✅ define type locally
type LoginUserSchema = {
  email: string;
  password: string;
};

export default function SignInSide() {
  const { setAccount } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchema>();

  const onSubmit: SubmitHandler<LoginUserSchema> = async (data) => {
    try {
      const response = await API.login(data);
      setAccount(response.data.data);
      successSnackbar("Logged in successfully");

      if (response.data.data.user.role === UserRole.seller) {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      errorSnackbar(getErrorMessage(error));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item xs={false} sm={4} md={7}
          sx={{
            backgroundImage:
              'url("https://i.pinimg.com/564x/9c/0e/3e/9c0e3e9046902a3e32544baa3fe87ac3.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper}>
          <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h5">Login</Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                {...register("email", { required: "Email required" })}
                error={!!errors.email}
                helperText={errors.email?.message as string}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                {...register("password", { required: "Password required" })}
                error={!!errors.password}
                helperText={errors.password?.message as string}
              />

              <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
                Login
              </Button>

              <Link component={RRDLink} to="/signup">
                Don't have account? Signup
              </Link>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
