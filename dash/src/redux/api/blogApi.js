import { tagTypes } from "../tag-types";
import { blog } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createBlog: builder.mutation({
      query: (data) => ({
        url: blog.all,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    getAllBlog: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: blog.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.blog],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: blog.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    updateBlog: builder.mutation({
      query: ({id, data}) => ({
        url: blog.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: blog.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogQuery,
  useLazyGetAllBlogQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
