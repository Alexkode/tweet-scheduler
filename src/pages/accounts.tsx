import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccountsPage = () => {
  const socialPlatforms = [
    { name: "Twitter", icon: Twitter, color: "text-blue-400" },
    { name: "Instagram", icon: Instagram, color: "text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, color: "text-blue-600" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Connected Accounts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {socialPlatforms.map((platform) => (
            <Card key={platform.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  {platform.name}
                </CardTitle>
                <platform.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${platform.color}`} />
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Connect {platform.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountsPage;