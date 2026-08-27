import { tagTypes } from "../tag-types";
import { serviceArea } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const serviceAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createServiceArea: builder.mutation({
      query: (formData) => ({
        url: serviceArea.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.serviceArea],
    }),

    getAllServiceArea: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: serviceArea.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.serviceArea],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleServiceArea: builder.query({
      query: (id) => ({
        url: serviceArea.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.serviceArea],
    }),

    updateServiceArea: builder.mutation({
      query: ({ id, data }) => ({
        url: serviceArea.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.serviceArea],
    }),

    deleteServiceArea: builder.mutation({
      query: (id) => ({
        url: serviceArea.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.serviceArea],
    }),
  }),
});

export const {
  useCreateServiceAreaMutation,
  useGetAllServiceAreaQuery,
  useLazyGetAllServiceAreaQuery,
  useGetSingleServiceAreaQuery,
  useUpdateServiceAreaMutation,
  useDeleteServiceAreaMutation,
} = serviceAreaApi;
