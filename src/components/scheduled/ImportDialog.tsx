import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useState } from "react";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSchedule: () => void;
}

const ImportDialog = ({ open, onOpenChange, onFileUpload, onSchedule }: ImportDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const exampleCSV = `Mon super tweet,[{"media_url":"https://example.com/image.jpg","downloaded_filepath":"/path/to/local/image.jpg"}],[{"media_url":"https://example.com/video.mp4","downloaded_filepath":"/path/to/local/video.mp4"}]`;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
        toast.error("Le fichier doit être au format CSV ou TXT");
        return;
      }
      setSelectedFile(file);
      onFileUpload(event);
    }
  };

  const handleImport = () => {
    if (!selectedFile) {
      toast.error("Veuillez sélectionner un fichier");
      return;
    }

    try {
      onSchedule();
    } catch (error) {
      toast.error("Erreur lors de l'importation du fichier");
      console.error("Import error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Importer un fichier CSV</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Format attendu : CSV avec trois colonnes :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Colonne 1 : Texte du tweet (optionnel)</li>
              <li>Colonne 2 : Information des images (JSON, optionnel)</li>
              <li>Colonne 3 : Information des vidéos (JSON, optionnel)</li>
            </ul>
            <ScrollArea className="h-24 w-full rounded-md border mt-2">
              <pre className="p-4 text-xs whitespace-pre-wrap break-all">
                {exampleCSV}
              </pre>
            </ScrollArea>
          </div>
          <Input 
            type="file" 
            accept=".csv,.txt" 
            onChange={handleFileSelect}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button onClick={handleImport} disabled={!selectedFile}>
              Importer et programmer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;