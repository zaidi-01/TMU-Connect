import AdDetails from "@/components/AdDetails.vue";
import AdminPage from "@/components/AdminPage.vue";
import CommunicationPage from "@/components/CommunicationPage.vue";
import Home from "@/components/Home.vue";
import LoginPage from "@/components/LoginPage.vue";
import NewPost from "@/components/NewPost.vue";
import SignupPage from "@/components/SignupPage.vue";
import { authService } from "@/services";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/admin",
    name: "Admin",
    component: AdminPage,
  },

  {
    path: "/new-post",
    name: "NewPost",
    component: NewPost,
  },

  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },

  {
    path: "/register",
    name: "Register",
    component: SignupPage,
  },

  {
    path: "/messages",
    name: "Messages",
    component: CommunicationPage,
  },

  {
    path: "/ad/{id}",
    name: "AdDetails",
    component: AdDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const adminPages = ["/admin"];
  const publicPages = ["/login", "/register"];
  const adminRequired = adminPages.includes(to.path);
  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    const isAuthenticated = await authService.isAuthenticated();

    if (!isAuthenticated) {
      console.log("User is not authenticated. Redirecting to login page.");
      return next("/login");
    }
  }

  if (adminRequired) {
    const isAdmin = await authService.isAdmin();

    if (!isAdmin) {
      console.log("User is not an admin. Redirecting to home page.");
      return next("/");
    }
  }

  next();
});

export default router;
