import { useState, useEffect, useRef } from 'react';
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
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Wait for auth to finish loading first
    if (authLoading) {
      return;
    }

    if (!user) {
      setRole(null);
      setLoading(false);
      fetchedRef.current = false;
      return;
    }

    // Prevent duplicate fetches
    if (fetchedRef.current) {
      return;
    }

    const fetchRole = async () => {
      try {
        fetchedRef.current = true;
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
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
    };

    fetchRole();

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
          fetchedRef.current = false;
          fetchRole();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, authLoading]);

  return {
    role,
    isSzef: role === 'szef',
    loading: authLoading || loading
  };
}
