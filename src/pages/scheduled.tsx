import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AutoScheduleForm from "@/components/scheduled/AutoScheduleForm";
import WeeklyCalendar from "@/components/scheduled/WeeklyCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ScheduledPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Publications programmées</h1>
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="auto">Listes automatiques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-6">
            <WeeklyCalendar />
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vue Liste</CardTitle>
                <CardDescription>
                  Voir vos publications programmées dans un format liste
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* List view content will be implemented here */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auto" className="mt-6">
            <AutoScheduleForm />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ScheduledPage;
