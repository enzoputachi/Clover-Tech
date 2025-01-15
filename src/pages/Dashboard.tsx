import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DashboardNotifications } from "@/components/dashboard/DashboardNotifications";
import { CourseProgress } from "@/components/dashboard/CourseProgress";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-3">
            <DashboardNav />
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-9 space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track your progress, check notifications, and continue your learning journey.
                </p>
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <DashboardNotifications />
              </CardContent>
            </Card>

            <Separator />

            {/* Course Progress Section */}
            <Card>
              <CardHeader>
                <CardTitle>Your Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CourseProgress />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;