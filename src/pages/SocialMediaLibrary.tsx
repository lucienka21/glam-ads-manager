import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Plus,
  Download,
  Search,
  Filter,
  Trash2,
  Image,
  Square,
  Columns,
  Smartphone,
  Film,
  GraduationCap,
  Building2,
  TrendingUp,
  Camera,
  Percent,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "edukacyjne", label: "Edukacyjne", icon: GraduationCap },
  { value: "o-agencji", label: "O agencji", icon: Building2 },
  { value: "case-studies", label: "Case studies", icon: TrendingUp },
  { value: "behind-the-scenes", label: "Behind the scenes", icon: Camera },
  { value: "promocje", label: "Promocje", icon: Percent },
  { value: "cytaty", label: "Cytaty", icon: Quote },
] as const;

const FORMATS = [
  { value: "square", label: "Kwadrat (1:1)", icon: Square },
  { value: "carousel", label: "Karuzela", icon: Columns },
  { value: "story", label: "Story (9:16)", icon: Smartphone },
  { value: "reel-cover", label: "Reel cover", icon: Film },
] as const;

type Category = typeof CATEGORIES[number]["value"];
type Format = typeof FORMATS[number]["value"];

interface SocialMediaPost {
  id: string;
  title: string;
  description: string | null;
  category: string;
  format: string;
  file_url: string;
  thumbnail_url: string | null;
  created_at: string;
}

export default function SocialMediaLibrary() {
  const { isSzef } = useUserRole();
  const queryClient = useQueryClient();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");

  // Form state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadCategory, setUploadCategory] = useState<Category>("edukacyjne");
  const [uploadFormat, setUploadFormat] = useState<Format>("square");
  const [isUploading, setIsUploading] = useState(false);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["social-media-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_media_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as SocialMediaPost[];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!uploadFile) throw new Error("Brak pliku");

      setIsUploading(true);

      // Upload file to storage
      const fileExt = uploadFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `posts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("social-media")
        .upload(filePath, uploadFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("social-media")
        .getPublicUrl(filePath);

      // Create database record
      const { error: insertError } = await supabase
        .from("social_media_posts")
        .insert({
          title: uploadTitle,
          description: uploadDescription || null,
          category: uploadCategory,
          format: uploadFormat,
          file_url: urlData.publicUrl,
          thumbnail_url: urlData.publicUrl,
        });

      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-media-posts"] });
      toast.success("Post dodany!");
      resetForm();
      setIsUploadOpen(false);
    },
    onError: (error) => {
      toast.error("Błąd: " + (error as Error).message);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (post: SocialMediaPost) => {
      // Extract file path from URL
      const urlParts = post.file_url.split("/social-media/");
      if (urlParts[1]) {
        await supabase.storage.from("social-media").remove([urlParts[1]]);
      }

      const { error } = await supabase
        .from("social_media_posts")
        .delete()
        .eq("id", post.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-media-posts"] });
      toast.success("Post usunięty");
    },
    onError: () => {
      toast.error("Błąd podczas usuwania");
    },
  });

  const resetForm = () => {
    setUploadFile(null);
    setUploadTitle("");
    setUploadDescription("");
    setUploadCategory("edukacyjne");
    setUploadFormat("square");
  };

  const handleDownload = async (post: SocialMediaPost) => {
    try {
      const response = await fetch(post.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${post.title}.${post.file_url.split(".").pop()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Pobrano!");
    } catch {
      toast.error("Błąd pobierania");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesFormat =
      selectedFormat === "all" || post.format === selectedFormat;
    return matchesSearch && matchesCategory && matchesFormat;
  });

  const getCategoryLabel = (value: string) =>
    CATEGORIES.find((c) => c.value === value)?.label || value;
  const getFormatLabel = (value: string) =>
    FORMATS.find((f) => f.value === value)?.label || value;

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Social Media</h1>
            <p className="text-sm text-muted-foreground">
              Gotowe posty do pobrania i publikacji
            </p>
          </div>
          {isSzef && (
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Dodaj post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Dodaj nowy post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Plik graficzny</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tytuł</Label>
                    <Input
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="np. Post edukacyjny o reklamach"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Opis (opcjonalnie)</Label>
                    <Textarea
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      placeholder="Krótki opis posta..."
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Kategoria</Label>
                      <Select
                        value={uploadCategory}
                        onValueChange={(v) => setUploadCategory(v as Category)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Format</Label>
                      <Select
                        value={uploadFormat}
                        onValueChange={(v) => setUploadFormat(v as Format)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FORMATS.map((fmt) => (
                            <SelectItem key={fmt.value} value={fmt.value}>
                              {fmt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    disabled={!uploadFile || !uploadTitle || isUploading}
                    onClick={() => uploadMutation.mutate()}
                  >
                    {isUploading ? "Przesyłanie..." : "Dodaj post"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-44">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Kategoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie kategorie</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-full sm:w-40">
              <Image className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie formaty</SelectItem>
              {FORMATS.map((fmt) => (
                <SelectItem key={fmt.value} value={fmt.value}>
                  {fmt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Brak postów do wyświetlenia</p>
            {isSzef && (
              <p className="text-sm mt-1">Dodaj pierwszy post klikając przycisk powyżej</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div
                  className={cn(
                    "relative bg-muted overflow-hidden",
                    post.format === "story" || post.format === "reel-cover"
                      ? "aspect-[9/16]"
                      : post.format === "carousel"
                      ? "aspect-[4/5]"
                      : "aspect-square"
                  )}
                >
                  <img
                    src={post.thumbnail_url || post.file_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownload(post)}
                      className="gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      Pobierz
                    </Button>
                    {isSzef && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(post)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                {/* Info */}
                <div className="p-3 space-y-2">
                  <h3 className="font-medium text-sm text-foreground truncate">
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {getCategoryLabel(post.category)}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {getFormatLabel(post.format)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
