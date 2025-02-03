import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Image, Clock, Plus, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Post } from "@/types/schedule";
import { useAuth } from "@/hooks/useAuth";

const NewPostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  );
  const [thread, setThread] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);

  const addThreadPost = () => {
    setThread([...thread, ""]);
  };

  const updateThreadPost = (index: number, value: string) => {
    const newThread = [...thread];
    newThread[index] = value;
    setThread(newThread);
  };

  const handleSchedulePost = async () => {
    try {
      setIsLoading(true);

      if (!date || !time || !user) {
        toast.error("Veuillez sélectionner une date et une heure");
        return;
      }

      const [hours, minutes] = time.split(':');
      const scheduledDateTime = new Date(date);
      scheduledDateTime.setHours(parseInt(hours, 10));
      scheduledDateTime.setMinutes(parseInt(minutes, 10));

      // Create posts for each thread entry
      for (const content of thread) {
        if (!content.trim()) continue;

        const post: Post = {
          content: content.trim(),
          scheduled_date: scheduledDateTime.toISOString(),
          user_id: user.id,
        };

        const { error } = await supabase
          .from('scheduled_posts')
          .insert(post);

        if (error) {
          console.error('Error scheduling post:', error);
          toast.error("Échec de la programmation du post. Veuillez réessayer.");
          return;
        }
      }

      toast.success("Posts programmés avec succès");
      navigate('/scheduled');
    } catch (error) {
      console.error('Error:', error);
      toast.error("Une erreur inattendue s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Créer un nouveau post</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="p-4">
              {thread.map((post, index) => (
                <div key={index} className="space-y-4">
                  {index > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-4 bg-border mx-auto" />
                    </div>
                  )}
                  <Textarea
                    placeholder={index === 0 ? "Qu'avez-vous en tête ?" : "Continuez votre thread..."}
                    className="min-h-[100px] resize-none"
                    value={post}
                    onChange={(e) => updateThreadPost(index, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={addThreadPost}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Image className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Clock className="w-4 h-4" />
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <Label>Programmer pour</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-md border"
                />
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4">Aperçu</h2>
              <div className="space-y-4">
                {thread.map((post, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Send className="w-5 h-5 text-primary" />
                      <span className="font-medium">Aperçu</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">
                      {post || "Votre aperçu apparaîtra ici"}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
            
            <Button 
              className="w-full" 
              onClick={handleSchedulePost}
              disabled={isLoading}
            >
              {isLoading ? "Programmation..." : "Programmer le post"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewPostPage;