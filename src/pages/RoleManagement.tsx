import { useState, useEffect } from "react";
import { Shield, UserPlus, Trash2, Crown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { useUserRole, AppRole } from "@/hooks/useUserRole";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Navigate } from "react-router-dom";

interface TeamMember {
  id: string;
  email: string | null;
  fullName: string | null;
  role: AppRole | null;
  roleId: string | null;
}

export default function RoleManagement() {
  const { user } = useAuth();
  const { isSzef, loading: roleLoading } = useUserRole();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSzef) return;
    fetchMembers();
  }, [isSzef]);

  const fetchMembers = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name');

      if (profilesError) throw profilesError;

      // Fetch all roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('id, user_id, role');

      if (rolesError) throw rolesError;

      const rolesMap = (roles || []).reduce((acc, r) => {
        acc[r.user_id] = { role: r.role as AppRole, roleId: r.id };
        return acc;
      }, {} as Record<string, { role: AppRole; roleId: string }>);

      const formattedMembers: TeamMember[] = (profiles || []).map(p => ({
        id: p.id,
        email: p.email,
        fullName: p.full_name,
        role: rolesMap[p.id]?.role || null,
        roleId: rolesMap[p.id]?.roleId || null
      }));

      setMembers(formattedMembers);
    } catch (err) {
      console.error('Error fetching members:', err);
      toast.error('Błąd podczas pobierania użytkowników');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (memberId: string, newRole: AppRole | 'none') => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    try {
      if (newRole === 'none') {
        // Remove role
        if (member.roleId) {
          const { error } = await supabase
            .from('user_roles')
            .delete()
            .eq('id', member.roleId);

          if (error) throw error;
        }
      } else if (member.roleId) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('id', member.roleId);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: memberId, role: newRole });

        if (error) throw error;
      }

      toast.success('Rola została zaktualizowana');
      fetchMembers();
    } catch (err) {
      console.error('Error updating role:', err);
      toast.error('Błąd podczas aktualizacji roli');
    }
  };

  const handleRemoveRole = async (member: TeamMember) => {
    if (!member.roleId) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', member.roleId);

      if (error) throw error;

      toast.success('Rola została usunięta');
      fetchMembers();
    } catch (err) {
      console.error('Error removing role:', err);
      toast.error('Błąd podczas usuwania roli');
    }
  };

  if (roleLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!isSzef) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Zarządzanie rolami</h1>
            <p className="text-muted-foreground">
              Przypisuj role członkom zespołu
            </p>
          </div>
        </div>

        {/* Info box */}
        <div className="bg-secondary/30 border border-border/50 rounded-xl p-4">
          <h3 className="font-medium text-foreground mb-2">Role w systemie:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <span><strong>Szef</strong> - pełny dostęp do wszystkiego, może zarządzać rolami i przeglądać historię wszystkich użytkowników</span>
            </li>
            <li className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span><strong>Pracownik</strong> - dostęp do swoich dokumentów i danych CRM</span>
            </li>
          </ul>
        </div>

        {/* Members list */}
        <div className="bg-secondary/30 border border-border/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-semibold text-foreground">Członkowie zespołu ({members.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          ) : members.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Brak użytkowników w systemie
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {members.map((member) => (
                <div key={member.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      member.role === 'szef' ? 'bg-amber-500/20' : 'bg-secondary'
                    }`}>
                      {member.role === 'szef' ? (
                        <Crown className="w-5 h-5 text-amber-500" />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">
                        {member.fullName || 'Brak imienia'}
                        {member.id === user?.id && (
                          <span className="text-xs text-muted-foreground ml-2">(Ty)</span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={member.role || 'none'}
                      onValueChange={(value) => handleRoleChange(member.id, value as AppRole | 'none')}
                      disabled={member.id === user?.id}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Wybierz rolę" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Brak roli</SelectItem>
                        <SelectItem value="szef">Szef</SelectItem>
                        <SelectItem value="pracownik">Pracownik</SelectItem>
                      </SelectContent>
                    </Select>

                    {member.role && member.id !== user?.id && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Usunąć rolę?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Czy na pewno chcesz usunąć rolę użytkownika {member.fullName || member.email}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Anuluj</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleRemoveRole(member)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Usuń
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
