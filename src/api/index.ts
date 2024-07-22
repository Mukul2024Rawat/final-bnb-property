import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const getApiUrl = (endpoint: string) =>
  `${API_BASE_URL}/${API_VERSION}/${endpoint}`;

export const api = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (data: { email: string; password: string }) => {
  return api.post(getApiUrl("auth/login"), data);
};

export const register = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  return api.post(getApiUrl("register"), data);
};

export const fetchUserProfile = () => {
  return api.get(getApiUrl("user/profile"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const fetchUserProfilePhoto = () => {
  return api.get(getApiUrl("user/image"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    responseType: "blob",
  });
};

export const updateUserProfile = (formData: FormData) => {
  return api.put(getApiUrl("user/profile"), formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "multipart/form-data",
    },
  });
};
export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  return api.patch(getApiUrl("user/change-password"), JSON.stringify(data), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const fetchUserBookings = () => {
  return api.get(getApiUrl("guest/booking"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const cancelBooking = (bookingId: string) => {
  return axios.patch(
    getApiUrl(`guest/booking/${bookingId}/cancel-booking`),
    { booking_status : "cancelled" },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const fetchHostProperties = () => {
  return api.get("property/host", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};