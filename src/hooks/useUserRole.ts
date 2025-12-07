import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type AppRole = 'szef' | 'pracownik';

interface UserRole {
  role: AppRole | null;
  isSzef: boolean;
  loading: boolean;
}

export function useUserRole(): UserRole {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
      } else {
        setRole(data?.role as AppRole || null);
      }
    } catch (err) {
      console.error('Error fetching role:', err);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Wait for auth to finish loading first
    if (authLoading) {
      return;
    }

    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    // Fetch role immediately
    fetchRole(user.id);

    // Subscribe to role changes
    const channel = supabase
      .channel(`user-role-changes-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_roles',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchRole(user.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, authLoading, fetchRole]);

  return {
    role,
    isSzef: role === 'szef',
    loading: authLoading || loading
  };
}