import type { WidgetRef } from "../types";
import VetoCalculator from "./VetoCalculator";

/** Renders the interactive piece a section asks for. Add new widgets here and to WidgetRef. */
export default function Widget({ widget }: { widget: WidgetRef }) {
  switch (widget.key) {
    case "veto-calculator":
      return <VetoCalculator {...widget.props} />;
  }
}
