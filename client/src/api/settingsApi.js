import axiosInstance from "./axios";

/*  GET PROFILE  */
export const getProfile = async () => {
  const { data } = await axiosInstance.get("/settings/profile");
  return data;
};


export const updateProfile = async (name) => {
  const { data } = await axiosInstance.put("/settings/profile", {
    name,
  });
  return data;
};


/* CHANGE PASSWORD  */
export const changePassword = async (password) => {
  const { data } = await axiosInstance.put("/settings/password", {
    password,
  });
  return data;
};
