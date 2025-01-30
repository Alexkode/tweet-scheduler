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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Clock, Upload, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: Date;
  platform: string;
}

const ScheduledPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [postsPerDay, setPostsPerDay] = useState("3");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("21:00");
  const [scheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      content: "This is a scheduled post",
      scheduledDate: new Date(),
      platform: "Twitter",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Scheduled Posts</h1>
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
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
                <div className="flex gap-6">
                  <div className="w-[350px]">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-4">
                      Posts scheduled for {date ? format(date, 'MMMM d, yyyy') : 'today'}
                    </h3>
                    <div className="space-y-4">
                      {scheduledPosts.map((post) => (
                        <Card key={post.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {format(post.scheduledDate, 'h:mm a')}
                                </p>
                                <p className="text-sm">{post.content}</p>
                              </div>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {post.platform}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
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
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {format(post.scheduledDate, 'MMMM d, yyyy - h:mm a')}
                            </p>
                            <p className="text-sm">{post.content}</p>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {post.platform}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auto" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Auto Schedule</CardTitle>
                <CardDescription>
                  Configure automatic posting schedule and import posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="posts-per-day">Posts per day</Label>
                        <Select defaultValue={postsPerDay} onValueChange={setPostsPerDay}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select posts per day" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'post' : 'posts'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="UTC">
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input
                          id="start-time"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-time">End Time</Label>
                        <Input
                          id="end-time"
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Schedule Days</Label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="Select days" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Days</SelectItem>
                              <SelectItem value="weekdays">Weekdays Only</SelectItem>
                              <SelectItem value="weekends">Weekends Only</SelectItem>
                              <SelectItem value="custom">Custom Days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Post Order</Label>
                          <Select defaultValue="fifo">
                            <SelectTrigger>
                              <SelectValue placeholder="Select order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fifo">First In, First Out</SelectItem>
                              <SelectItem value="random">Random</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Import CSV
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Clock className="mr-2 h-4 w-4" />
                        Generate Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ScheduledPage;