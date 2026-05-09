import type { ReactElement } from "react";
import { Suspense } from "react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { RouteLoading } from "~/core/routes/logic/RouteLoading";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout(): ReactElement {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Outlet />
    </Suspense>
  );
}
