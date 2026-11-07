import { ShowroomsScreen } from "@/components/showrooms/ShowroomsScreen";
import { ScreenTransition } from "@/components/ui/ScreenTransition";

/** 05 Showrooms */
export default function ShowroomsPage() {
  return (
    <ScreenTransition duration={700}>
      <ShowroomsScreen />
    </ScreenTransition>
  );
}
