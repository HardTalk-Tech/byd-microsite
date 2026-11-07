import { ModelsScreen } from "@/components/models/ModelsScreen";
import { ScreenTransition } from "@/components/ui/ScreenTransition";

/** 03 Models */
export default function ModelsPage() {
  return (
    <ScreenTransition duration={700}>
      <ModelsScreen />
    </ScreenTransition>
  );
}
