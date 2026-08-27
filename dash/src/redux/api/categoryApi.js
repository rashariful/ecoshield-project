import { tagTypes } from "../tag-types";
import { category } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (formData) => ({
        url: category.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    getAllCategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: category.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.category],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleCategory: builder.query({
      query: (id) => ({
        url: category.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    updateCategory: builder.mutation({
      query: ({id, data}) => ({
        url: category.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: category.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
