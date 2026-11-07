import { HomeScreen } from "@/components/home/HomeScreen";
import { ScreenTransition } from "@/components/ui/ScreenTransition";

/** 02 Home */
export default function HomePage() {
  return (
    <ScreenTransition duration={900}>
      <HomeScreen />
    </ScreenTransition>
  );
}
