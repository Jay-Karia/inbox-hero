"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconTargetArrow } from "@tabler/icons-react";
import { statsAtom } from "@/atoms";
import { useAtom } from "jotai";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function DailyGoalButton() {
  const [stats, setStats] = useAtom(statsAtom);
  const [goal, setGoal] = useState(stats?.dailyGoal || 10);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useUser();
  const [isError, setIsError] = useState(false)

  const handleSaveGoal = async () => {
    if (!user) return;

    setIsUpdating(true);
    try {
      const statsData = { ...stats, dailyGoal: goal };
      const response = await axios.patch("/api/stats", statsData);
      setStats(response.data);
      setIsOpen(false);
      setIsError(false);
    } catch (error) {
      console.error("Error updating daily goal:", error);
      setIsError(true);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-sm hover:bg-gray-800"
        >
          <IconTargetArrow className="h-4 w-4" />
          <span>{stats?.dailyGoal || 10}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3">
        <div className="space-y-3">
          <h3 className="font-medium">Set Daily Goal</h3>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-gray-400">emails</span>
          </div>
          {isError && (
            <div className="text-sm text-red-500">
              Failed to update goal. Please try again.
            </div>
          )}
          <div className="flex justify-end">
            <Button size="sm" onClick={handleSaveGoal} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
