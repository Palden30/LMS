import CookieHelper from "@/helpers/CookieHelper";
import {
  createApi,
  RootState,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5500/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as any;
    const token = CookieHelper.getCookie("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder: any) => ({}),
  tagTypes: ["Courses"],
});
