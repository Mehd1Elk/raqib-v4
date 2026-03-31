export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agent_runs: {
        Row: {
          agent_id: string
          completed_at: string | null
          duration_ms: number | null
          entries_created: number | null
          entries_rejected: number | null
          entries_updated: number | null
          error_message: string | null
          id: string
          layer_id: string | null
          model: string | null
          started_at: string | null
          status: string
        }
        Insert: {
          agent_id: string
          completed_at?: string | null
          duration_ms?: number | null
          entries_created?: number | null
          entries_rejected?: number | null
          entries_updated?: number | null
          error_message?: string | null
          id?: string
          layer_id?: string | null
          model?: string | null
          started_at?: string | null
          status?: string
        }
        Update: {
          agent_id?: string
          completed_at?: string | null
          duration_ms?: number | null
          entries_created?: number | null
          entries_rejected?: number | null
          entries_updated?: number | null
          error_message?: string | null
          id?: string
          layer_id?: string | null
          model?: string | null
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_runs_layer_id_fkey"
            columns: ["layer_id"]
            isOneToOne: false
            referencedRelation: "layers"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          entity_id: string
          id: number
          name: string
          position: number
        }
        Insert: {
          entity_id: string
          id?: number
          name: string
          position: number
        }
        Update: {
          entity_id?: string
          id?: number
          name?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entities: {
        Row: {
          color: string
          description: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          color: string
          description?: string | null
          id: string
          name: string
          type: string
        }
        Update: {
          color?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      entries: {
        Row: {
          confidence: number | null
          created_at: string | null
          created_by: string | null
          data: Json
          id: string
          layer_id: string
          source: string | null
          source_date: string | null
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          created_by?: string | null
          data: Json
          id?: string
          layer_id: string
          source?: string | null
          source_date?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          created_by?: string | null
          data?: Json
          id?: string
          layer_id?: string
          source?: string | null
          source_date?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entries_layer_id_fkey"
            columns: ["layer_id"]
            isOneToOne: false
            referencedRelation: "layers"
            referencedColumns: ["id"]
          },
        ]
      }
      layers: {
        Row: {
          actual_rows: number | null
          category_id: number
          created_at: string | null
          entity_id: string
          freshness_score: number | null
          id: string
          last_populated_at: string | null
          last_verified_at: string | null
          name: string
          platform_code: string
          quality_score: number | null
          status: string | null
          target_rows: number | null
          updated_at: string | null
        }
        Insert: {
          actual_rows?: number | null
          category_id: number
          created_at?: string | null
          entity_id: string
          freshness_score?: number | null
          id: string
          last_populated_at?: string | null
          last_verified_at?: string | null
          name: string
          platform_code: string
          quality_score?: number | null
          status?: string | null
          target_rows?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_rows?: number | null
          category_id?: number
          created_at?: string | null
          entity_id?: string
          freshness_score?: number | null
          id?: string
          last_populated_at?: string | null
          last_verified_at?: string | null
          name?: string
          platform_code?: string
          quality_score?: number | null
          status?: string | null
          target_rows?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "layers_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "layers_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "layers_platform_code_fkey"
            columns: ["platform_code"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["code"]
          },
        ]
      }
      platforms: {
        Row: {
          code: string
          color: string
          description: string | null
          name: string
        }
        Insert: {
          code: string
          color: string
          description?: string | null
          name: string
        }
        Update: {
          code?: string
          color?: string
          description?: string | null
          name?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          avg_freshness: number | null
          avg_quality: number | null
          completion_pct: number | null
          date: string
          entity_id: string
          id: number
          populated_layers: number | null
          total_entries: number | null
          total_layers: number | null
        }
        Insert: {
          avg_freshness?: number | null
          avg_quality?: number | null
          date?: string
          entity_id: string
          id?: number
          populated_layers?: number | null
          total_entries?: number | null
          total_layers?: number | null
        }
        Update: {
          avg_freshness?: number | null
          avg_quality?: number | null
          date?: string
          entity_id?: string
          id?: number
          populated_layers?: number | null
          total_entries?: number | null
          total_layers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      daily_snapshot: { Args: Record<string, never>; Returns: undefined }
      entity_stats: {
        Args: { p_entity_id?: string }
        Returns: {
          avg_freshness: number
          avg_quality: number
          completion_pct: number
          empty_layers: number
          entity_id: string
          entity_name: string
          entity_type: string
          populated_layers: number
          total_entries: number
          total_layers: number
          total_target_rows: number
        }[]
      }
      search_layers: {
        Args: { p_limit?: number; p_query: string }
        Returns: {
          actual_rows: number
          entity_id: string
          entity_name: string
          id: string
          name: string
          platform_code: string
          similarity: number
          status: string
          target_rows: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
