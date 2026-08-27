import { tagTypes } from "../tag-types";
import { certificate } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createCertificate: builder.mutation({
      query: (formData) => ({
        url: certificate.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.certificate],
    }),

    getAllCertificate: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: certificate.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.certificate],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleCertificate: builder.query({
      query: (id) => ({
        url: certificate.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.certificate],
    }),

    updateCertificate: builder.mutation({
      query: ({ id, data }) => ({
        url: certificate.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.certificate],
    }),

    deleteCertificate: builder.mutation({
      query: (id) => ({
        url: certificate.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.certificate],
    }),
  }),
});

export const {
  useCreateCertificateMutation,
  useGetAllCertificateQuery,
  useLazyGetAllCertificateQuery,
  useGetSingleCertificateQuery,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} = certificateApi;
