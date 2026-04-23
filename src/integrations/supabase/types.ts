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
          country: string
          created_at: string
          email: string
          full_name: string
          id: string
          installments_completed: number
          motivation: string | null
          paid_amount: number
          paid_at: string | null
          payment_currency: string | null
          payment_plan: string
          payment_status: string
          paystack_reference: string | null
          phone: string
          preferred_track: string
          referral_source: string | null
          specialization: string | null
          total_amount: number | null
          university: string
          year_of_study: string
        }
        Insert: {
          country: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          installments_completed?: number
          motivation?: string | null
          paid_amount?: number
          paid_at?: string | null
          payment_currency?: string | null
          payment_plan?: string
          payment_status?: string
          paystack_reference?: string | null
          phone: string
          preferred_track: string
          referral_source?: string | null
          specialization?: string | null
          total_amount?: number | null
          university: string
          year_of_study: string
        }
        Update: {
          country?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          installments_completed?: number
          motivation?: string | null
          paid_amount?: number
          paid_at?: string | null
          payment_currency?: string | null
          payment_plan?: string
          payment_status?: string
          paystack_reference?: string | null
          phone?: string
          preferred_track?: string
          referral_source?: string | null
          specialization?: string | null
          total_amount?: number | null
          university?: string
          year_of_study?: string
        }
        Relationships: []
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
          paid_at: string | null
          payment_amount: number | null
          payment_currency: string | null
          payment_status: string
          paystack_reference: string | null
          phone: string
          preferred_track: string
          state: string | null
        }
        Insert: {
          age_range: string
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
          paid_at?: string | null
          payment_amount?: number | null
          payment_currency?: string | null
          payment_status?: string
          paystack_reference?: string | null
          phone: string
          preferred_track: string
          state?: string | null
        }
        Update: {
          age_range?: string
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
          paid_at?: string | null
          payment_amount?: number | null
          payment_currency?: string | null
          payment_status?: string
          paystack_reference?: string | null
          phone?: string
          preferred_track?: string
          state?: string | null
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
