import { useState } from "react";
import { Post } from "@/types/schedule";
import { toast } from "sonner";

export const usePostImport = () => {
  const [importedPosts, setImportedPosts] = useState<Post[]>([]);

  const parseMediaInfo = (str: string | undefined) => {
    if (!str || str.trim() === '') return undefined;
    try {
      const parsed = JSON.parse(str.trim());
      return Array.isArray(parsed) ? parsed : undefined;
    } catch (e) {
      console.error("Error parsing media info:", e);
      throw new Error("Format JSON invalide pour les informations médias");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("Aucun fichier sélectionné");
      return;
    }

    try {
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
      });

      const posts = text.split('\n')
        .filter(line => line.trim())
        .map((line, index) => {
          try {
            const [content, imageInfoStr, videoInfoStr] = line.split(',').map(str => str?.trim());
            
            return {
              content: content || undefined,
              imageInfo: parseMediaInfo(imageInfoStr),
              videoInfo: parseMediaInfo(videoInfoStr)
            } as Post;
          } catch (error) {
            throw new Error(`Erreur à la ligne ${index + 1}: ${(error as Error).message}`);
          }
        });

      setImportedPosts(posts);
      toast.success(`${posts.length} posts importés avec succès`);
    } catch (err) {
      console.error("Error reading file:", err);
      toast.error((err as Error).message || "Erreur lors de la lecture du fichier");
      setImportedPosts([]);
    }
  };

  return {
    importedPosts,
    handleFileUpload,
    setImportedPosts
  };
};