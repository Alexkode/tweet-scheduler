import { useState } from "react";
import { addDays, setHours, setMinutes } from "date-fns";
import { Post } from "@/types/schedule";
import { toast } from "sonner";
import { useScheduledPosts } from "./useScheduledPosts";

export const useScheduling = () => {
  const [publicationsPerDay, setPublicationsPerDay] = useState("1");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [publicationTimes, setPublicationTimes] = useState<string[]>(["09:00"]);
  const { addScheduledPosts } = useScheduledPosts();

  const handlePublicationsPerDayChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setPublicationsPerDay(value);
      const times = Array(Number(value)).fill("09:00");
      setPublicationTimes(times);
    }
  };

  const handleTimeChange = (index: number, time: string) => {
    const newTimes = [...publicationTimes];
    newTimes[index] = time;
    setPublicationTimes(newTimes);
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const schedulePosts = async (importedPosts: Post[]) => {
    if (importedPosts.length === 0) {
      toast.error("Aucun post à programmer");
      return false;
    }

    if (selectedDays.length === 0) {
      toast.error("Veuillez sélectionner au moins un jour de publication");
      return false;
    }

    if (publicationTimes.length === 0) {
      toast.error("Veuillez définir au moins un horaire de publication");
      return false;
    }

    const schedule: { post: Post; scheduledDate: Date }[] = [];
    let currentDate = new Date();
    let postIndex = 0;

    while (postIndex < importedPosts.length) {
      const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(currentDate).toLowerCase();
      
      if (selectedDays.includes(dayName)) {
        for (const time of publicationTimes) {
          if (postIndex >= importedPosts.length) break;

          const [hours, minutes] = time.split(':').map(Number);
          const scheduleDate = setMinutes(setHours(currentDate, hours), minutes);

          schedule.push({
            post: importedPosts[postIndex],
            scheduledDate: scheduleDate
          });

          postIndex++;
        }
      }

      currentDate = addDays(currentDate, 1);
    }

    try {
      await addScheduledPosts.mutateAsync(schedule);
      return true;
    } catch (error) {
      console.error("Error scheduling posts:", error);
      return false;
    }
  };

  return {
    publicationsPerDay,
    selectedDays,
    publicationTimes,
    handlePublicationsPerDayChange,
    handleTimeChange,
    handleDayToggle,
    schedulePosts
  };
};