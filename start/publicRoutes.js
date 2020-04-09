import { lazy } from "react";

const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../components/public/Landing"))
  },
  {
    path: "/organizationdetails",
    exact: true,
    component: lazy(() =>
      import("../components/organizations/OrganizationDetails")
    )
  },
  {
    path: "/register/:token",
    exact: true,
    component: lazy(() => import("../components/organizations/acceptInvite"))
  },
  {
    path: "/initialsetup",
    exact: true,
    component: lazy(() =>
      import("../components/userprofiles/UserProfileWizard")
    )
  },
  {
    path: "/orgSetup",
    exact: true,
    component: lazy(() =>
      import("../components/organizations/OrganizationRegistration")
    )
  },
  {
    path: "/register",
    exact: true,
    component: lazy(() => import("../components/register/Register"))
  },
  {
    path: "/contact-us",
    exact: true,
    component: lazy(() => import("../components/contactUs/ContactUs"))
  },
  {
    path: "/about",
    exact: true,
    component: lazy(() => import("../components/public/about/About"))
  },
  {
    path: "/forgot-password",
    exact: true,
    component: lazy(() =>
      import("../components/recoverPassword/ForgotPassword")
    )
  },
  {
    path: "/resetpassword/:token",
    exact: true,
    component: lazy(() => import("../components/recoverPassword/ResetPassword"))
  },
  {
    path: "/recover",
    exact: true,
    component: lazy(() => import("../components/Blank"))
  },
  {
    path: "/lock",
    exact: true,
    component: lazy(() => import("../components/Blank"))
  },
  {
    path: "/error500",
    exact: true,
    component: lazy(() => import("../components/Blank"))
  },
  {
    path: "/maintenance",
    exact: true,
    component: lazy(() => import("../components/Blank"))
  },
  {
    path: "/confirm/:id/:token",
    exact: true,
    component: lazy(() => import("../components/register/ConfirmationEmail"))
  },
  {
    path: "/articles",
    exact: true,
    component: lazy(() => import("../components/public/blogs/BlogTable"))
  },
  {
    path: "/article/:id/details",
    exact: true,
    component: lazy(() => import("../components/public/blogs/BlogPost"))
  },
  {
    path: "/faq",
    exact: true,
    component: lazy(() => import("../components/public/faqs/Faq"))
  },
  {
    path: "/jobs",
    exact: true,
    component: lazy(() => import("../components/public/jobs/Jobs"))
  },
  {
    path: "/job/posting/:id/details",
    exact: true,
    component: lazy(() => import("../components/public/jobs/JobDetails"))
  }
];
const listOfPages = publicRoutes.map(item => item.path.split("/")[1] || "/");
export { publicRoutes, listOfPages };
