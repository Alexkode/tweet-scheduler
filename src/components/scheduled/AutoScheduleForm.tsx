import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Twitter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { addDays, format, parse, setHours, setMinutes } from "date-fns";

interface MediaInfo {
  media_url: string;
  downloaded_filepath: string;
}

interface Post {
  content?: string;
  imageInfo?: MediaInfo[];
  videoInfo?: MediaInfo[];
}

const AutoScheduleForm = () => {
  const [publicationsPerDay, setPublicationsPerDay] = useState("1");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importedPosts, setImportedPosts] = useState<Post[]>([]);
  const [mediaFolder, setMediaFolder] = useState<FileSystemDirectoryHandle | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [publicationTimes, setPublicationTimes] = useState<string[]>(["09:00"]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const dirHandle = await window.showDirectoryPicker({
          mode: 'read'
        });
        setMediaFolder(dirHandle);

        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          const posts = text.split('\n')
            .filter(line => line.trim())
            .map(line => {
              const [content, imageInfoStr, videoInfoStr] = line.split(',').map(str => str?.trim());
              let imageInfo: MediaInfo[] = [];
              let videoInfo: MediaInfo[] = [];
              
              if (imageInfoStr) {
                try {
                  imageInfo = JSON.parse(imageInfoStr);
                } catch (e) {
                  console.error("Error parsing image info:", e);
                }
              }

              if (videoInfoStr) {
                try {
                  videoInfo = JSON.parse(videoInfoStr);
                } catch (e) {
                  console.error("Error parsing video info:", e);
                }
              }

              return { 
                content: content || undefined,
                imageInfo: imageInfo.length > 0 ? imageInfo : undefined,
                videoInfo: videoInfo.length > 0 ? videoInfo : undefined
              };
            });
          setImportedPosts(posts);
          console.log("Parsed posts:", posts);
        };
        reader.readAsText(file);
      } catch (err) {
        console.error("Error reading file or selecting directory:", err);
        toast.error("Erreur lors de la lecture du fichier ou de la sélection du dossier");
      }
    }
  };

  const handlePublicationsPerDayChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setPublicationsPerDay(value);
      // Update publication times array
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

    // Calculate schedule dates based on selected days and times
    const schedule = [];
    let currentDate = new Date();
    let postIndex = 0;

    while (postIndex < importedPosts.length) {
      const dayName = format(currentDate, 'EEEE').toLowerCase();
      
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
          <div className="space-y-4">
            <div>
              <Label>Nom</Label>
              <Input placeholder="Nouvelle liste automatique 1" />
            </div>

            <div>
              <Label>Compte</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un compte Twitter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account1">
                    <div className="flex items-center">
                      <Twitter className="w-4 h-4 mr-2 text-[#1DA1F2]" />
                      Compte Twitter 1
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Publications par jour</Label>
              <Input 
                type="number"
                min="1"
                value={publicationsPerDay}
                onChange={(e) => handlePublicationsPerDayChange(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Horaires de publication</Label>
              <div className="space-y-2 mt-2">
                {publicationTimes.map((time, index) => (
                  <Input 
                    key={index}
                    type="time"
                    value={time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Jours de publication</Label>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox 
                      id={day}
                      checked={selectedDays.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
                    />
                    <Label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1, 3)}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

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

      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Importer un fichier CSV</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Format attendu : CSV avec trois colonnes :<br />
              Colonne 1 : Texte du tweet (optionnel)<br />
              Colonne 2 : Information des images (JSON, optionnel)<br />
              Colonne 3 : Information des vidéos (JSON, optionnel)<br />
              <pre className="mt-2 p-2 bg-muted rounded-md overflow-x-auto">
                Mon super tweet,[{'"media_url":"https://example.com/image.jpg","downloaded_filepath":"/path/to/local/image.jpg"'}],[{'"media_url":"https://example.com/video.mp4","downloaded_filepath":"/path/to/local/video.mp4"'}]
              </pre>
            </p>
            <Input 
              type="file" 
              accept=".csv,.txt" 
              onChange={handleFileUpload}
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={schedulePosts}>
                Importer et programmer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AutoScheduleForm;