import { useSyncExternalStore, useCallback } from 'react';
import { FLOWS, ENTITIES } from './NexusCanvas';

/* ═══ Types ═══ */
export interface NexusEntity {
  id: string;
  name: string;
  tagline: string;
  color: string;
  size: number;
}

export interface NexusFlow {
  source: string;
  target: string;
  label: string;
  volume: number;
  type: string;
}

interface NexusState {
  selectedEntity: NexusEntity | null;
  selectedFlow: NexusFlow | null;
  activeFlowTypes: Set<string>;
}

/* ═══ Store ═══ */
const ALL_TYPES = new Set(['consent','audit','data','proof','command','invest','knowledge','verify','cert','eco']);

let state: NexusState = {
  selectedEntity: null,
  selectedFlow: null,
  activeFlowTypes: new Set(ALL_TYPES),
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach(fn => fn());
}

function getSnapshot(): NexusState {
  return state;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

/* ═══ Actions ═══ */
export function selectEntity(entity: NexusEntity | null) {
  state = { ...state, selectedEntity: entity, selectedFlow: null };
  emit();
}

export function selectFlow(flow: NexusFlow | null) {
  state = { ...state, selectedFlow: flow, selectedEntity: null };
  emit();
}

export function toggleFlowType(type: string) {
  const next = new Set(state.activeFlowTypes);
  if (next.has(type)) next.delete(type); else next.add(type);
  state = { ...state, activeFlowTypes: next };
  emit();
}

/* ═══ Hook ═══ */
export function useNexusStore() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const connectedFlows = snap.selectedEntity
    ? FLOWS.filter(f => f.source === snap.selectedEntity!.id || f.target === snap.selectedEntity!.id)
    : [];

  return {
    selectedEntity: snap.selectedEntity,
    selectedFlow: snap.selectedFlow,
    activeFlowTypes: snap.activeFlowTypes,
    connectedFlows,
    flowCount: FLOWS.length,
    entities: ENTITIES,
    selectEntity: useCallback((e: NexusEntity | null) => selectEntity(e), []),
    selectFlow: useCallback((f: NexusFlow | null) => selectFlow(f), []),
    toggleFlowType: useCallback((t: string) => toggleFlowType(t), []),
  };
}
