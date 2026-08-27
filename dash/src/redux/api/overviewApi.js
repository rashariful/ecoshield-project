import { tagTypes } from "../tag-types";
import { overview } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createOverview: builder.mutation({
      query: (formData) => ({
        url: overview.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.overview],
    }),
    getAllOverview: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: overview.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.overview],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleOverview: builder.query({
      query: (id) => ({
        url: overview.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.overview],
    }),

    updateOverview: builder.mutation({
      query: ({ id, data }) => ({
        url: overview.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.overview],
    }),

    deleteOverview: builder.mutation({
      query: (id) => ({
        url: overview.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.overview],
    }),
  }),
});

export const {
  useCreateOverviewMutation,
  useGetAllOverviewQuery,
  useLazyGetAllOverviewQuery,
  useGetSingleOverviewQuery,
  useUpdateOverviewMutation,
  useDeleteOverviewMutation,
} = overviewApi;
