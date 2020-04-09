import { lazy } from "react";

const privateRoutes = [
  {
    path: "/dash",
    exact: true,
    roles: ["Admin", "Organization", "Seeker", "OrgMembers"],
    component: lazy(() => import("../components/Blank"))
  },
  {
    path: "/admin/dashboard",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/dashboard/Dashboard"))
  },
  {
    path: "/organization/new",
    exact: true,
    roles: ["Admin", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/organizations/OrgForm"))
  },
  {
    path: "/organization/dashboard",
    exact: true,
    roles: ["Organization"],
    component: lazy(() => import("../components/dashboard/OrganizationMain"))
  },
  {
    path: "/organization/:id/dashboard",
    exact: true,
    roles: ["Organization", "OrgMembers"],
    component: lazy(() =>
      import("../components/dashboard/OrganizationDashboard")
    )
  },
  {
    path: "/organizations",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/organizations/Organizations")),
  },
  {
    path: "/organization/:id",
    exact: true,
    roles: ["Admin", "Organization", "OrgMembers", "Seeker"],
    component: lazy(() => import("../components/organizations/OrgViewMoreCard"))
  },
  {
    path: "/organizations/invite",
    exact: true,
    roles: ["Admin", "Organization"],
    component: lazy(() => import("../components/organizations/inviteForm"))
  },
  {
    path: "/organization/:id/edit",
    exact: true,
    roles: ["Admin", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/organizations/OrgForm"))
  },
  {
    path: "/organizations",
    exact: true,
    roles: ["Seeker", "Organization", "OrgMembers"],
    component: lazy(() =>
      import("../components/organizations/OrganizationForUser")
    )
  },
  {
    path: "/venues",
    exact: true,
    roles: ["Admin", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/venue/Venue"))
  },
  {
    path: "/venue/new",
    exact: true,
    roles: ["Admin", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/venue/VenueForm"))
  },
  {
    path: "/venue/:id/edit",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/venue/VenueForm"))
  },
  {
    path: "/admin/faq",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/faqs/Faq"))
  },
  {
    path: "/admin/faq/new",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/faqs/FaqForm"))
  },
  {
    path: "/admin/faq/:id/edit",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/faqs/FaqForm"))
  },
  {
    path: "/seekers",
    exact: true,
    roles: ["Admin", "Seeker", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/seeker/Seeker"))
  },
  {
    path: "/seeker/:id/details",
    exact: true,
    roles: ["Admin", "Seeker", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/userprofiles/SeekerDetails"))
  },
  {
    path: "/seeker/:id/edit",
    exact: true,
    roles: ["Seeker"],
    component: lazy(() =>
      import("../components/userprofiles/SelectedUserProfile")
    )
  },
  {
    path: "/seeker/dashboard",
    exact: true,
    roles: ["Seeker"],
    component: lazy(() => import("../components/dashboard/SeekerDashboard"))
  },
  {
    path: "/threads",
    exact: true,
    roles: ["Admin", "Organizations", "OrgMembers", "Seeker"],
    component: lazy(() => import("../components/threads/Threads"))
  },
  {
    path: "/thread/new",
    exact: true,
    roles: ["Admin", "Organizations", "OrgMembers", "Seeker"],
    component: lazy(() => import("../components/threads/ThreadForm"))
  },
  {
    path: "/threads/:id/edit",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/threads/ThreadForm"))
  },
  {
    path: "/threads/:id",
    exact: true,
    roles: ["Admin", "Organizations", "OrgMembers", "Seeker"],
    component: lazy(() => import("../components/threads/ThreadCardS"))
  },
  {
    path: "/locations",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/location/Location"))
  },
  {
    path: "/location/new",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/location/LocationForm"))
  },
  {
    path: "/location/:id/edit",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/location/LocationForm"))
  },
  {
    path: "/listings",
    exact: true,
    roles: ["Seeker", "Admin"],
    component: lazy(() => import("../components/jobs/Jobs"))
  },
  {
    path: "/listings/applied",
    exact: true,
    roles: ["Seeker"],
    component: lazy(() => import("../components/jobs/JobsApplied"))
  },
  {
    path: "/organization/:orgId/jobs",
    exact: true,
    roles: ["Admin", "Organizations", "OrgMembers"],
    component: lazy(() => import("../components/jobs/OrgJobs"))
  },
  {
    path: "/organization/:orgId/job/new",
    exact: true,
    roles: ["Admin", "Organizations", "OrgMembers"],
    component: lazy(() => import("../components/jobs/OrgJobForm"))
  },
  {
    path: "/organization/:orgId/job/:id/edit",
    exact: true,
    roles: ["Admin", "Organizations", "OrgMembers"],
    component: lazy(() => import("../components/jobs/OrgJobForm"))
  },
  {
    path: "/organization/:orgId/job/:id/details",
    exact: true,
    roles: ["Admin", "Organizations", "OrgMembers", "Seeker"],
    component: lazy(() => import("../components/jobs/OrgJobDetails"))
  },
  {
    path: "/messages",
    exact: true,
    roles: ["Admin"],
    component: lazy(() => import("../components/message/Message"))
  },
  {
    path: "/blogs/explore",
    exact: true,
    roles: ["Admin", "Organization", "OrgMembers", "Seeker"],
    component: lazy(() => import("../components/blogs/BlogTable"))
  },
  {
    path: "/blogs/:id/details",
    exact: true,
    roles: ["Admin", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/blogs/BlogPost"))
  },
  {
    path: "/blogs/create",
    exact: true,
    roles: ["Admin", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/blogs/BlogForm"))
  },
  {
    path: "/events",
    exact: true,
    roles: ["Admin", "Seeker", "Organization"],
    component: lazy(() => import("../components/events/Events"))
  },
  {
    path: "/events/new",
    exact: true,
    roles: ["Admin", "Seeker", "Organization"],
    component: lazy(() => import("../components/events/MultiStepForm"))
  },
  {
    path: "/events/:id",
    exact: true,
    roles: ["Admin", "Seeker", "Organization"],
    component: lazy(() => import("../components/events/EventInfo"))
  },
  {
    path: "/skills",
    exact: true,
    roles: ["Admin", "Seeker", "Organization", "OrgMembers"],
    component: lazy(() => import("../components/skills/Skills"))
  },
  {
    path: "/file/download",
    exact: true,
    roles: ["Admin", "Seeker"],
    component: lazy(() => import("../components/file/Download"))
  }
];

export default privateRoutes;
