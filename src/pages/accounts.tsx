import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Youtube, Facebook, Linkedin, AtSign, Share2, Link2, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const AccountsPage = () => {
  const socialPlatforms = [
    { name: "Twitter", icon: Twitter, username: "AlexRougea" },
    { name: "Instagram", icon: Instagram },
    { name: "Youtube", icon: Youtube },
    { name: "Facebook", icon: Facebook },
    { name: "Linkedin", icon: Linkedin },
    { name: "TikTok", icon: Share2 },
    { name: "Pinterest", icon: Link2 },
    { name: "Bluesky", icon: AtSign },
  ];

  return (
    <MainLayout>
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Connected Accounts</h1>
        </div>

        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} className="flex items-center gap-4">
              <platform.icon className="w-6 h-6 text-muted-foreground" />
              <Button 
                variant="secondary" 
                className="bg-slate-800 text-white hover:bg-slate-700 w-[300px]"
              >
                Connect {platform.name}
              </Button>
              {platform.username && (
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
                  <span>{platform.username}</span>
                  <X className="w-4 h-4 text-muted-foreground cursor-pointer" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </MainLayout>
  );
};

export default AccountsPage;