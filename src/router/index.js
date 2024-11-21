import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/vips",
    name: "vips",
    component: () =>
      import(/* webpackChunkName: "vips" */ "../views/VipsView.vue"),
  },
  {
    path: "/refpoint",
    name: "refpoint",
    component: () =>
      import(/* webpackChunkName: "refpoint" */ "../views/RefPointView.vue"),
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;