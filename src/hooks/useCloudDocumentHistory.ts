import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useUserRole } from "./useUserRole";
import { Json } from "@/integrations/supabase/types";

export interface CloudDocumentItem {
  id: string;
  type: "report" | "invoice" | "contract" | "presentation";
  title: string;
  subtitle: string | null;
  data: Record<string, string>;
  thumbnail: string | null;
  createdAt: string;
  createdBy: string | null;
  creatorName?: string;
}

export const useCloudDocumentHistory = (filterUserId?: string | null) => {
  const { user } = useAuth();
  const { isSzef } = useUserRole();
  const [history, setHistory] = useState<CloudDocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<{ id: string; name: string }[]>([]);

  // Fetch documents
  const fetchDocuments = useCallback(async () => {
    if (!user) {
      setHistory([]);
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('documents')
        .select(`
          id,
          type,
          title,
          subtitle,
          data,
          thumbnail,
          created_at,
          created_by
        `)
        .order('created_at', { ascending: false });

      // If szef wants to filter by user
      if (isSzef && filterUserId) {
        query = query.eq('created_by', filterUserId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching documents:', error);
        return;
      }

      // Fetch creator names
      const creatorIds = [...new Set(data?.map(d => d.created_by).filter(Boolean) || [])];
      let profilesMap: Record<string, string> = {};
      
      if (creatorIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', creatorIds);
        
        profilesMap = (profiles || []).reduce((acc, p) => {
          acc[p.id] = p.full_name || 'Nieznany';
          return acc;
        }, {} as Record<string, string>);
      }

      const formattedData: CloudDocumentItem[] = (data || []).map(doc => ({
        id: doc.id,
        type: doc.type as CloudDocumentItem['type'],
        title: doc.title,
        subtitle: doc.subtitle,
        data: doc.data as Record<string, string>,
        thumbnail: doc.thumbnail,
        createdAt: doc.created_at,
        createdBy: doc.created_by,
        creatorName: doc.created_by ? profilesMap[doc.created_by] : undefined
      }));

      setHistory(formattedData);
    } catch (err) {
      console.error('Error in fetchDocuments:', err);
    } finally {
      setLoading(false);
    }
  }, [user, isSzef, filterUserId]);

  // Fetch team members for szef
  const fetchTeamMembers = useCallback(async () => {
    if (!isSzef) return;

    const { data } = await supabase
      .from('profiles')
      .select('id, full_name');

    setTeamMembers((data || []).map(p => ({
      id: p.id,
      name: p.full_name || 'Nieznany'
    })));
  }, [isSzef]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('documents-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents'
        },
        () => {
          fetchDocuments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchDocuments]);

  const saveDocument = useCallback(async (
    type: CloudDocumentItem["type"],
    title: string,
    subtitle: string,
    data: Record<string, string>,
    thumbnail?: string
  ): Promise<string | null> => {
    if (!user) return null;

    const { data: newDoc, error } = await supabase
      .from('documents')
      .insert({
        type,
        title,
        subtitle,
        data: data as unknown as Json,
        thumbnail,
        created_by: user.id
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving document:', error);
      return null;
    }

    await fetchDocuments();
    return newDoc?.id || null;
  }, [user, fetchDocuments]);

  const deleteDocument = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting document:', error);
      return;
    }

    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateThumbnail = useCallback(async (id: string, thumbnail: string) => {
    const { error } = await supabase
      .from('documents')
      .update({ thumbnail })
      .eq('id', id);

    if (error) {
      console.error('Error updating thumbnail:', error);
      return;
    }

    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, thumbnail } : item
    ));
  }, []);

  const clearHistory = useCallback(async (type?: CloudDocumentItem["type"]) => {
    if (!user) return;

    // Supabase requires at least one filter condition for delete
    // If szef, delete all docs (filtered by type if specified)
    // If not szef, only delete own documents
    let query = supabase.from('documents').delete();
    
    if (!isSzef) {
      // Non-szef users can only delete their own documents
      query = query.eq('created_by', user.id);
    } else {
      // Szef can delete all, but we need at least one condition
      // Use created_at not null (always true) as a workaround
      query = query.not('created_at', 'is', null);
    }
    
    if (type) {
      query = query.eq('type', type);
    }

    const { error } = await query;

    if (error) {
      console.error('Error clearing history:', error);
      return;
    }

    await fetchDocuments();
  }, [user, isSzef, fetchDocuments]);

  const getDocumentById = useCallback((id: string) => {
    return history.find(item => item.id === id);
  }, [history]);

  const getStats = useCallback((filterByUserId?: string) => {
    const filtered = filterByUserId 
      ? history.filter(i => i.createdBy === filterByUserId)
      : history;
    return {
      total: filtered.length,
      reports: filtered.filter(i => i.type === "report").length,
      invoices: filtered.filter(i => i.type === "invoice").length,
      contracts: filtered.filter(i => i.type === "contract").length,
      presentations: filtered.filter(i => i.type === "presentation").length,
    };
  }, [history]);

  const getRecentDocuments = useCallback((limit: number = 10, filterByUserId?: string) => {
    const filtered = filterByUserId 
      ? history.filter(i => i.createdBy === filterByUserId)
      : history;
    return filtered.slice(0, limit);
  }, [history]);

  return {
    history,
    loading,
    teamMembers,
    isSzef,
    userId: user?.id,
    saveDocument,
    getDocumentById,
    deleteDocument,
    updateThumbnail,
    clearHistory,
    getStats,
    getRecentDocuments,
    refetch: fetchDocuments
  };
};
