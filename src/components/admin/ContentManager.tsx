import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Plus, Save, Trash2, Link as LinkIcon } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

interface Section {
  id: string;
  title: string;
  content: string;
  type: "hero" | "services" | "testimonials" | "blog";
  imageUrl?: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

export const ContentManager = () => {
  const { toast } = useToast();
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "Hero Section",
      content: "Transform your ideas into digital reality",
      type: "hero"
    },
    {
      id: "2",
      title: "Services Section",
      content: "Our comprehensive digital solutions",
      type: "services"
    }
  ]);

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "E-commerce Platform",
      description: "A modern e-commerce solution built with React",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c",
      projectUrl: "https://example.com/project1"
    }
  ]);
  
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);

  const handleEdit = (section: Section) => {
    setEditingSection(section);
  };

  const handleSave = () => {
    if (editingSection) {
      setSections(sections.map(s => 
        s.id === editingSection.id ? editingSection : s
      ));
      setEditingSection(null);
      toast({
        title: "Section updated",
        description: "Your changes have been saved successfully."
      });
    }
  };

  const handleDelete = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    toast({
      title: "Section deleted",
      description: "The section has been removed successfully."
    });
  };

  const handleAdd = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: "New Section",
      content: "Add your content here",
      type: "hero"
    };
    setSections([...sections, newSection]);
    setEditingSection(newSection);
  };

  const handleAddPortfolio = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      imageUrl: "",
      projectUrl: ""
    };
    setPortfolioItems([...portfolioItems, newItem]);
    setEditingPortfolio(newItem);
  };

  const handleEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolio(item);
  };

  const handleSavePortfolio = () => {
    if (editingPortfolio) {
      setPortfolioItems(items => 
        items.map(item => 
          item.id === editingPortfolio.id ? editingPortfolio : item
        )
      );
      setEditingPortfolio(null);
      toast({
        title: "Portfolio item updated",
        description: "Your changes have been saved successfully."
      });
    }
  };

  const handleDeletePortfolio = (id: string) => {
    setPortfolioItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Portfolio item deleted",
      description: "The item has been removed successfully."
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <div className="space-x-2">
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Section
          </Button>
          <Button onClick={handleAddPortfolio} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Portfolio Item
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {sections.map(section => (
          <Card key={section.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                {editingSection?.id === section.id ? (
                  <Input
                    value={editingSection.title}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      title: e.target.value
                    })}
                    className="max-w-sm"
                  />
                ) : (
                  section.title
                )}
              </CardTitle>
              <div className="flex gap-2">
                {editingSection?.id === section.id ? (
                  <Button onClick={handleSave} variant="outline">
                    <Save className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={() => handleEdit(section)} variant="outline">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  onClick={() => handleDelete(section.id)} 
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editingSection?.id === section.id ? (
                <div className="space-y-4">
                  <Textarea
                    value={editingSection.content}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: e.target.value
                    })}
                    className="min-h-[100px]"
                  />
                  <ImageUpload
                    onImageSelected={(imageUrl) => setEditingSection({
                      ...editingSection,
                      imageUrl: imageUrl
                    })}
                    currentImageUrl={editingSection.imageUrl}
                  />
                </div>
              ) : (
                <p className="text-gray-600">{section.content}</p>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Portfolio Items</h3>
          {portfolioItems.map(item => (
            <Card key={item.id} className="mb-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {editingPortfolio?.id === item.id ? (
                    <Input
                      value={editingPortfolio.title}
                      onChange={(e) => setEditingPortfolio({
                        ...editingPortfolio,
                        title: e.target.value
                      })}
                      className="max-w-sm"
                    />
                  ) : (
                    item.title
                  )}
                </CardTitle>
                <div className="flex gap-2">
                  {editingPortfolio?.id === item.id ? (
                    <Button onClick={handleSavePortfolio} variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={() => handleEditPortfolio(item)} variant="outline">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    onClick={() => handleDeletePortfolio(item.id)} 
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {editingPortfolio?.id === item.id ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editingPortfolio.description}
                      onChange={(e) => setEditingPortfolio({
                        ...editingPortfolio,
                        description: e.target.value
                      })}
                      className="min-h-[100px]"
                      placeholder="Project description"
                    />
                    <ImageUpload
                      onImageSelected={(imageUrl) => setEditingPortfolio({
                        ...editingPortfolio,
                        imageUrl: imageUrl
                      })}
                      currentImageUrl={editingPortfolio.imageUrl}
                    />
                    <Input
                      value={editingPortfolio.projectUrl}
                      onChange={(e) => setEditingPortfolio({
                        ...editingPortfolio,
                        projectUrl: e.target.value
                      })}
                      placeholder="Project URL"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    {item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-48 object-cover rounded-md mb-2"
                      />
                    )}
                    {item.projectUrl && (
                      <div className="flex items-center text-blue-500">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
