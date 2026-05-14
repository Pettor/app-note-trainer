import type { ReactElement } from "react";
import { lazy } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useHomeRoute } from "./-UseHomeRoute";
import { RouteError } from "~/core/routes/logic/RouteError";

const HomeView = lazy(() => import("~/views/home/HomeView").then((m) => ({ default: m.HomeView })));

export const Route = createFileRoute("/_public/home")({
  component: LoginPageRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function LoginPageRoute(): ReactElement {
  useDocumentTitle("Note Trainer");
  const homeProps = useHomeRoute();

  return (
    <>
      <HomeView {...homeProps} />
    </>
  );
}
