import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { loginService } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/API";
import Cookies from "js-cookie";

const defaultTheme = createTheme();

export default function Login() {
  const schema = Yup.object().shape({
    identifier: Yup.string()
      .email("precisa fornecer um e-mail válido como identificador")
      .required("identificador é obrigatório"),
    password: Yup.string().required(),
  });

  const navigate = useNavigate();

  const [keepLogged, setKeepLogged] = React.useState(false);
  React.useEffect(() => console.log(keepLogged), [keepLogged]);
  React.useEffect(()=>{
    if (Cookies.get('token')){
      navigate("users")
    }
  },[])
  
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logue com sua conta de administrador
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(async (data) => {
              const response = await loginService(data, keepLogged);
              if (response === "sucess") navigate("/users");
            })}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              control={control}
              name="identifier"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { isTouched, isDirty, error },
                formState,
              }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="identificador"
                  name="email"
                  error={!!errors.identifier}
                  autoFocus
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { isTouched, isDirty, error },
                formState,
              }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  error={!!errors.password}
                  autoComplete="current-password"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setKeepLogged(!keepLogged)}
                  value="remember"
                  color="primary"
                />
              }
              label="Lembre-se de mim"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
