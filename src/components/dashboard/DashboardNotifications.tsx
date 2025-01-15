import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DashboardNotifications = () => {
  const { toast } = useToast();

  // Mock notifications - in a real app, these would come from an API
  const notifications = [
    {
      id: 1,
      title: "New Course Available",
      message: "Check out our new Advanced React Course!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unread: true,
    },
    {
      id: 2,
      title: "Course Update",
      message: "New content added to TypeScript Fundamentals",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unread: false,
    },
  ];

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  return (
    <div className="space-y-4 max-h-[300px] overflow-y-auto">
      <div className="flex justify-between items-center pb-2 border-b">
        <h4 className="font-medium">Notifications</h4>
        <span className="text-xs text-muted-foreground">
          {notifications.filter(n => n.unread).length} unread
        </span>
      </div>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start space-x-4 p-3 rounded-lg cursor-pointer hover:bg-accent/10 ${
            notification.unread ? "bg-accent/5" : ""
          }`}
          onClick={() => handleNotificationClick(notification)}
        >
          <Bell className={`h-5 w-5 ${notification.unread ? "text-primary" : "text-muted-foreground"}`} />
          <div className="flex-1 space-y-1">
            <p className={`text-sm font-medium ${notification.unread ? "" : "text-muted-foreground"}`}>
              {notification.title}
            </p>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            <time className="text-xs text-muted-foreground">
              {notification.timestamp.toLocaleDateString()} at{" "}
              {notification.timestamp.toLocaleTimeString()}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
};