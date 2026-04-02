'use client';

import { useState, useEffect } from 'react';
import { GitBranch, Plus, Trash2, Save, Rocket, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';

interface WorkflowStep {
  agentId: string;
  agentName: string;
  condition: 'always' | 'if_success' | 'if_validated' | 'if_error';
}

interface Workflow {
  id: string;
  name: string;
  entity: string;
  steps: WorkflowStep[];
  status: 'draft' | 'deployed' | 'paused' | 'archived';
  created_at: string;
  updated_at: string;
}

interface Agent {
  id: string;
  name: string;
  layer: string;
  entity: string;
}

const CONDITIONS = [
  { value: 'always', label: 'Toujours', color: '#3D7C5E' },
  { value: 'if_success', label: 'Si succès', color: '#3D7C5E' },
  { value: 'if_validated', label: 'Si validé', color: '#B8963E' },
  { value: 'if_error', label: 'Si erreur', color: '#9C3D3D' },
];

const STATUS_LABELS: Record<string, { label: string; bg: string }> = {
  draft: { label: 'BROUILLON', bg: '#918977' },
  deployed: { label: 'DÉPLOYÉ', bg: '#3D7C5E' },
  paused: { label: 'PAUSÉ', bg: '#B87D3E' },
  archived: { label: 'ARCHIVÉ', bg: '#6B5E4C' },
};

export default function ChainEditor() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [current, setCurrent] = useState<Workflow | null>(null);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    fetch('/api/agents').then(r => r.json()).then(data => {
      setAgents(Array.isArray(data) ? data : data.agents || []);
    });
    refreshWorkflows();
  }, []);

  function refreshWorkflows() {
    fetch('/api/openclaw/workflows').then(r => r.json()).then(data => {
      setWorkflows(data.workflows || []);
    });
  }

  function newWorkflow() {
    setCurrent({
      id: '',
      name: 'Nouvelle chaîne',
      entity: 'EIGEN',
      steps: [],
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  function addStep() {
    if (!current) return;
    const firstAgent = agents[0];
    setCurrent({
      ...current,
      steps: [...current.steps, {
        agentId: firstAgent?.id || '',
        agentName: firstAgent?.name || '',
        condition: current.steps.length === 0 ? 'always' : 'if_success',
      }],
    });
  }

  function removeStep(index: number) {
    if (!current) return;
    setCurrent({
      ...current,
      steps: current.steps.filter((_, i) => i !== index),
    });
  }

  function moveStep(index: number, direction: -1 | 1) {
    if (!current) return;
    const newSteps = [...current.steps];
    const target = index + direction;
    if (target < 0 || target >= newSteps.length) return;
    [newSteps[index], newSteps[target]] = [newSteps[target], newSteps[index]];
    setCurrent({ ...current, steps: newSteps });
  }

  function updateStep(index: number, field: keyof WorkflowStep, value: string) {
    if (!current) return;
    const newSteps = [...current.steps];
    if (field === 'agentId') {
      const agent = agents.find(a => a.id === value);
      newSteps[index] = { ...newSteps[index], agentId: value, agentName: agent?.name || value };
    } else {
      newSteps[index] = { ...newSteps[index], [field]: value };
    }
    setCurrent({ ...current, steps: newSteps });
  }

  async function save() {
    if (!current) return;
    setSaving(true);
    try {
      const res = await fetch('/api/openclaw/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(current),
      });
      const saved = await res.json();
      setCurrent(saved.id ? saved : { ...current, id: saved.id });
      refreshWorkflows();
    } catch (e) {
      console.error('Save failed:', e);
    }
    setSaving(false);
  }

  async function deploy() {
    if (!current?.id) {
      await save();
    }
    setDeploying(true);
    try {
      await fetch('/api/openclaw/commands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: current!.id,
          command: 'deploy_workflow',
          payload: { workflowId: current!.id, steps: current!.steps },
        }),
      });
      setCurrent(current ? { ...current, status: 'deployed' } : null);
      refreshWorkflows();
    } catch (e) {
      console.error('Deploy failed:', e);
    }
    setDeploying(false);
  }

  return (
    <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[rgba(60,52,40,0.10)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch size={14} className="text-[#B8963E]" />
          <span className="font-['JetBrains_Mono'] text-[9px] tracking-wider text-[#918977]">
            CHAIN EDITOR
          </span>
        </div>
        <button onClick={newWorkflow}
          className="flex items-center gap-1 px-2 py-1 rounded-none font-['JetBrains_Mono'] text-[8px] bg-[#B8963E] text-white hover:bg-[#9A7B32]">
          <Plus size={10} /> NOUVELLE CHAÎNE
        </button>
      </div>

      <div className="flex" style={{ minHeight: '400px' }}>
        {/* Sidebar : liste des workflows */}
        <div className="w-[200px] border-r border-[rgba(60,52,40,0.10)] overflow-y-auto">
          {workflows.map(wf => (
            <div key={wf.id}
              onClick={() => setCurrent(wf)}
              className={`px-3 py-2 cursor-pointer border-b border-[rgba(60,52,40,0.04)] transition ${
                current?.id === wf.id ? 'bg-[rgba(184,150,62,0.08)]' : 'hover:bg-[rgba(184,150,62,0.03)]'
              }`}>
              <div className="font-['Noto_Sans'] text-[10px] text-[#1C1814] truncate">{wf.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-['JetBrains_Mono'] text-[7px] px-1.5 py-0.5 rounded-none-none text-white"
                  style={{ backgroundColor: STATUS_LABELS[wf.status]?.bg || '#918977' }}>
                  {STATUS_LABELS[wf.status]?.label || wf.status}
                </span>
                <span className="font-['JetBrains_Mono'] text-[7px] text-[#D4CCBA]">
                  {wf.steps?.length || 0} étapes
                </span>
              </div>
            </div>
          ))}
          {workflows.length === 0 && (
            <div className="px-3 py-6 text-center">
              <span className="font-['Noto_Sans'] text-[10px] text-[#918977]">
                Aucune chaîne
              </span>
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="flex-1 p-4">
          {!current ? (
            <div className="flex items-center justify-center h-full">
              <span className="font-['Noto_Sans'] text-[11px] text-[#918977]">
                Sélectionner ou créer une chaîne
              </span>
            </div>
          ) : (
            <>
              {/* Nom + Entity */}
              <div className="flex gap-3 mb-4">
                <input
                  value={current.name}
                  onChange={e => setCurrent({ ...current, name: e.target.value })}
                  className="flex-1 bg-[#F7F3EA] border border-[rgba(60,52,40,0.10)] rounded-none px-3 py-1.5 font-['Noto_Sans'] text-[11px] text-[#1C1814] outline-none focus:border-[#B8963E]"
                  placeholder="Nom de la chaîne"
                />
                <select
                  value={current.entity}
                  onChange={e => setCurrent({ ...current, entity: e.target.value })}
                  className="w-[120px] bg-[#F7F3EA] border border-[rgba(60,52,40,0.10)] rounded-none px-2 py-1.5 font-['JetBrains_Mono'] text-[9px] text-[#1C1814] outline-none">
                  {['EIGEN','NOOS','AELYA','MYNE','BURHAN','YRKNOWN','DIWANE','ALGUESOV','AMANA','CG','CERCLE'].map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              {/* Steps */}
              <div className="space-y-1 mb-4">
                {current.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 px-2 rounded-none bg-[#F7F3EA] border border-[rgba(60,52,40,0.06)]">
                    {/* Order number */}
                    <span className="font-['JetBrains_Mono'] text-[8px] text-[#D4CCBA] w-4 text-center">
                      {i + 1}
                    </span>

                    {/* Condition (sauf pour la première étape) */}
                    {i > 0 ? (
                      <div className="relative w-[100px]">
                        <select
                          value={step.condition}
                          onChange={e => updateStep(i, 'condition', e.target.value)}
                          className="w-full appearance-none bg-transparent border border-[rgba(60,52,40,0.10)] rounded-none px-2 py-1 font-['JetBrains_Mono'] text-[8px] text-[#6B5E4C] outline-none pr-6">
                          {CONDITIONS.map(c => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                        <ChevronDown size={8} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#918977] pointer-events-none" />
                      </div>
                    ) : (
                      <span className="w-[100px] font-['JetBrains_Mono'] text-[8px] text-[#918977] px-2">
                        Départ
                      </span>
                    )}

                    {/* Agent selector */}
                    <div className="relative flex-1">
                      <select
                        value={step.agentId}
                        onChange={e => updateStep(i, 'agentId', e.target.value)}
                        className="w-full appearance-none bg-white border border-[rgba(60,52,40,0.10)] rounded-none px-2 py-1 font-['JetBrains_Mono'] text-[9px] text-[#1C1814] outline-none pr-6">
                        {agents.map(a => (
                          <option key={a.id} value={a.id}>
                            [{a.layer}] {a.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={8} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#918977] pointer-events-none" />
                    </div>

                    {/* Move buttons */}
                    <button onClick={() => moveStep(i, -1)} disabled={i === 0}
                      className="p-0.5 rounded-none hover:bg-[rgba(184,150,62,0.1)] disabled:opacity-20">
                      <ArrowUp size={10} className="text-[#918977]" />
                    </button>
                    <button onClick={() => moveStep(i, 1)} disabled={i === current.steps.length - 1}
                      className="p-0.5 rounded-none hover:bg-[rgba(184,150,62,0.1)] disabled:opacity-20">
                      <ArrowDown size={10} className="text-[#918977]" />
                    </button>

                    {/* Delete */}
                    <button onClick={() => removeStep(i)}
                      className="p-0.5 rounded-none hover:bg-[rgba(156,61,61,0.1)]">
                      <Trash2 size={10} className="text-[#9C3D3D]" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add step */}
              <button onClick={addStep}
                className="w-full py-2 border border-dashed border-[rgba(60,52,40,0.15)] rounded-none text-center font-['JetBrains_Mono'] text-[8px] text-[#918977] hover:border-[#B8963E] hover:text-[#B8963E] transition mb-4">
                + Ajouter une étape
              </button>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button onClick={save} disabled={saving}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-none font-['JetBrains_Mono'] text-[8px] border border-[rgba(60,52,40,0.10)] text-[#918977] hover:border-[#B8963E] disabled:opacity-40">
                  <Save size={10} /> {saving ? 'SAUVEGARDE...' : 'SAUVEGARDER'}
                </button>
                <button onClick={deploy} disabled={deploying || current.steps.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-none font-['JetBrains_Mono'] text-[8px] bg-[#B8963E] text-white hover:bg-[#9A7B32] disabled:opacity-40">
                  <Rocket size={10} /> {deploying ? 'DÉPLOIEMENT...' : 'DÉPLOYER'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
