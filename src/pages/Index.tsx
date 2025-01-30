import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/ui/PageTitle";

const Index = () => {
  return (
    <MainLayout>
      <PageTitle 
        title="Dashboard" 
        description="Welcome to your social media command center"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
          <p className="text-gray-600">Connect your first account to see your stats</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Scheduled Posts</h3>
          <p className="text-gray-600">No posts scheduled yet</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-600">Your recent activity will appear here</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;