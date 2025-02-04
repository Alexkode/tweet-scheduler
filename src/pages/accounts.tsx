import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Youtube, Facebook, Linkedin, AtSign, Github, Share2, Link2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

const AccountsPage = () => {
  const socialPlatforms = [
    { name: "Twitter", icon: Twitter, username: "AlexRougea" },
    { name: "Instagram", icon: Instagram },
    { name: "Youtube", icon: Youtube },
    { name: "Tiktok", icon: Share2 },
    { name: "Facebook", icon: Facebook },
    { name: "Linkedin", icon: Linkedin },
    { name: "Bluesky", icon: Github },
    { name: "Threads", icon: AtSign },
    { name: "Pinterest", icon: Link2 },
  ];

  const handleDisconnect = (platformName: string) => {
    // Here you would implement the actual disconnection logic
    console.log(`Disconnecting from ${platformName}`);
  };

  return (
    <MainLayout>
      <Card className="p-6 max-w-[800px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Connected Accounts</h1>
        </div>

        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} className="flex items-center gap-4">
              <platform.icon className="w-6 h-6 text-slate-700 shrink-0" />
              <div className="flex-1">
                {platform.username ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-md px-4 py-2 w-[300px]">
                      <span className="text-slate-700">{platform.username}</span>
                      <X 
                        className="w-4 h-4 text-slate-500 cursor-pointer hover:text-red-500 transition-colors ml-auto" 
                        onClick={() => handleDisconnect(platform.name)}
                      />
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="secondary" 
                    className="w-[300px] bg-[#1d4ed8] text-white hover:bg-blue-800"
                  >
                    Connect {platform.name}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button 
            variant="outline" 
            className="text-sm border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Refresh Twitter
          </Button>
        </div>
      </Card>
    </MainLayout>
  );
};

export default AccountsPage;