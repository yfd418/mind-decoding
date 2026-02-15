import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          forest_name: string;
          avatar: string | null;
          created_at: string;
          agreed_to_terms: boolean;
        };
        Insert: {
          id: string;
          email: string;
          forest_name?: string;
          avatar?: string | null;
          created_at?: string;
          agreed_to_terms?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          forest_name?: string;
          avatar?: string | null;
          created_at?: string;
          agreed_to_terms?: boolean;
        };
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          author_name: string;
          zone: string;
          title: string;
          content: string;
          created_at: string;
          updated_at: string | null;
          resonance_count: number;
          comment_count: number;
          is_resolved: boolean;
          needs_decoding: boolean;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          author_id: string;
          author_name: string;
          zone: string;
          title: string;
          content: string;
          created_at?: string;
          updated_at?: string | null;
          resonance_count?: number;
          comment_count?: number;
          is_resolved?: boolean;
          needs_decoding?: boolean;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          author_id?: string;
          author_name?: string;
          zone?: string;
          title?: string;
          content?: string;
          created_at?: string;
          updated_at?: string | null;
          resonance_count?: number;
          comment_count?: number;
          is_resolved?: boolean;
          needs_decoding?: boolean;
          tags?: string[] | null;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          author_name: string;
          content: string;
          created_at: string;
          resonance_count: number;
          is_author_reply: boolean;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          author_name: string;
          content: string;
          created_at?: string;
          resonance_count?: number;
          is_author_reply?: boolean;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          author_name?: string;
          content?: string;
          created_at?: string;
          resonance_count?: number;
          is_author_reply?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      community_zone: 'recognition' | 'practice' | 'recovery' | 'emotion';
    };
  };
}
