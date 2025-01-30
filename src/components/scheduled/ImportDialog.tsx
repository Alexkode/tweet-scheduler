import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSchedule: () => void;
}

const ImportDialog = ({ open, onOpenChange, onFileUpload, onSchedule }: ImportDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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