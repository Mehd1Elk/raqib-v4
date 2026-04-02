'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search, X, ExternalLink, Mail, Phone, ChevronDown, CalendarDays } from 'lucide-react';
import type {
  AcquisitionContact,
  Priority,
  Persona,
} from './types';
import {
  PERSONAS,
  PERSONA_LABELS,
  PERSONA_COLORS,
  PRIORITY_COLORS,
} from './types';

// ── Micro-components ──────────────────────────

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block text-[7px] font-[family-name:var(--font-jetbrains)] px-1.5 py-0.5 rounded-none tracking-[0.5px]"
      style={{ color, background: `${color}15` }}
    >
      {label}
    </span>
  );
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-ivory border border-div rounded-none px-2.5 py-1.5 pr-7 text-[9px] font-[family-name:var(--font-jetbrains)] text-t2 cursor-pointer focus:outline-none focus:border-gold"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-t3 pointer-events-none" />
    </div>
  );
}

const thS =
  'text-[8px] font-[family-name:var(--font-jetbrains)] tracking-[1px] uppercase text-tm px-3 py-2.5 text-left whitespace-nowrap bg-noir text-ivory sticky top-0 z-10';
const tdS =
  'text-[10px] font-[family-name:var(--font-noto)] text-t2 px-3 py-2 border-b border-div-l whitespace-nowrap';

// ── Main View ──────────────────────────

export function ContactsView() {
  const [contacts, setContacts] = useState<AcquisitionContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AcquisitionContact | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [personaFilter, setPersonaFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    fetch('/api/acquisition/contacts')
      .then((r) => r.json())
      .then((d) => setContacts(d.contacts ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const companies = useMemo(
    () => [...new Set(contacts.map((c) => c.company_name))].filter(Boolean).sort(),
    [contacts]
  );

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.company_name?.toLowerCase().includes(q) &&
          !c.role?.toLowerCase().includes(q)
        )
          return false;
      }
      if (personaFilter && c.persona !== personaFilter) return false;
      if (companyFilter && c.company_name !== companyFilter) return false;
      if (priorityFilter && c.priority !== priorityFilter) return false;
      return true;
    });
  }, [contacts, search, personaFilter, companyFilter, priorityFilter]);

  const activeFilters = [personaFilter, companyFilter, priorityFilter, search].filter(Boolean).length;

  if (loading) {
    return (
      <div className="p-6 space-y-3 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-ivory border border-div rounded-none h-10" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Toolbar ── */}
      <div className="flex-shrink-0 px-6 py-3 bg-ivory border-b border-div flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-[300px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-t3" />
          <input
            type="text"
            placeholder="Rechercher un contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream border border-div rounded-none pl-8 pr-3 py-1.5 text-[10px] font-[family-name:var(--font-noto)] text-t1 placeholder:text-tm focus:outline-none focus:border-gold"
          />
        </div>

        <FilterDropdown
          label="Persona"
          value={personaFilter}
          options={PERSONAS.map((p) => ({ value: p, label: p }))}
          onChange={setPersonaFilter}
        />
        <FilterDropdown
          label="Entreprise"
          value={companyFilter}
          options={companies.map((c) => ({ value: c, label: c }))}
          onChange={setCompanyFilter}
        />
        <FilterDropdown
          label="Priorité"
          value={priorityFilter}
          options={(['P0', 'P1', 'P2', 'P3'] as Priority[]).map((p) => ({ value: p, label: p }))}
          onChange={setPriorityFilter}
        />

        {activeFilters > 0 && (
          <button
            onClick={() => {
              setSearch('');
              setPersonaFilter('');
              setCompanyFilter('');
              setPriorityFilter('');
            }}
            className="text-[8px] font-[family-name:var(--font-jetbrains)] text-ruby hover:underline cursor-pointer"
          >
            Réinitialiser ({activeFilters})
          </button>
        )}

        <span className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm ml-auto">
          {filtered.length} / {contacts.length}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr>
              <th className={thS}>Nom</th>
              <th className={thS}>Rôle</th>
              <th className={thS}>Persona</th>
              <th className={thS}>Entreprise</th>
              <th className={thS}>LinkedIn</th>
              <th className={thS}>Dernière action</th>
              <th className={thS}>Prochaine action</th>
              <th className={thS}>Priorité</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className={`cursor-pointer transition-colors hover:bg-parchment ${
                  i % 2 === 0 ? 'bg-ivory' : 'bg-cream'
                } ${selected?.id === c.id ? 'bg-parchment' : ''}`}
              >
                <td className={tdS}>
                  <span className="font-[family-name:var(--font-playfair)] text-[12px] font-bold  text-t1">
                    {c.name}
                  </span>
                </td>
                <td className={tdS}>{c.role}</td>
                <td className={tdS}>
                  <Pill label={c.persona} color={PERSONA_COLORS[c.persona] ?? '#918977'} />
                </td>
                <td className={`${tdS} font-[family-name:var(--font-jetbrains)]`}>{c.company_name}</td>
                <td className={tdS}>
                  {c.linkedin ? (
                    <a
                      href={c.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sapphire hover:text-gold inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="text-[8px]">Profil</span>
                    </a>
                  ) : (
                    <span className="text-tm">—</span>
                  )}
                </td>
                <td className={tdS}>
                  {c.last_action ? (
                    <div>
                      <div className="text-[9px] text-t2">{c.last_action}</div>
                      {c.last_action_date && (
                        <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-t3">
                          {new Date(c.last_action_date).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-tm">—</span>
                  )}
                </td>
                <td className={tdS}>
                  {c.next_action ? (
                    <div>
                      <div className="text-[9px] text-t2">{c.next_action}</div>
                      {c.next_action_date && (
                        <div className="text-[7px] font-[family-name:var(--font-jetbrains)] text-t3">
                          {new Date(c.next_action_date).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-tm">—</span>
                  )}
                </td>
                <td className={tdS}>
                  <Pill label={c.priority} color={PRIORITY_COLORS[c.priority]} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-12">
                  <p className="text-[10px] font-[family-name:var(--font-noto)] text-t3">
                    Aucun contact ne correspond aux filtres
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Detail Slide-In ── */}
      {selected && (
        <ContactDetailPanel contact={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// ── Detail Panel ──────────────────────────

function ContactDetailPanel({
  contact,
  onClose,
}: {
  contact: AcquisitionContact;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-noir/30 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[420px] max-w-[90vw] z-50 bg-ivory border-l border-div shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-div">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold  text-noir">
              {contact.name}
            </h3>
            <p className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3 mt-0.5">
              {contact.role} · {contact.company_name}
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-cream rounded-none cursor-pointer">
            <X className="w-4 h-4 text-t3" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <Pill label={contact.persona} color={PERSONA_COLORS[contact.persona] ?? '#918977'} />
            <Pill label={contact.priority} color={PRIORITY_COLORS[contact.priority]} />
          </div>

          {/* Contact info */}
          <DetailSection title="Coordonnées">
            {contact.email && (
              <div className="flex items-center gap-2 py-1.5">
                <Mail className="w-3 h-3 text-t3" />
                <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-t1">
                  {contact.email}
                </span>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-2 py-1.5">
                <Phone className="w-3 h-3 text-t3" />
                <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-t1">
                  {contact.phone}
                </span>
              </div>
            )}
            {contact.linkedin && (
              <div className="flex items-center gap-2 py-1.5">
                <ExternalLink className="w-3 h-3 text-t3" />
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-[family-name:var(--font-jetbrains)] text-sapphire hover:text-gold"
                >
                  LinkedIn
                </a>
              </div>
            )}
            {!contact.email && !contact.phone && !contact.linkedin && (
              <p className="text-[9px] font-[family-name:var(--font-noto)] text-t3">Aucune coordonnée</p>
            )}
          </DetailSection>

          {/* Historique actions */}
          <DetailSection title="Historique">
            <div className="space-y-2">
              {contact.last_action && (
                <ActionItem
                  label="Dernière action"
                  action={contact.last_action}
                  date={contact.last_action_date}
                  past
                />
              )}
              {contact.next_action && (
                <ActionItem
                  label="Prochaine action"
                  action={contact.next_action}
                  date={contact.next_action_date}
                />
              )}
              {!contact.last_action && !contact.next_action && (
                <p className="text-[9px] font-[family-name:var(--font-noto)] text-t3">
                  Aucune action enregistrée
                </p>
              )}
            </div>
          </DetailSection>

          {/* Meta */}
          <DetailSection title="Métadonnées">
            <PropRow label="Entreprise" value={contact.company_name} />
            <PropRow label="Persona" value={PERSONA_LABELS[contact.persona] ?? contact.persona} />
            <PropRow label="Priorité" value={contact.priority} />
            <PropRow
              label="Créé le"
              value={new Date(contact.created_at).toLocaleDateString('fr-FR')}
            />
            <PropRow
              label="Mis à jour"
              value={new Date(contact.updated_at).toLocaleDateString('fr-FR')}
            />
          </DetailSection>

          {/* Notes */}
          {contact.notes && (
            <DetailSection title="Notes">
              <p className="text-[10px] font-[family-name:var(--font-noto)] text-t2 leading-relaxed">
                {contact.notes}
              </p>
            </DetailSection>
          )}
        </div>
      </div>
    </>
  );
}

// ── Sub-components ──────────────────────────

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm tracking-[1.5px] uppercase mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}

function PropRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-div-l last:border-0">
      <span className="text-[9px] font-[family-name:var(--font-jetbrains)] text-t3">{label}</span>
      <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-t1">{value}</span>
    </div>
  );
}

function ActionItem({
  label,
  action,
  date,
  past,
}: {
  label: string;
  action: string;
  date?: string;
  past?: boolean;
}) {
  return (
    <div className="flex items-start gap-2 p-2 bg-cream rounded-none">
      <CalendarDays className={`w-3 h-3 mt-0.5 flex-shrink-0 ${past ? 'text-t3' : 'text-gold'}`} />
      <div className="flex-1 min-w-0">
        <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm uppercase tracking-[0.5px]">
          {label}
        </div>
        <div className="text-[10px] font-[family-name:var(--font-noto)] text-t1 mt-0.5">{action}</div>
        {date && (
          <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-t3 mt-0.5">
            {new Date(date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsView;
