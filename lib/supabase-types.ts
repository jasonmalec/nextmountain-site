export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          full_name: string;
          work_email: string;
          company: string;
          role: string;
          why_interested: string;
          key_decision: string;
          accelerator_interest: string;
          referred_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          work_email: string;
          company: string;
          role: string;
          why_interested: string;
          key_decision: string;
          accelerator_interest: string;
          referred_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          work_email?: string;
          company?: string;
          role?: string;
          why_interested?: string;
          key_decision?: string;
          accelerator_interest?: string;
          referred_by?: string | null;
          created_at?: string;
        };
      };
      newsletter_signups: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
