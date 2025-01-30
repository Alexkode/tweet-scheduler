import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addDays, setHours, setMinutes } from "date-fns";
import AutoScheduleConfigForm from "./AutoScheduleConfigForm";
import ImportDialog from "./ImportDialog";
import { Post } from "@/types/schedule";

const AutoScheduleForm = () => {
  const [publicationsPerDay, setPublicationsPerDay] = useState("1");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importedPosts, setImportedPosts] = useState<Post[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [publicationTimes, setPublicationTimes] = useState<string[]>(["09:00"]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          const posts = text.split('\n')
            .filter(line => line.trim())
            .map(line => {
              const [content, imageInfoStr, videoInfoStr] = line.split(',').map(str => str?.trim());
              let imageInfo = [];
              let videoInfo = [];
              
              try {
                if (imageInfoStr) {
                  imageInfo = JSON.parse(imageInfoStr);
                }
                if (videoInfoStr) {
                  videoInfo = JSON.parse(videoInfoStr);
                }
              } catch (e) {
                console.error("Error parsing media info:", e);
                toast.error("Erreur lors de la lecture des informations médias");
                return null;
              }

              return {
                content: content || undefined,
                imageInfo: imageInfo.length > 0 ? imageInfo : undefined,
                videoInfo: videoInfo.length > 0 ? videoInfo : undefined
              };
            })
            .filter((post): post is Post => post !== null);

          setImportedPosts(posts);
          console.log("Parsed posts:", posts);
          toast.success(`${posts.length} posts importés avec succès`);
        };

        reader.onerror = () => {
          toast.error("Erreur lors de la lecture du fichier");
        };

        reader.readAsText(file);
      } catch (err) {
        console.error("Error reading file:", err);
        toast.error("Erreur lors de la lecture du fichier");
      }
    }
  };

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

  const schedulePosts = () => {
    if (importedPosts.length === 0) {
      toast.error("Aucun post à programmer");
      return;
    }

    if (selectedDays.length === 0) {
      toast.error("Veuillez sélectionner au moins un jour de publication");
      return;
    }

    if (publicationTimes.length === 0) {
      toast.error("Veuillez définir au moins un horaire de publication");
      return;
    }

    const schedule = [];
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

    console.log("Scheduled posts:", schedule);
    toast.success(`${schedule.length} posts programmés avec succès`);
    setShowImportDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Modifier la liste automatique</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AutoScheduleConfigForm 
            publicationsPerDay={publicationsPerDay}
            onPublicationsPerDayChange={handlePublicationsPerDayChange}
            publicationTimes={publicationTimes}
            onTimeChange={handleTimeChange}
            selectedDays={selectedDays}
            onDayToggle={handleDayToggle}
          />

          <div>
            <Label>Contenu de la liste automatique</Label>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowImportDialog(true)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Ajouter à partir d'un fichier (CSV)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ImportDialog 
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onFileUpload={handleFileUpload}
        onSchedule={schedulePosts}
      />
    </>
  );
};

export default AutoScheduleForm;