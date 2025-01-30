import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useState } from "react";
import AutoScheduleConfigForm from "./AutoScheduleConfigForm";
import ImportDialog from "./ImportDialog";
import { usePostImport } from "@/hooks/usePostImport";
import { useScheduling } from "@/hooks/useScheduling";

const AutoScheduleForm = () => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const { importedPosts, handleFileUpload } = usePostImport();
  const {
    publicationsPerDay,
    selectedDays,
    publicationTimes,
    handlePublicationsPerDayChange,
    handleTimeChange,
    handleDayToggle,
    schedulePosts
  } = useScheduling();

  const handleSchedule = () => {
    const success = schedulePosts(importedPosts);
    if (success) {
      setShowImportDialog(false);
    }
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
        onSchedule={handleSchedule}
      />
    </>
  );
};

export default AutoScheduleForm;