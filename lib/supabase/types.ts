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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agent_chats: {
        Row: {
          agent_id: string
          content: string
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          agent_id: string
          content: string
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          agent_id?: string
          content?: string
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
      agent_communications: {
        Row: {
          comm_type: string | null
          content: string
          created_at: string | null
          from_agent: string
          id: string
          metadata: Json | null
          to_agent: string
        }
        Insert: {
          comm_type?: string | null
          content: string
          created_at?: string | null
          from_agent: string
          id?: string
          metadata?: Json | null
          to_agent: string
        }
        Update: {
          comm_type?: string | null
          content?: string
          created_at?: string | null
          from_agent?: string
          id?: string
          metadata?: Json | null
          to_agent?: string
        }
        Relationships: []
      }
      agent_registry: {
        Row: {
          created_at: string | null
          entries_produced: number | null
          error_count: number | null
          fallback_platform: string | null
          id: string
          instructions: string | null
          knowledge: string[] | null
          languages: string[] | null
          last_run_at: string | null
          layer: string
          livrables_jour: number | null
          model: string | null
          name: string
          perimeter: string[] | null
          platform: string | null
          pole: string | null
          status: string | null
          tone: string | null
        }
        Insert: {
          created_at?: string | null
          entries_produced?: number | null
          error_count?: number | null
          fallback_platform?: string | null
          id: string
          instructions?: string | null
          knowledge?: string[] | null
          languages?: string[] | null
          last_run_at?: string | null
          layer: string
          livrables_jour?: number | null
          model?: string | null
          name: string
          perimeter?: string[] | null
          platform?: string | null
          pole?: string | null
          status?: string | null
          tone?: string | null
        }
        Update: {
          created_at?: string | null
          entries_produced?: number | null
          error_count?: number | null
          fallback_platform?: string | null
          id?: string
          instructions?: string | null
          knowledge?: string[] | null
          languages?: string[] | null
          last_run_at?: string | null
          layer?: string
          livrables_jour?: number | null
          model?: string | null
          name?: string
          perimeter?: string[] | null
          platform?: string | null
          pole?: string | null
          status?: string | null
          tone?: string | null
        }
        Relationships: []
      }
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
      board_meetings: {
        Row: {
          agents: string[]
          created_at: string | null
          created_by: string | null
          id: string
          question: string
          responses: Json
          synthesis: string | null
        }
        Insert: {
          agents?: string[]
          created_at?: string | null
          created_by?: string | null
          id?: string
          question: string
          responses?: Json
          synthesis?: string | null
        }
        Update: {
          agents?: string[]
          created_at?: string | null
          created_by?: string | null
          id?: string
          question?: string
          responses?: Json
          synthesis?: string | null
        }
        Relationships: []
      }
      captured_thoughts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          routed_to_agent: string | null
          routed_to_entity: string | null
          routed_to_layer: string | null
          status: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          routed_to_agent?: string | null
          routed_to_entity?: string | null
          routed_to_layer?: string | null
          status?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          routed_to_agent?: string | null
          routed_to_entity?: string | null
          routed_to_layer?: string | null
          status?: string | null
        }
        Relationships: []
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
      cohort_discussions: {
        Row: {
          closed_at: string | null
          cohort_id: string
          created_at: string | null
          id: string
          message_count: number | null
          status: string | null
          topic: string
        }
        Insert: {
          closed_at?: string | null
          cohort_id: string
          created_at?: string | null
          id?: string
          message_count?: number | null
          status?: string | null
          topic: string
        }
        Update: {
          closed_at?: string | null
          cohort_id?: string
          created_at?: string | null
          id?: string
          message_count?: number | null
          status?: string | null
          topic?: string
        }
        Relationships: []
      }
      cohort_messages: {
        Row: {
          agent_id: string
          agent_name: string
          content: string
          created_at: string | null
          discussion_id: string
          id: string
          message_type: string | null
          reply_to: string | null
        }
        Insert: {
          agent_id: string
          agent_name: string
          content: string
          created_at?: string | null
          discussion_id: string
          id?: string
          message_type?: string | null
          reply_to?: string | null
        }
        Update: {
          agent_id?: string
          agent_name?: string
          content?: string
          created_at?: string | null
          discussion_id?: string
          id?: string
          message_type?: string | null
          reply_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cohort_messages_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "cohort_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "cohort_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      conquest_cards: {
        Row: {
          blockers: string[] | null
          column_status: string | null
          days_left: number | null
          deadline: string | null
          description: string | null
          entity: string | null
          entity_color: string | null
          id: string
          notes: string | null
          position: number | null
          priority: string | null
          progress: number | null
          responsible: string | null
          title: string
          updated_at: string | null
          validated: boolean | null
        }
        Insert: {
          blockers?: string[] | null
          column_status?: string | null
          days_left?: number | null
          deadline?: string | null
          description?: string | null
          entity?: string | null
          entity_color?: string | null
          id: string
          notes?: string | null
          position?: number | null
          priority?: string | null
          progress?: number | null
          responsible?: string | null
          title: string
          updated_at?: string | null
          validated?: boolean | null
        }
        Update: {
          blockers?: string[] | null
          column_status?: string | null
          days_left?: number | null
          deadline?: string | null
          description?: string | null
          entity?: string | null
          entity_color?: string | null
          id?: string
          notes?: string | null
          position?: number | null
          priority?: string | null
          progress?: number | null
          responsible?: string | null
          title?: string
          updated_at?: string | null
          validated?: boolean | null
        }
        Relationships: []
      }
      decisions: {
        Row: {
          chosen_option: string | null
          context: string | null
          created_at: string | null
          decided_at: string | null
          entity: string | null
          id: string
          options: Json
          question: string
          source: string | null
          urgency: string | null
        }
        Insert: {
          chosen_option?: string | null
          context?: string | null
          created_at?: string | null
          decided_at?: string | null
          entity?: string | null
          id?: string
          options?: Json
          question: string
          source?: string | null
          urgency?: string | null
        }
        Update: {
          chosen_option?: string | null
          context?: string | null
          created_at?: string | null
          decided_at?: string | null
          entity?: string | null
          id?: string
          options?: Json
          question?: string
          source?: string | null
          urgency?: string | null
        }
        Relationships: []
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
      focus_sessions: {
        Row: {
          decisions_taken: number | null
          ended_at: string | null
          id: string
          mode_id: string
          mode_label: string
          started_at: string | null
        }
        Insert: {
          decisions_taken?: number | null
          ended_at?: string | null
          id?: string
          mode_id: string
          mode_label: string
          started_at?: string | null
        }
        Update: {
          decisions_taken?: number | null
          ended_at?: string | null
          id?: string
          mode_id?: string
          mode_label?: string
          started_at?: string | null
        }
        Relationships: []
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
          completion_pct?: number | null
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
          completion_pct?: number | null
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
      stream_events: {
        Row: {
          created_at: string | null
          detail: string | null
          entity: string
          entity_color: string | null
          event_type: string
          id: string
          link: string | null
          title: string
          urgency: string | null
        }
        Insert: {
          created_at?: string | null
          detail?: string | null
          entity: string
          entity_color?: string | null
          event_type: string
          id?: string
          link?: string | null
          title: string
          urgency?: string | null
        }
        Update: {
          created_at?: string | null
          detail?: string | null
          entity?: string
          entity_color?: string | null
          event_type?: string
          id?: string
          link?: string | null
          title?: string
          urgency?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      daily_snapshot: { Args: never; Returns: undefined }
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
    Enums: {},
  },
} as const
