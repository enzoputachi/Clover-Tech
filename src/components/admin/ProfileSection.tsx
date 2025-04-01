import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "./types";

export const ProfileSection = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john@example.com",
    role: "Administrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  });
  const [editingProfile, setEditingProfile] = useState(false);

  const handleProfileEdit = () => {
    setEditingProfile(!editingProfile);
    if (editingProfile) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated successfully."
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 cursor-pointer">
          <div className="rounded-full bg-primary p-1">
            <Upload className="h-4 w-4 text-white" />
          </div>
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </label>
      </div>
      <div className="space-y-2">
        {editingProfile ? (
          <>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="max-w-sm"
            />
            <Input
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="max-w-sm"
            />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
          </>
        )}
        <Button onClick={handleProfileEdit} variant="outline" size="sm">
          {editingProfile ? <Save className="h-4 w-4 mr-2" /> : <Edit2 className="h-4 w-4 mr-2" />}
          {editingProfile ? "Save Profile" : "Edit Profile"}
        </Button>
      </div>
    </div>
  );
};