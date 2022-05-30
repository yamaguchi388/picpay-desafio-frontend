import { AuthService } from "./services/auth/auth.service";

export const routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthService],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then((m) => m.ProfileModule),
    canActivate: [AuthService],
  },
];
