import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const ScheduledPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Scheduled Posts</h1>
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="auto">Auto Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>
                  View and manage your scheduled posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>List View</CardTitle>
                <CardDescription>
                  View your scheduled posts in a list format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No scheduled posts yet
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="auto" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Auto Schedule</CardTitle>
                <CardDescription>
                  Configure automatic posting schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Configure Schedule</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ScheduledPage;