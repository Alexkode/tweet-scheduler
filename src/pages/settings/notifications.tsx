import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const NotificationsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold">Notification Settings</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure your email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="post-notifications">Post Updates</Label>
                <Switch id="post-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="account-notifications">Account Updates</Label>
                <Switch id="account-notifications" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;