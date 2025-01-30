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

const AutoScheduleForm = () => {
  const [publicationsPerDay, setPublicationsPerDay] = useState("1");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importStep, setImportStep] = useState(1);
  const [importedPosts, setImportedPosts] = useState<Array<{ content: string, isValid: boolean }>>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const posts = text.split('\n')
          .filter(line => line.trim())
          .map(content => ({ content, isValid: true }));
        setImportedPosts(posts);
        setImportStep(2);
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
                onClick={() => {
                  setShowImportDialog(true);
                  setImportStep(1);
                  setImportedPosts([]);
                }}
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
            <DialogTitle>
              {importStep === 1 ? "Importer un fichier CSV" : "Prévisualisation des posts"}
            </DialogTitle>
          </DialogHeader>

          {importStep === 1 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Format attendu : Un post par ligne. Exemple :
                <pre className="mt-2 p-2 bg-muted rounded-md">
                  Premier post #hashtag{"\n"}
                  Deuxième post avec #autrehashtag{"\n"}
                  Troisième post 🚀
                </pre>
              </p>
              <Input 
                type="file" 
                accept=".csv,.txt" 
                onChange={handleFileUpload}
              />
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {importedPosts.map((post, index) => (
                <div key={index} className="relative p-4 border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      const newPosts = [...importedPosts];
                      newPosts.splice(index, 1);
                      setImportedPosts(newPosts);
                    }}
                  >
                    ✕
                  </Button>
                  <Textarea
                    value={post.content}
                    onChange={(e) => {
                      const newPosts = [...importedPosts];
                      newPosts[index].content = e.target.value;
                      setImportedPosts(newPosts);
                    }}
                    className="min-h-[100px]"
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2 sticky bottom-0 bg-background pt-4">
                <Button variant="outline" onClick={() => setImportStep(1)}>
                  Retour
                </Button>
                <Button onClick={() => {
                  setShowImportDialog(false);
                  // Ici nous programmerions les posts
                  console.log("Posts à programmer:", importedPosts);
                }}>
                  Valider et programmer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AutoScheduleForm;