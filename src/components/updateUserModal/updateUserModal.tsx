import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { RegisterUserService, updateUserService } from "../../services/users.service";
import { userContext } from "../../context/usersContext";

interface iModal {
  open: boolean;
  onClose: () => void;
  user: any;
}

const UpdateModal = ({ open, onClose, user }: iModal) => {
  const schema = Yup.object().shape({
    username: Yup.string().required("nome de usuário é obrigatório"),
    email: Yup.string()
      .required("precisa fornecer e-mail")
      .email("insira um e-mail válido"),
    cpf: Yup.string()
      .required("cpf é obrigatório")
      .matches(/^\d{11}$/, "CPF inválido"),
    fullName: Yup.string().required("Nome completo é obrigatório")
  });

  const {populateUsers} = useContext(userContext)
  
  function shaveCpfString(cpf:string) {
    // Remove periods and hyphens from the CPF string
    if(cpf)
    return cpf.replace(/[.-]/g, '');
    
    return ""
  }


  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("cpf", shaveCpfString(user.cpf));
    setValue("fullName", user.fullName)
    console.log(user)
  }, [user]);

  const {
    control,
    handleSubmit,
    setValue,
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
            onSubmit={handleSubmit(async (data) => {await updateUserService({...data, role:user.role},user.id)
            console.log(data)
            onClose()  
            populateUsers()
            
          })}
            style={{ marginBottom: "16px" }}
          >
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
                name="fullName"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    onChange={onChange}
                    error={!!errors.cpf}
                    value={value}
                    label="nome completo"
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

            <Divider style={{ margin: "16px 0", borderStyle: "dashed" }} />

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
              <Button variant="contained" color="error" style={{ flexGrow: 1 }}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateModal;
