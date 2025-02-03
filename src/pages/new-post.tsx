import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreatePost from "@/components/CreatePost";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const NewPost = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen bg-secondary">
        <div className="max-w-[1200px] mx-auto pt-4 px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <CreatePost />
        </div>
      </div>
    </MainLayout>
  );
};

export default NewPost;