const apiEndpoints = {
  auth: {
    login: "/auth/login",
    changePassword: "/auth/change-password",
    forgotPassword: "/auth/forget-password",
    resetPassword: "/auth/reset-password",
  },
  user: {
    admin: "/users/admin",
    vendor: "/users/vendor",
    customer: "/users/customer",
    myInfo: "/auth/me",
  },
  vendor: {
    all: "/vendors",
    withId: (id) => `/vendors/${id}`,
  },
  admin: {
    all: "/admins",
    withId: (id) => `/admins/${id}`,
  },
  customer: {
    all: "/customer",
    withId: (id) => `/customer/${id}`,
  },

  // Reall api end point
  banner: {
    all: "/banner",
    withId: (id) => `/banner/${id}`,
  },
  service: {
    all: "/services",
    withId: (id) => `/services/${id}`,
  },
  portfolio: {
    all: "/portfolio",
    withId: (id) => `/portfolio/${id}`,
  },
  gallery: {
    all: "/galleries",
    withId: (id) => `/galleries/${id}`,
  },
  partner: {
    all: "/logos",
    withId: (id) => `/logos/${id}`,
  },
  team: {
    all: "/teams",
    withId: (id) => `/teams/${id}`,
  },
  testimonial: {
    all: "/testimonial",
    withId: (id) => `/testimonial/${id}`,
  },
  contact: {
    all: "/contact",
    withId: (id) => `/contact/${id}`,
  },
  quote: {
    all: "/quote",
    withId: (id) => `/quote/${id}`,
  },
  faq: {
    all: "/faq",
    withId: (id) => `/faq/${id}`,
  },
  director: {
    all: "/directors",
    withId: (id) => `/directors/${id}`,
  },
  overview: {
    all: "/overviews",
    withId: (id) => `/overviews/${id}`,
  },
  category: {
    all: "/category",
    withId: (id) => `/category/${id}`,
  },
  blog: {
    all: "/blog",
    withId: (id) => `/blog/${id}`,
  },
  serviceArea: {
    all: "/area",
    withId: (id) => `/area/${id}`,
  },
  certificate: {
    all: "/certificate",
    withId: (id) => `/certificate/${id}`,
  },
};

export const {
  admin,
  user,
  auth,
  vendor,

  banner,
  service,
  portfolio,
  gallery,
  team,
  testimonial,
  customer,
  contact,
  partner,
  quote,
  faq,
  overview,
  director,
  category,
  blog,
  serviceArea,
  certificate,

} = apiEndpoints;
