import { isAdminGuard } from "src/middleware/auth";



const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "detalle/:ID", component: () => import("pages/DetallesPage.vue") },
      { path: "favorites", component: () => import("pages/FavoritosPage.vue") },
      {
        path: "/admin",
        name: "admin",
        component: () => import("pages/AdminPage.vue"),
        beforeEnter: isAdminGuard, // Aquí aplicas el middleware
      },
      {
        path: "/unauthorized",
        name: "unauthorized",
        component: () => import("pages/SinAutorizacionPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
