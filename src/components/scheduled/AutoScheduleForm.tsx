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

interface Post {
  content: string;
  mediaInfo: {
    media_url: string;
    downloaded_filepath: string;
  }[];
}

const AutoScheduleForm = () => {
  const [publicationsPerDay, setPublicationsPerDay] = useState("1");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importedPosts, setImportedPosts] = useState<Post[]>([]);
  const [mediaFolder, setMediaFolder] = useState<FileSystemDirectoryHandle | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Demander à l'utilisateur de sélectionner le dossier contenant les médias
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
              const [content, mediaInfoStr] = line.split(',').map(str => str.trim());
              let mediaInfo;
              try {
                mediaInfo = JSON.parse(mediaInfoStr);
              } catch (e) {
                console.error("Error parsing media info:", e);
                mediaInfo = [];
              }
              return { content, mediaInfo };
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
    }
  };

  const handleImport = async () => {
    if (!mediaFolder) {
      toast.error("Veuillez d'abord sélectionner le dossier contenant les médias");
      return;
    }

    try {
      // Ici vous pouvez ajouter la logique pour programmer les posts
      console.log("Posts à programmer:", importedPosts);
      console.log("Dossier médias sélectionné:", mediaFolder);
      
      setShowImportDialog(false);
      toast.success("Posts importés avec succès");
    } catch (err) {
      console.error("Error importing posts:", err);
      toast.error("Erreur lors de l'importation des posts");
    }
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
                  <SelectItem value="account2">
                    <div className="flex items-center">
                      <Twitter className="w-4 h-4 mr-2 text-[#1DA1F2]" />
                      Compte Twitter 2
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Fuseau horaire</Label>
              <Select defaultValue="Europe/Paris">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un fuseau horaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                  <SelectItem value="America/New_York">America/New York</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
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
                {Array.from({ length: Number(publicationsPerDay) }, (_, i) => (
                  <Input key={i} type="time" defaultValue="09:00" />
                ))}
              </div>
            </div>

            <div>
              <Label>Jours de publication</Label>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={day} />
                    <Label htmlFor={day}>{day}</Label>
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
              Format attendu : CSV avec deux colonnes :<br />
              Colonne 1 : Texte du tweet<br />
              Colonne 2 : Information du média (JSON)<br />
              <pre className="mt-2 p-2 bg-muted rounded-md">
                Mon super tweet,[{'"media_url":"https://example.com/image.jpg","downloaded_filepath":"/path/to/local/image.jpg"'}]
              </pre>
            </p>
            <Input 
              type="file" 
              accept=".csv,.txt" 
              onChange={handleFileUpload}
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={handleImport}>
                Importer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AutoScheduleForm;