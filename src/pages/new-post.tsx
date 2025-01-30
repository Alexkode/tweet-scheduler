import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Image, Clock } from "lucide-react";

const NewPostPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [content, setContent] = useState("");

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="p-4">
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="icon">
                  <Image className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Clock className="w-4 h-4" />
                </Button>
              </div>
            </Card>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="border rounded-lg p-4 min-h-[200px]">
              {content || "Your post preview will appear here"}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewPostPage;