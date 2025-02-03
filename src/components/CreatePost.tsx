import { useState } from "react";
import PostTextArea from "./PostTextArea";
import PostActions from "./PostActions";
import MediaUpload from "./MediaUpload";
import PostPreview from "./PostPreview";
import ThreadManager from "./ThreadManager";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface ThreadPost {
  id: string;
  text: string;
  media: string[];
  isCollapsed?: boolean;
}

const CreatePost = () => {
  const isMobile = useIsMobile();
  const [text, setText] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [isThreadMode, setIsThreadMode] = useState(false);
  const [threadPosts, setThreadPosts] = useState<ThreadPost[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<string | null>("main");

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Create Post</h1>
          </div>
          
          {!isThreadMode ? (
            <>
              <PostTextArea value={text} onChange={setText} />
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1 w-full">
                  <MediaUpload onUpload={(url) => setMedia([...media, url])} />
                  {media.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {media.map((url, index) => (
                        <img key={index} src={url} alt="" className="rounded-lg w-full h-48 object-cover" />
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!isThreadMode) {
                      setIsThreadMode(true);
                      const newPostId = Date.now().toString();
                      setThreadPosts([
                        {
                          id: "main",
                          text: text,
                          media: media,
                          isCollapsed: false
                        },
                        {
                          id: newPostId,
                          text: "",
                          media: [],
                          isCollapsed: false
                        },
                      ]);
                      setExpandedPostId(newPostId);
                    }
                  }}
                  className="mt-2 w-full sm:w-auto"
                >
                  Start Thread
                </Button>
              </div>
            </>
          ) : (
            <ThreadManager
              threadPosts={threadPosts}
              setThreadPosts={setThreadPosts}
              expandedPostId={expandedPostId}
              setExpandedPostId={setExpandedPostId}
              isThreadMode={isThreadMode}
              setIsThreadMode={setIsThreadMode}
              text={text}
              media={media}
            />
          )}
          <PostActions />
        </div>
      </div>

      <div className="lg:w-[350px] bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:sticky lg:top-4">
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <PostPreview 
                text={isThreadMode ? threadPosts[0]?.text : text} 
                media={isThreadMode ? threadPosts[0]?.media : media}
                threadPosts={isThreadMode ? threadPosts.slice(1) : []}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[95vw] lg:w-[425px] lg:max-w-[425px] max-h-[90vh]">
            <PostPreview 
              text={isThreadMode ? threadPosts[0]?.text : text} 
              media={isThreadMode ? threadPosts[0]?.media : media}
              threadPosts={isThreadMode ? threadPosts.slice(1) : []}
              isDialog
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreatePost;