import { createBrowserRouter } from "react-router";
import { LoginView } from "./components/LoginView";
import { MainLayout } from "./components/MainLayout";
import { WorkspaceView } from "./components/WorkspaceView";
import { ChatView } from "./components/ChatView";
import { QuizView } from "./components/QuizView";
import { ProfileView } from "./components/ProfileView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginView,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: WorkspaceView },
      { path: "workspace", Component: WorkspaceView },
      { path: "chat", Component: ChatView },
      { path: "quiz", Component: QuizView },
      { path: "profile", Component: ProfileView },
    ],
  },
]);
