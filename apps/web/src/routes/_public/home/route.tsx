import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useHomeRoute } from "./-UseHomeRoute";
import { RouteError } from "~/core/routes/logic/RouteError";
import { HomeView } from "~/views/home/HomeView";

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
