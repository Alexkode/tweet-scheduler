import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Image, Clock, Plus, Twitter } from "lucide-react";
import { useLocation } from "react-router-dom";

const NewPostPage = () => {
  const location = useLocation();
  const scheduledDate = location.state?.scheduledDate 
    ? new Date(location.state.scheduledDate)
    : new Date();

  const [date, setDate] = useState<Date | undefined>(scheduledDate);
  const [content, setContent] = useState("");
  const [time, setTime] = useState(
    scheduledDate.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  );
  const [thread, setThread] = useState<string[]>([""]);

  const addThreadPost = () => {
    setThread([...thread, ""]);
  };

  const updateThreadPost = (index: number, value: string) => {
    const newThread = [...thread];
    newThread[index] = value;
    setThread(newThread);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Create New Post</h1>
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
                    placeholder={index === 0 ? "What's on your mind?" : "Continue your thread..."}
                    className="min-h-[100px]"
                    value={post}
                    onChange={(e) => updateThreadPost(index, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="icon" onClick={addThreadPost}>
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
                  <Label>Schedule for</Label>
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
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="space-y-4">
                {thread.map((post, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                      <span className="font-medium">Preview</span>
                    </div>
                    <p className="text-sm">{post || "Your post preview will appear here"}</p>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4">Post to</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Twitter className="w-4 h-4 mr-2 text-[#1DA1F2]" />
                  Select Twitter Account
                </Button>
              </div>
            </Card>
            
            <Button className="w-full">Schedule Post</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewPostPage;