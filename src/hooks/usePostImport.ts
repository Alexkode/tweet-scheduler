import { useState } from "react";
import { Post } from "@/types/schedule";
import { toast } from "sonner";

export const usePostImport = () => {
  const [importedPosts, setImportedPosts] = useState<Post[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          const posts = text.split('\n')
            .filter(line => line.trim())
            .map(line => {
              const [content, imageInfoStr, videoInfoStr] = line.split(',').map(str => str?.trim());
              let imageInfo = [];
              let videoInfo = [];
              
              try {
                if (imageInfoStr) {
                  imageInfo = JSON.parse(imageInfoStr);
                }
                if (videoInfoStr) {
                  videoInfo = JSON.parse(videoInfoStr);
                }
              } catch (e) {
                console.error("Error parsing media info:", e);
                toast.error("Erreur lors de la lecture des informations médias");
                return null;
              }

              return {
                content,
                imageInfo: imageInfo.length > 0 ? imageInfo : undefined,
                videoInfo: videoInfo.length > 0 ? videoInfo : undefined
              } as Post;
            })
            .filter((post): post is Post => post !== null);

          setImportedPosts(posts);
          console.log("Parsed posts:", posts);
          toast.success(`${posts.length} posts importés avec succès`);
        };

        reader.onerror = () => {
          toast.error("Erreur lors de la lecture du fichier");
        };

        reader.readAsText(file);
      } catch (err) {
        console.error("Error reading file:", err);
        toast.error("Erreur lors de la lecture du fichier");
      }
    }
  };

  return {
    importedPosts,
    handleFileUpload,
    setImportedPosts
  };
};