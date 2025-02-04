import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BillingPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold">Billing Settings</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">Manage Subscription</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Update your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Update Payment Method</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default BillingPage;