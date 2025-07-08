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
import { useEffect } from "react";

export default function PopUps() {
  const [afterSessionPopUps, setAfterSessionPopUps] = useAtom(
    afterSessionPopUpsAtom
  );

  // Check localStorage for popup reset on component mount
  useEffect(() => {
    // Get the current date (YYYY-MM-DD format)
    const today = new Date().toISOString().split("T")[0];

    // Get the last popup date from localStorage
    const lastPopupDate = localStorage.getItem("lastPopupDate");

    // If it's a new day or no record exists, reset popup flags
    if (!lastPopupDate || lastPopupDate !== today) {
      alert("Resetting popups for a new day!");
      setAfterSessionPopUps((prev) => ({
        ...prev,
        openedToday: false,
      }));

      // Store today's date
      localStorage.setItem("lastPopupDate", today);
    }
  }, [setAfterSessionPopUps]);

  const handleClose = (type: "streak" | "dailyGoal") => {
    // Check if all popups will be closed after this action
    const isAllPopUpsClosed = !Object.values({
      ...afterSessionPopUps,
      [type]: false,
    }).some((value) => typeof value === "boolean" && value === true);

    // Update the popup state
    setAfterSessionPopUps((prev) => ({
      ...prev,
      openedToday: isAllPopUpsClosed,
      [type]: false,
    }));

    // If this is the last popup being closed, mark today as "seen" in localStorage
    if (isAllPopUpsClosed) {
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem("lastPopupDate", today);
      localStorage.setItem("popupsShownToday", "true");
    }
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
                Congratulations! You&apos;ve successfully completed your daily
                goal. Keep up the great work!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => handleClose("dailyGoal")}
                >
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
