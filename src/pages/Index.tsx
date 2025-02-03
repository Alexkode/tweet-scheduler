import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan 23', scheduled: 4, posted: 2 },
  { name: 'Jan 24', scheduled: 3, posted: 3 },
  { name: 'Jan 25', scheduled: 2, posted: 4 },
  { name: 'Jan 26', scheduled: 1, posted: 3 },
  { name: 'Jan 27', scheduled: 0, posted: 2 },
  { name: 'Jan 28', scheduled: 2, posted: 1 },
  { name: 'Jan 29', scheduled: 3, posted: 2 },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <Select defaultValue="7days">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-2">Scheduled Posts</h3>
            <p className="text-2xl sm:text-3xl font-bold">1</p>
          </Card>
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-2">Published Posts</h3>
            <p className="text-2xl sm:text-3xl font-bold">0</p>
          </Card>
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-2">Draft Posts</h3>
            <p className="text-2xl sm:text-3xl font-bold">0</p>
          </Card>
        </div>

        <Card className="p-4 sm:p-6">
          <h3 className="text-xl font-semibold mb-4">Posts Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="scheduled" stroke="#1E40AF" name="Scheduled" />
                <Line type="monotone" dataKey="posted" stroke="#60A5FA" name="Posted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">User Name</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    This is a sample tweet that shows how the content will look in the grid view.
                  </p>
                  <div className="flex gap-2 mt-2 text-sm text-gray-500">
                    <span>❤️ 42</span>
                    <span>🔄 12</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;