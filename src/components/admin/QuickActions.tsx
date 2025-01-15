import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, CreditCard, Users } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Manage Orders
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Settings
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Users className="mr-2 h-4 w-4" />
            User Management
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};