import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileSection } from "@/components/admin/ProfileSection";
import { StatsCards } from "@/components/admin/StatsCards";
import { QuickActions } from "@/components/admin/QuickActions";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { ContentManager } from "@/components/admin/ContentManager";
import { CourseManager } from "@/components/admin/CourseManager";

const Admin = () => {
  return (
    <div className="container mx-auto py-8">
      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6 mt-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Welcome Back!</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileSection />
          </CardContent>
        </Card>

        <QuickActions />
      </div>

      <RecentOrders />

      <div className="mt-6">
        <ContentManager />
      </div>

      <div className="mt-6">
        <CourseManager />
      </div>
    </div>
  );
};

export default Admin;