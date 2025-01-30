import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Twitter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Post {
  content: string;
  mediaUrl: string;
}

const AutoScheduleForm = () => {
  const [publicationsPerDay, setPublicationsPerDay] = useState("1");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importedPosts, setImportedPosts] = useState<Post[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const posts = text.split('\n')
          .filter(line => line.trim())
          .map(line => {
            const [content, mediaUrl] = line.split(',').map(str => str.trim());
            return { content, mediaUrl };
          });
        setImportedPosts(posts);
      };
      reader.readAsText(file);
    }
  };

  const handlePublicationsPerDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPublicationsPerDay(value);
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
              <Button variant="outline" className="w-full justify-start mt-2">
                <Twitter className="w-4 h-4 mr-2 text-[#1DA1F2]" />
                Sélectionner un compte Twitter
              </Button>
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
                onChange={handlePublicationsPerDayChange}
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
              Colonne 2 : Lien de l'image ou de la vidéo<br />
              <pre className="mt-2 p-2 bg-muted rounded-md">
                Mon super tweet,https://example.com/image.jpg{"\n"}
                Un autre tweet cool,https://example.com/video.mp4
              </pre>
            </p>
            <Input 
              type="file" 
              accept=".csv,.txt" 
              onChange={handleFileUpload}
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={() => {
                setShowImportDialog(false);
                // Ici nous programmerions les posts
                console.log("Posts à programmer:", importedPosts);
              }}>
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