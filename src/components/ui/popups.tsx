import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { useAtom } from "jotai";
import { afterSessionPopUpsAtom } from "@/atoms";

export default function PopUps() {
  const [afterSessionPopUps, setAfterSessionPopUps] = useAtom(
    afterSessionPopUpsAtom
  );

  const handleClose = (type: "streak" | "dailyGoal") => {
    setAfterSessionPopUps((prev) => ({
      ...prev,
      [type]: undefined,
    }));
  };

  // Display daily goal pop up
  if (afterSessionPopUps.dailyGoal) {
    return (
      <>
        <Dialog open={afterSessionPopUps.dailyGoal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>🎉 Daily Goal Achieved!</DialogTitle>
              <DialogDescription>
                Congratulations! You&apos;ve successfully completed your daily goal.
                Keep up the great work!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => handleClose("dailyGoal")}>
                  Awesome!
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Display the streak pop up
  if (afterSessionPopUps.streak) {
    return (
      <>
        <Dialog open={afterSessionPopUps.streak}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>🎉 Streak Updated!</DialogTitle>
              <DialogDescription>
                Amazing! Your streak has been updated. Keep the momentum going!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => handleClose("streak")}>
                  Got it!
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return null;
}
