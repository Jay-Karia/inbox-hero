import { Label } from "./label";
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

  const handleClose = () => {
    setAfterSessionPopUps({
      openedToday: true,
      isOpen: false,
      streak: false,
      dailyGoal: false,
    });
  };

  return (
    <>
      <Dialog open={afterSessionPopUps.isOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
