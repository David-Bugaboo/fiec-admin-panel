import { object } from "yup";
import { api } from "./API";
import { toast } from "react-toastify";
import { CloseButton } from "react-toastify/dist/components";
import { iLoginRequest } from "../types";
import { Navigate, redirect } from "react-router-dom";
import Cookies from "js-cookie"
export const loginService = async (data:iLoginRequest, keepLogged:boolean) => {
  const loadingUsers = toast.loading("Autenticando...", {
    toastId: "loading3",
    closeOnClick:true,
    autoClose: 2500,
    pauseOnHover:true
  });

  try{
    const response = await  api.post("auth/admin", data,{
      headers: { "Content-Type": "application/json" },
    })
    api.defaults.headers.common.authorization = `Bearer ${response.data.data.jwt}`
    if (keepLogged === true){
      Cookies.set('token', `Bearer ${response.data.data.jwt}`, {secure:true, sameSite:'strict'})
    }
    
    toast.update(loadingUsers, {
      render: `Logado com sucesso`,
      type: "success",
      isLoading: false,
      autoClose: 2500
    });
    return "sucess"
  }
  catch(error){
    toast.update(loadingUsers, {
      render:
        error instanceof Error ? `${error.message}` : "something went wrong",
      type: "warning",
      isLoading: false,
      autoClose: 2500
    });
  }
  return "error"

}





export const getUsersService = async () => {
  const loadingUsers = toast.loading("carregando usuários", {
    toastId: "loading3",
    closeOnClick:true,
    autoClose: 2500,
  });
  try {
    const response = await api.get("users/list/all", {
    });
    toast.update(loadingUsers, {
      render: `usuários carregados com sucesso`,
      type: "success",
      isLoading: false,
      autoClose: 2500
    });

    return response.data;
  } catch (error: any) {
    toast.update(loadingUsers, {
      render:
        error instanceof Error ? `${error.message}` : "something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 2500
      
    });
    console.log(error)
  }
};

export const RegisterUserService = async (data: any) => {
  /* ------------------------------ pre-register ------------------------------ */
  const loadingToast = toast.loading("Loading", {
    toastId: "loading1",
  });
  try {
    await api.post(
      "users",
      { username: data.username, email: data.email, role: data.role },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTExLCJpYXQiOjE2ODc1MjYwODQsImV4cCI6MTY5MDExODA4NH0.ok0dWsABkaQrl7IUKBxpvEGTzcutMZ9m4yKxmKH4l94",
        },
      }
    );
  } catch (error: any) {
    toast.update(loadingToast, {
      render:
        error instanceof Error ? `${error.message}` : "something went wrong",
      type: "error",
      isLoading: false,
    });
    return "";
  }
  /* ------------------------- get confirmation token ------------------------- */
  try {
    const response = await api.post(
      "auth/validateRegister",
      { email: data.email },
      { headers: { "Content-Type": "application/json" } }
    );
    const validatedData = response.data.data;
    console.log(validatedData);
    const reqData = {
      confirmationToken: validatedData.confirmationToken,
      user: {
        id: validatedData.id,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        confirmed: false,
        avatarPieces: null,
        cpf: data.cpf,
        password: data.password,
        role: roleToString(data.role),
      },
      business: {
        name: data.business,
        cnpj: data.cnpj,
      },
      employers: [],
    };
    console.log(reqData);
    await api.post("auth/completeRegister", reqData, {
      headers: { "Content-Type": "application/json" },
    });
    toast.update(loadingToast, {
      render: `usuário ${reqData.user.username} criado com sucesso`,
      type: "success",
      isLoading: false,
    });
  } catch (error: any) {
    toast.update(loadingToast, {
      render:
        error instanceof Error ? `${error.message}` : "something went wrong",
      type: "error",
      isLoading: false,
    });
    return "";
  }
  /* ---------------------------- registering user ---------------------------- */
};

export const BlockUserService = async (user: any) => {
  const loadingToast = toast.loading("bloqueando usuário", {
    toastId: "loading2",
  });
  console.log(user);
  const data = {
    password: "Test-123",
    cpf: user.cpf,
    role: stringToRole(user.role),
    blocked: true,
  };
  try {
    await api.post(`users/${user.id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTExLCJpYXQiOjE2ODc1MjYwODQsImV4cCI6MTY5MDExODA4NH0.ok0dWsABkaQrl7IUKBxpvEGTzcutMZ9m4yKxmKH4l94",
      },
    });

    toast.update(loadingToast, {
      render: `usuário bloqueado com sucesso`,
      type: "success",
      isLoading: false,
    });
  } catch (error) {
    toast.update(loadingToast, {
      render:
        error instanceof Error ? `${error.message}` : "something went wrong",
      type: "error",
      isLoading: false,
    });
  }
};

export const updateUserService = async (payload: any, id:number) => {
  const loadingToast = toast.loading("atualizando usuário", {
    toastId: "loading3",
    closeOnClick:true,
    autoClose: 2500,
    pauseOnHover:true
  });

  const data = {
    password: "Test-123",
    cpf: payload.cpf,
    role: stringToRole(payload.role),
    username: payload.username,
    email: payload.email,
    fullName:payload.fullName
  };

  try {
    await api.post(`users/${id}`, data, {
      headers: {
        "Content-Type": "application/json"
      },
    });

    toast.update(loadingToast, {
      render: `usuário atualizado com sucesso`,
      type: "success",
      isLoading: false,
      autoClose: 2500
    });
  } catch (error) {
    toast.update(loadingToast, {
      render:
        error instanceof Error ? `${error.message}` : "something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 2500
    });
  }

};



export const validateTokenService = async () => {
  try {
    const response = await api.get("users/me");
    return response.data.status;
  } catch (error: any) {
    toast.error("Seu usuário não pode ser autenticado, faça login.",{
      toastId:"warningId1",
      autoClose:2500,
      closeOnClick:true
    })
    return "failure"
  }
}

export const logout = () => {
  Cookies.remove('token')
}

const roleToString = (role: number) => {
  if (role === 1) return "Admin";
  if (role === 2) return "Public";
  if (role === 3) return "Employer";
  if (role === 4) return "Manager";
};

const stringToRole = (role: string) => {
  if (role === "Admin") return 1;
  if (role === "Public") return 2;
  if (role === "Employer") return 3;
  if (role === "Manager") return 4;
};