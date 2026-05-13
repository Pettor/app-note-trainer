import type { ReactElement } from "react";
import { useDocumentTitle } from "@package/react";
import { createFileRoute } from "@tanstack/react-router";
import { usePracticeRoute } from "./-UsePracticeRoute";
import { RouteError } from "~/core/routes/logic/RouteError";
import { PracticeView } from "~/views/practice/PracticeView";

export const Route = createFileRoute("/_public/practice")({
  component: PracticeRoute,
  errorComponent: ({ error }) => <RouteError error={error} />,
});

function PracticeRoute(): ReactElement {
  useDocumentTitle("Practice — Note Trainer");
  const practiceProps = usePracticeRoute();

  return <PracticeView {...practiceProps} />;
}
