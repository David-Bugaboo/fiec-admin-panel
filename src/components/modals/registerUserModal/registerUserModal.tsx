import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { InputLabel, MenuItem, Select } from "@mui/material";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterUserService } from "../../../services/users.service";

interface iModal {
  open: boolean;
  onClose: () => void;
}

const MyModal = ({ open, onClose }: iModal) => {
  const schema = Yup.object().shape({
    role: Yup.number().required("cargo é necessário"),
    username: Yup.string().required("nome de usuário é obrigatório"),
    fullName: Yup.string().required("precisa entrar o nome completo"),
    email: Yup.string()
      .required("precisa fornecer e-mail")
      .email("insira um e-mail válido"),
    cpf: Yup.string()
      .required("cpf é obrigatório")
      .matches(/^\d{11}$/, "CPF inválido"),
    business: Yup.string().required("nome da empresa é obrigatório!"),
    cnpj: Yup.string()
      .required("cnpj da empresa obrigatório")
      .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),
    password: Yup.string()
      .required("senha obrigatória")
      .matches(/^.{8,}$/, "deve conter pelo menos 8 caracteres")
      .matches(/[\W_]/, "deve ter um caractere especial")
      .matches(/\d/, "deve conter pelo menos um número")
      .matches(/[A-Z]/, "deve conter pelo menos uma letra maiúscula")
      .matches(/[a-z]/, "deve conter pelo menos uma letra minúscula"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <Modal open={open} onClose={onClose} style={{ width: "400px" }}>
      <div>
        <div
          style={{
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            padding: "16px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "80%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Typography
              variant="h6"
              style={{ flexGrow: 1, textAlign: "center" }}
            >
              Registrar usuário
            </Typography>
            <IconButton
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <form
            onSubmit={handleSubmit((data) => RegisterUserService(data))}
            style={{ marginBottom: "16px" }}
          >
            <div>
              <Controller
                control={control}
                name="role"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    label="Tipo de usuário"
                    style={{ marginBottom: "16px" }}
                    fullWidth
                    select
                    error={!!errors.role}
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value={4}>Manager</MenuItem>
                    <MenuItem value={3}>Employer</MenuItem>
                    <MenuItem value={1}>Admin</MenuItem>
                  </TextField>
                )}
              />
              {
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ color: "red" }}
                >
                  {errors.role?.message}
                </Typography>
              }
            </div>
            <Divider style={{ margin: "16px 0", borderStyle: "dashed" }} />
            <div>
              <Controller
                control={control}
                name="username"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    error={!!errors.username}
                    onChange={onChange}
                    value={value}
                    label="Nome de usuário"
                    style={{ marginBottom: "16px" }}
                    fullWidth
                  />
                )}
              />
              {
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ color: "red" }}
                >
                  {errors.username?.message}
                </Typography>
              }
            </div>
            <div>
              <Controller
                control={control}
                name="fullName"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    label="Nome completo"
                    error={!!errors.fullName}
                    onChange={onChange}
                    value={value}
                    style={{ marginBottom: "16px" }}
                    fullWidth
                  />
                )}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ color: "red" }}
              >
                {errors.fullName?.message}
              </Typography>
            </div>
            <div>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    label="Email"
                    error={!!errors.email}
                    onChange={onChange}
                    value={value}
                    style={{ marginBottom: "16px" }}
                    fullWidth
                  />
                )}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ color: "red" }}
              >
                {errors.email?.message}
              </Typography>
            </div>
            <div>
              <Controller
                control={control}
                name="cpf"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    onChange={onChange}
                    error={!!errors.cpf}
                    value={value}
                    label="CPF"
                    style={{ marginBottom: "16px" }}
                    fullWidth
                  />
                )}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ color: "red" }}
              >
                {errors.cpf?.message}
              </Typography>
            </div>

            <div>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    onChange={onChange}
                    error={!!errors.password}
                    value={value}
                    label="Password"
                    style={{ marginBottom: "16px" }}
                    fullWidth
                  />
                )}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ color: "red" }}
              >
                {errors.password?.message}
              </Typography>
            </div>

            <Divider style={{ margin: "16px 0", borderStyle: "dashed" }} />
            <div>
              <Controller
                control={control}
                name="business"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    onChange={onChange}
                    error={!!errors.business}
                    value={value}
                    label="Empresa"
                    style={{ marginBottom: "16px" }}
                    fullWidth
                  />
                )}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ color: "red" }}
              >
                {errors.business?.message}
              </Typography>
            </div>

            <div>
              <Controller
                control={control}
                name="cnpj"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    onChange={onChange}
                    error={!!errors.cnpj}
                    value={value}
                    label="CNPJ"
                    style={{ marginBottom: "16px" }}
                    fullWidth
                  />
                )}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ color: "red" }}
              >
                {errors.cnpj?.message}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ flexGrow: 1 }}
              >
                Confirmar
              </Button>
              <Button onClick={onClose} variant="contained" color="error" style={{ flexGrow: 1 }}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
