import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Edit, Plus, Trash2, Image, FileText, Video, Save, X, Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { contentAPI } from '@/api/apiClient';

export default function ContentManagement() {
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [contentData, setContentData] = useState<any>({});
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['content'],
    queryFn: () => contentAPI.list(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => contentAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      toast.success('Content updated successfully');
      setIsEditing(false);
      setSelectedContent(null);
    },
  });

  const contents = data?.data?.contents || [];

  const handleEdit = (content: any) => {
    setSelectedContent(content);
    setContentData({
      title: content.title,
      content: typeof content.content === 'string' ? content.content : JSON.stringify(content.content, null, 2),
      isPublished: content.isPublished
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedContent) {
      updateMutation.mutate({
        id: selectedContent._id || selectedContent.id,
        data: contentData
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button className="bg-green-600 hover:bg-green-700 rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-12">Loading content...</div>
        ) : contents.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">No content found</div>
        ) : (
          contents.map((content: any) => (
            <Card key={content._id || content.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{content.title || content.key}</CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {content.type}
                    </Badge>
                  </div>
                  {content.isPublished ? (
                    <Badge className="bg-green-500">Published</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {typeof content.content === 'string' 
                    ? content.content 
                    : JSON.stringify(content.content).substring(0, 100)}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(content)}
                    className="flex-1 rounded-xl"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Content: {selectedContent?.key}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                value={contentData.title || ''}
                onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Content</label>
              <Textarea
                value={contentData.content || ''}
                onChange={(e) => setContentData({ ...contentData, content: e.target.value })}
                rows={10}
                className="rounded-xl font-mono text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={contentData.isPublished}
                onChange={(e) => setContentData({ ...contentData, isPublished: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="published" className="text-sm">Published</label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 rounded-xl flex-1"
                disabled={updateMutation.isPending}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="rounded-xl"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

