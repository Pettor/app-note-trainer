import type { ReactElement } from "react";
import { lazy } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { useScoreRoute } from "./-UseScoreRoute";
import { RouteError } from "~/core/routes/logic/RouteError";

const ScoreView = lazy(() => import("~/views/score/ScoreView").then((m) => ({ default: m.ScoreView })));

export const Route = createFileRoute("/_public/score")({
  component: ScoreRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function ScoreRoute(): ReactElement | null {
  useDocumentTitle("Session Results — Note Trainer");
  const props = useScoreRoute();

  if (!props) return null;
  return <ScoreView {...props} />;
}
