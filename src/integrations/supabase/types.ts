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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          entity: string | null
          entity_id: string | null
          id: string
          metadata: Json | null
          summary: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json | null
          summary?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json | null
          summary?: string | null
        }
        Relationships: []
      }
      application_notes: {
        Row: {
          application_id: string
          application_type: string
          author_email: string | null
          author_id: string | null
          body: string
          created_at: string
          id: string
        }
        Insert: {
          application_id: string
          application_type: string
          author_email?: string | null
          author_id?: string | null
          body: string
          created_at?: string
          id?: string
        }
        Update: {
          application_id?: string
          application_type?: string
          author_email?: string | null
          author_id?: string | null
          body?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string
          category: string | null
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          category?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cap_applications: {
        Row: {
          applicant_status: string
          assigned_to: string | null
          country: string
          course_of_study: string | null
          created_at: string
          date_of_birth: string | null
          education_level: string | null
          email: string
          full_name: string
          gender: string | null
          id: string
          installments_completed: number
          motivation: string | null
          outstanding_commitment: number
          paid_amount: number
          paid_at: string | null
          partner_code: string | null
          partner_code_id: string | null
          payment_currency: string | null
          payment_plan: string
          payment_status: string
          paystack_reference: string | null
          phone: string
          preferred_track: string
          referral_source: string | null
          referral_source_other: string | null
          specialization: string | null
          status_notes: string | null
          status_updated_at: string
          total_amount: number | null
          university: string
          year_of_study: string
        }
        Insert: {
          applicant_status?: string
          assigned_to?: string | null
          country: string
          course_of_study?: string | null
          created_at?: string
          date_of_birth?: string | null
          education_level?: string | null
          email: string
          full_name: string
          gender?: string | null
          id?: string
          installments_completed?: number
          motivation?: string | null
          outstanding_commitment?: number
          paid_amount?: number
          paid_at?: string | null
          partner_code?: string | null
          partner_code_id?: string | null
          payment_currency?: string | null
          payment_plan?: string
          payment_status?: string
          paystack_reference?: string | null
          phone: string
          preferred_track: string
          referral_source?: string | null
          referral_source_other?: string | null
          specialization?: string | null
          status_notes?: string | null
          status_updated_at?: string
          total_amount?: number | null
          university: string
          year_of_study: string
        }
        Update: {
          applicant_status?: string
          assigned_to?: string | null
          country?: string
          course_of_study?: string | null
          created_at?: string
          date_of_birth?: string | null
          education_level?: string | null
          email?: string
          full_name?: string
          gender?: string | null
          id?: string
          installments_completed?: number
          motivation?: string | null
          outstanding_commitment?: number
          paid_amount?: number
          paid_at?: string | null
          partner_code?: string | null
          partner_code_id?: string | null
          payment_currency?: string | null
          payment_plan?: string
          payment_status?: string
          paystack_reference?: string | null
          phone?: string
          preferred_track?: string
          referral_source?: string | null
          referral_source_other?: string | null
          specialization?: string | null
          status_notes?: string | null
          status_updated_at?: string
          total_amount?: number | null
          university?: string
          year_of_study?: string
        }
        Relationships: [
          {
            foreignKeyName: "cap_applications_partner_code_id_fkey"
            columns: ["partner_code_id"]
            isOneToOne: false
            referencedRelation: "partner_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          is_read: boolean
          last_name: string
          message: string
          topic: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          is_read?: boolean
          last_name: string
          message: string
          topic?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_read?: boolean
          last_name?: string
          message?: string
          topic?: string | null
        }
        Relationships: []
      }
      course_progress: {
        Row: {
          course_id: string
          id: string
          is_completed: boolean | null
          progress_percentage: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          course_id: string
          id?: string
          is_completed?: boolean | null
          progress_percentage?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          course_id?: string
          id?: string
          is_completed?: boolean | null
          progress_percentage?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          answer: string
          created_at: string
          id: string
          is_active: boolean
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          is_active?: boolean
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          is_active?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      flip_applications: {
        Row: {
          age_range: string
          applicant_status: string
          assigned_to: string | null
          commitment: boolean
          country: string
          created_at: string
          education: string
          email: string
          experience: string
          first_name: string
          id: string
          interview_availability: string | null
          job_role: string | null
          last_name: string
          outstanding_commitment: number
          paid_at: string | null
          partner_code: string | null
          partner_code_id: string | null
          payment_amount: number | null
          payment_currency: string | null
          payment_status: string
          paystack_reference: string | null
          phone: string
          preferred_track: string
          state: string | null
          status_notes: string | null
          status_updated_at: string
        }
        Insert: {
          age_range: string
          applicant_status?: string
          assigned_to?: string | null
          commitment?: boolean
          country: string
          created_at?: string
          education: string
          email: string
          experience: string
          first_name: string
          id?: string
          interview_availability?: string | null
          job_role?: string | null
          last_name: string
          outstanding_commitment?: number
          paid_at?: string | null
          partner_code?: string | null
          partner_code_id?: string | null
          payment_amount?: number | null
          payment_currency?: string | null
          payment_status?: string
          paystack_reference?: string | null
          phone: string
          preferred_track: string
          state?: string | null
          status_notes?: string | null
          status_updated_at?: string
        }
        Update: {
          age_range?: string
          applicant_status?: string
          assigned_to?: string | null
          commitment?: boolean
          country?: string
          created_at?: string
          education?: string
          email?: string
          experience?: string
          first_name?: string
          id?: string
          interview_availability?: string | null
          job_role?: string | null
          last_name?: string
          outstanding_commitment?: number
          paid_at?: string | null
          partner_code?: string | null
          partner_code_id?: string | null
          payment_amount?: number | null
          payment_currency?: string | null
          payment_status?: string
          paystack_reference?: string | null
          phone?: string
          preferred_track?: string
          state?: string | null
          status_notes?: string | null
          status_updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flip_applications_partner_code_id_fkey"
            columns: ["partner_code_id"]
            isOneToOne: false
            referencedRelation: "partner_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      gjp_applications: {
        Row: {
          additional_info: string | null
          age: number | null
          age_range: string | null
          applicant_status: string
          assigned_to: string | null
          cap_flip_cohort: string | null
          career_path: string
          city: string | null
          country: string | null
          created_at: string
          current_status: string | null
          email: string
          full_name: string
          gender: string | null
          graduated: boolean
          graduation_year: string | null
          id: string
          institution: string | null
          interested_in_tech: boolean
          is_cap_flip_alumnus: boolean
          nysc_completed: boolean
          nysc_number: string | null
          nysc_year: string | null
          referral_source: string | null
          state_of_residence: string | null
          status_notes: string | null
          status_updated_at: string
          tech_skills_rating: string | null
          university: string | null
          whatsapp: string
          years_experience: string | null
        }
        Insert: {
          additional_info?: string | null
          age?: number | null
          age_range?: string | null
          applicant_status?: string
          assigned_to?: string | null
          cap_flip_cohort?: string | null
          career_path: string
          city?: string | null
          country?: string | null
          created_at?: string
          current_status?: string | null
          email: string
          full_name: string
          gender?: string | null
          graduated: boolean
          graduation_year?: string | null
          id?: string
          institution?: string | null
          interested_in_tech?: boolean
          is_cap_flip_alumnus?: boolean
          nysc_completed: boolean
          nysc_number?: string | null
          nysc_year?: string | null
          referral_source?: string | null
          state_of_residence?: string | null
          status_notes?: string | null
          status_updated_at?: string
          tech_skills_rating?: string | null
          university?: string | null
          whatsapp: string
          years_experience?: string | null
        }
        Update: {
          additional_info?: string | null
          age?: number | null
          age_range?: string | null
          applicant_status?: string
          assigned_to?: string | null
          cap_flip_cohort?: string | null
          career_path?: string
          city?: string | null
          country?: string | null
          created_at?: string
          current_status?: string | null
          email?: string
          full_name?: string
          gender?: string | null
          graduated?: boolean
          graduation_year?: string | null
          id?: string
          institution?: string | null
          interested_in_tech?: boolean
          is_cap_flip_alumnus?: boolean
          nysc_completed?: boolean
          nysc_number?: string | null
          nysc_year?: string | null
          referral_source?: string | null
          state_of_residence?: string | null
          status_notes?: string | null
          status_updated_at?: string
          tech_skills_rating?: string | null
          university?: string | null
          whatsapp?: string
          years_experience?: string | null
        }
        Relationships: []
      }
      gjp_email_followups: {
        Row: {
          auto_send: boolean
          body: string
          created_at: string
          created_by: string | null
          due_at: string
          id: string
          recipients: string[]
          send_error: string | null
          sent: boolean
          sent_at: string | null
          set_status_after: string | null
          subject: string
        }
        Insert: {
          auto_send?: boolean
          body: string
          created_at?: string
          created_by?: string | null
          due_at: string
          id?: string
          recipients: string[]
          send_error?: string | null
          sent?: boolean
          sent_at?: string | null
          set_status_after?: string | null
          subject: string
        }
        Update: {
          auto_send?: boolean
          body?: string
          created_at?: string
          created_by?: string | null
          due_at?: string
          id?: string
          recipients?: string[]
          send_error?: string | null
          sent?: boolean
          sent_at?: string | null
          set_status_after?: string | null
          subject?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: Json
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          id?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_codes: {
        Row: {
          active: boolean
          code: string
          created_at: string
          expires_at: string | null
          id: string
          max_uses: number | null
          notes: string | null
          partner_name: string
          programs: string[]
          updated_at: string
          uses: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          notes?: string | null
          partner_name: string
          programs?: string[]
          updated_at?: string
          uses?: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          notes?: string | null
          partner_name?: string
          programs?: string[]
          updated_at?: string
          uses?: number
        }
        Relationships: []
      }
      partners: {
        Row: {
          category: string
          created_at: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          sort_order: number
          updated_at: string
          website_url: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_user_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _target_user: string
        }
        Returns: undefined
      }
      can_edit_content: { Args: never; Returns: boolean }
      can_moderate_submissions: { Args: never; Returns: boolean }
      get_gjp_status_by_email_appid: {
        Args: { _app_id_prefix: string; _email: string }
        Returns: {
          applicant_status: string
          career_path: string
          created_at: string
          full_name: string
          status_notes: string
          status_updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      list_admin_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          last_sign_in_at: string
          roles: string[]
          user_id: string
        }[]
      }
      revoke_user_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _target_user: string
        }
        Returns: undefined
      }
      validate_partner_code: {
        Args: { _code: string; _program: string }
        Returns: {
          code: string
          id: string
          partner_name: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "editor"
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
      app_role: ["admin", "moderator", "user", "editor"],
    },
  },
} as const
