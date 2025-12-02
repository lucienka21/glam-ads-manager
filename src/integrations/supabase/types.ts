export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          is_pinned: boolean
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          is_pinned?: boolean
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          is_pinned?: boolean
          title?: string
        }
        Relationships: []
      }
      campaign_metrics: {
        Row: {
          bookings: number | null
          campaign_id: string
          clicks: number | null
          conversions: number | null
          created_at: string
          id: string
          impressions: number | null
          messages: number | null
          period_end: string
          period_start: string
          reach: number | null
          spend: number | null
        }
        Insert: {
          bookings?: number | null
          campaign_id: string
          clicks?: number | null
          conversions?: number | null
          created_at?: string
          id?: string
          impressions?: number | null
          messages?: number | null
          period_end: string
          period_start: string
          reach?: number | null
          spend?: number | null
        }
        Update: {
          bookings?: number | null
          campaign_id?: string
          clicks?: number | null
          conversions?: number | null
          created_at?: string
          id?: string
          impressions?: number | null
          messages?: number | null
          period_end?: string
          period_start?: string
          reach?: number | null
          spend?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number | null
          client_id: string
          created_at: string
          created_by: string | null
          end_date: string | null
          id: string
          name: string
          notes: string | null
          objective: string | null
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          client_id: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          name: string
          notes?: string | null
          objective?: string | null
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          client_id?: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          name?: string
          notes?: string | null
          objective?: string | null
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          assigned_to: string | null
          city: string | null
          contract_start_date: string | null
          created_at: string
          created_by: string | null
          email: string | null
          facebook_page: string | null
          id: string
          instagram: string | null
          lead_id: string | null
          monthly_budget: number | null
          notes: string | null
          owner_name: string | null
          phone: string | null
          salon_name: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          city?: string | null
          contract_start_date?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          facebook_page?: string | null
          id?: string
          instagram?: string | null
          lead_id?: string | null
          monthly_budget?: number | null
          notes?: string | null
          owner_name?: string | null
          phone?: string | null
          salon_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          city?: string | null
          contract_start_date?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          facebook_page?: string | null
          id?: string
          instagram?: string | null
          lead_id?: string | null
          monthly_budget?: number | null
          notes?: string | null
          owner_name?: string | null
          phone?: string | null
          salon_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_roles: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_system: boolean
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_system?: boolean
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_system?: boolean
          name?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          client_id: string | null
          created_at: string
          created_by: string | null
          data: Json
          id: string
          subtitle: string | null
          thumbnail: string | null
          title: string
          type: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          data: Json
          id?: string
          subtitle?: string | null
          thumbnail?: string | null
          title: string
          type: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          data?: Json
          id?: string
          subtitle?: string | null
          thumbnail?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body: string
          created_at: string
          created_by: string | null
          id: string
          subject: string
          template_name: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          created_by?: string | null
          id?: string
          subject: string
          template_name: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          created_by?: string | null
          id?: string
          subject?: string
          template_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          city: string | null
          cold_email_date: string | null
          cold_email_sent: boolean | null
          created_at: string
          created_by: string | null
          email: string | null
          email_follow_up_1_date: string | null
          email_follow_up_1_sent: boolean | null
          email_follow_up_2_date: string | null
          email_follow_up_2_sent: boolean | null
          email_from: string | null
          email_template: string | null
          facebook_page: string | null
          follow_up_count: number | null
          id: string
          instagram: string | null
          last_contact_date: string | null
          last_follow_up_date: string | null
          next_follow_up_date: string | null
          notes: string | null
          owner_name: string | null
          phone: string | null
          priority: string | null
          response: string | null
          response_date: string | null
          salon_name: string
          sms_follow_up_date: string | null
          sms_follow_up_sent: boolean | null
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          cold_email_date?: string | null
          cold_email_sent?: boolean | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          email_follow_up_1_date?: string | null
          email_follow_up_1_sent?: boolean | null
          email_follow_up_2_date?: string | null
          email_follow_up_2_sent?: boolean | null
          email_from?: string | null
          email_template?: string | null
          facebook_page?: string | null
          follow_up_count?: number | null
          id?: string
          instagram?: string | null
          last_contact_date?: string | null
          last_follow_up_date?: string | null
          next_follow_up_date?: string | null
          notes?: string | null
          owner_name?: string | null
          phone?: string | null
          priority?: string | null
          response?: string | null
          response_date?: string | null
          salon_name: string
          sms_follow_up_date?: string | null
          sms_follow_up_sent?: boolean | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          cold_email_date?: string | null
          cold_email_sent?: boolean | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          email_follow_up_1_date?: string | null
          email_follow_up_1_sent?: boolean | null
          email_follow_up_2_date?: string | null
          email_follow_up_2_sent?: boolean | null
          email_from?: string | null
          email_template?: string | null
          facebook_page?: string | null
          follow_up_count?: number | null
          id?: string
          instagram?: string | null
          last_contact_date?: string | null
          last_follow_up_date?: string | null
          next_follow_up_date?: string | null
          notes?: string | null
          owner_name?: string | null
          phone?: string | null
          priority?: string | null
          response?: string | null
          response_date?: string | null
          salon_name?: string
          sms_follow_up_date?: string | null
          sms_follow_up_sent?: boolean | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      message_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "team_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          permission: Database["public"]["Enums"]["app_permission"]
          role_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permission: Database["public"]["Enums"]["app_permission"]
          role_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permission?: Database["public"]["Enums"]["app_permission"]
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "custom_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          task_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          task_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          task_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          completed_by: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          is_agency_task: boolean
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_agency_task?: boolean
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_agency_task?: boolean
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          reference_id: string | null
          reference_type: string | null
          reply_to_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          reply_to_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          reply_to_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "team_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          custom_role_id: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_role_id?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          custom_role_id?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_custom_role_id_fkey"
            columns: ["custom_role_id"]
            isOneToOne: false
            referencedRelation: "custom_roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_permission: {
        Args: {
          _permission: Database["public"]["Enums"]["app_permission"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_szef: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_permission:
        | "leads_view"
        | "leads_create"
        | "leads_edit"
        | "leads_delete"
        | "clients_view"
        | "clients_create"
        | "clients_edit"
        | "clients_delete"
        | "campaigns_view"
        | "campaigns_create"
        | "campaigns_edit"
        | "campaigns_delete"
        | "documents_view"
        | "documents_create"
        | "documents_edit"
        | "documents_delete"
        | "tasks_view"
        | "tasks_create"
        | "tasks_edit"
        | "tasks_delete"
        | "reports_generate"
        | "invoices_generate"
        | "contracts_generate"
        | "presentations_generate"
        | "team_manage"
        | "roles_manage"
      app_role: "szef" | "pracownik"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_permission: [
        "leads_view",
        "leads_create",
        "leads_edit",
        "leads_delete",
        "clients_view",
        "clients_create",
        "clients_edit",
        "clients_delete",
        "campaigns_view",
        "campaigns_create",
        "campaigns_edit",
        "campaigns_delete",
        "documents_view",
        "documents_create",
        "documents_edit",
        "documents_delete",
        "tasks_view",
        "tasks_create",
        "tasks_edit",
        "tasks_delete",
        "reports_generate",
        "invoices_generate",
        "contracts_generate",
        "presentations_generate",
        "team_manage",
        "roles_manage",
      ],
      app_role: ["szef", "pracownik"],
    },
  },
} as const
