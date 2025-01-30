import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSchedule: () => void;
}

const ImportDialog = ({ open, onOpenChange, onFileUpload, onSchedule }: ImportDialogProps) => {
  const exampleCSV = `Mon super tweet,[{"media_url":"https://example.com/image.jpg","downloaded_filepath":"/path/to/local/image.jpg"}],[{"media_url":"https://example.com/video.mp4","downloaded_filepath":"/path/to/local/video.mp4"}]`;

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
              <pre className="p-4 text-xs">
                {exampleCSV}
              </pre>
            </ScrollArea>
          </div>
          <Input 
            type="file" 
            accept=".csv,.txt" 
            onChange={onFileUpload}
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={onSchedule}>
              Importer et programmer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;