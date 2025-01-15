import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileSection } from "@/components/admin/ProfileSection";
import { DashboardNotifications } from "./DashboardNotifications";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const DashboardNav = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.photoURL || ""} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user?.name || "User"}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/dashboard/courses">
            <BookOpen className="mr-2 h-4 w-4" />
            My Courses
          </Link>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/dashboard/progress">
            <Clock className="mr-2 h-4 w-4" />
            Progress
          </Link>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <DashboardNotifications />
          </PopoverContent>
        </Popover>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </SheetTrigger>
          <SheetContent>
            <ProfileSection />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};