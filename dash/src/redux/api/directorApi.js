import { tagTypes } from "../tag-types";
import { director } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const directorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createDirector: builder.mutation({
      query: (formData) => ({
        url: director.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.director],
    }),
    getAllDirector: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: director.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.director],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleDirector: builder.query({
      query: (id) => ({
        url: director.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.director],
    }),

    updateDirector: builder.mutation({
      query: ({ id, data }) => ({
        url: director.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.director],
    }),

    deleteDirector: builder.mutation({
      query: (id) => ({
        url: director.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.director],
    }),
  }),
});

export const {
  useCreateDirectorMutation,
  useGetAllDirectorQuery,
  useLazyGetAllDirectorQuery,
  useGetSingleDirectorQuery,
  useUpdateDirectorMutation,
  useDeleteDirectorMutation,
} = directorApi;
