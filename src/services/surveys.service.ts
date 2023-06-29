import { toast } from "react-toastify";
import { api } from "./API";

export const getAllSurveys = async () => {
  const loadingUsers = toast.loading("carregando questionários", {
    toastId: "loading4",
    closeOnClick: true,
    autoClose: 2500,
    pauseOnHover: true,
  });
  try {
    const response = await api.get("surveys", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ4LCJpYXQiOjE2ODc4MDgxNjYsImV4cCI6MTY5MDQwMDE2Nn0.Bh1f0BLsK9IAhmePhkNlW2WppjJlK2UXMs1UPcHheUQ",
      },
    });
    toast.update(loadingUsers, {
      render: `questionários carregados com sucesso`,
      type: "success",
      isLoading: false,
      autoClose: 2500
    });

    return response.data.data;
  } catch (error: any) {
    toast.update(loadingUsers, {
      render:
        error instanceof Error ? `${error.message}` : "something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 2500
    });
    window.location.replace(`https://http.cat/${503}`);
  }
};

export const getSpecificSurvey = async (id: number) => {
  const loadingUsers = toast.loading("carregando questionário", {
    toastId: "loading5",
    closeOnClick: true,
    autoClose: 2500,
    pauseOnHover: true,
  });
  try {
    const response = await api.get(`questions/withAnswersInSurvey/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ4LCJpYXQiOjE2ODc4MDgxNjYsImV4cCI6MTY5MDQwMDE2Nn0.Bh1f0BLsK9IAhmePhkNlW2WppjJlK2UXMs1UPcHheUQ",
      },
    });

    toast.update(loadingUsers, {
      render: `questionário de id ${id} carregado com sucesso`,
      type: "success",
      isLoading: false,
      autoClose: 2500
    });

    return response.data.data;
  } catch (error: any) {
    toast.update(loadingUsers, {
      render:
        error instanceof Error ? `${error.message}` : "something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 2500
    });
    window.location.replace(`https://http.cat/${503}`);
  }
};
