import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Youtube, Facebook, Linkedin, Share2, Link2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { X, Filter } from "lucide-react";

const AccountsPage = () => {
  const socialPlatforms = [
    { name: "Twitter", icon: Twitter, username: "AlexRougea" },
    { name: "Instagram", icon: Instagram },
    { name: "Youtube", icon: Youtube },
    { name: "Facebook", icon: Facebook },
    { name: "Linkedin", icon: Linkedin },
    { name: "TikTok", icon: Share2 },
    { name: "Pinterest", icon: Link2 },
  ];

  return (
    <MainLayout>
      <Card className="p-6 max-w-[800px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Connected Accounts</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>all accounts</span>
            <Filter className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} className="flex items-center gap-4">
              <platform.icon className="w-6 h-6 text-muted-foreground" />
              <Button 
                variant="secondary" 
                className="bg-[#1d4ed8] text-white hover:bg-[#1e40af] w-[300px]"
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

        <div className="mt-8">
          <Button variant="outline" className="text-sm">
            Refresh Twitter
          </Button>
        </div>
      </Card>
    </MainLayout>
  );
};

export default AccountsPage;