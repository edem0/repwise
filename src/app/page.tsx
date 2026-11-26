"use client";

import { useState } from "react";
import {
  Activity, ArrowDownLeft, ArrowUpRight, Bell, CalendarDays, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, Clock3, CreditCard, FileText,
  LayoutDashboard, Menu, Plus, Search, Settings, Users, Wallet, X,
} from "lucide-react";

const nav = [
  { label: "Főoldal", icon: LayoutDashboard },
  { label: "Vendégek", icon: Users },
  { label: "Napi bevételek", icon: Wallet, children: ["Forgalom", "Összesítő"] },
  { label: "Számlázás", icon: FileText },
  { label: "Pénzmozgások", icon: ArrowDownLeft },
  { label: "Napló", icon: Activity },
  { label: "Beállítások", icon: Settings, children: ["Kasszák", "Bérletek"] },
];

const money = new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF", maximumFractionDigits: 0 });

export default function Home() {
  const [active, setActive] = useState("Főoldal");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [saleOpen, setSaleOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  function toggle(label: string) {
    setExpanded((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Activity size={23} strokeWidth={3} /></div>
          <span>Repwise</span>
          <button className="mobile-close icon-button" onClick={() => setMobileNav(false)} aria-label="Menü bezárása"><X size={19} /></button>
        </div>
        <div className="workspace-label">MUNKATERÜLET</div>
        <nav className="nav-list">
          {nav.map((item) => {
            const Icon = item.icon;
            const isExpanded = expanded.includes(item.label);
            const hasChildren = Boolean(item.children);
            return (
              <div key={item.label}>
                <button
                  className={`nav-item ${active === item.label ? "nav-active" : ""}`}
                  onClick={() => hasChildren ? toggle(item.label) : (setActive(item.label), setMobileNav(false))}
                >
                  <Icon size={18} strokeWidth={1.9} />
                  <span>{item.label}</span>
                  {hasChildren && <ChevronDown className={isExpanded ? "chevron-rotated" : ""} size={16} />}
                </button>
                {hasChildren && isExpanded && (
                  <div className="subnav">
                    {item.children?.map((child) => (
                      <button key={child} className={`subnav-item ${active === child ? "subnav-active" : ""}`} onClick={() => { setActive(child); setMobileNav(false); }}>
                        <span className="subnav-dot" />{child}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><CircleHelp size={17} /></div><div><strong>Segítségre van szükséged?</strong><span>A Repwise mindig kéznél van.</span></div></div>
          <div className="profile-row"><div className="avatar">R</div><div className="profile-copy"><strong>Saját munkaterület</strong><span>Személyes fiók</span></div><ChevronDown size={16} /></div>
        </div>
      </aside>

      {mobileNav && <button className="mobile-scrim" onClick={() => setMobileNav(false)} aria-label="Menü bezárása" />}

      <section className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" onClick={() => setMobileNav(true)} aria-label="Menü megnyitása"><Menu size={21} /></button>
          <div className="breadcrumb"><span>Repwise</span><ChevronRight size={15} /><strong>{active}</strong></div>
          <div className="top-actions">
            <button className="date-chip"><CalendarDays size={16} />2026. november 26.</button>
            <button className="icon-button notification-button" aria-label="Értesítések"><Bell size={18} /><i /></button>
            <button className="primary-button" onClick={() => setSaleOpen(true)}><Plus size={18} />Értékesítés</button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div><div className="eyebrow">ÜDVÖZLÜNK A REPWISE-BAN</div><h1>{active}</h1><p className="muted">Lássuk, hogyan alakul a mai napod.</p></div>
            <div className="live-clock"><span className="clock-dot" /><Clock3 size={17} /><span>22:12</span><small>HELYI IDŐ</small></div>
          </div>

          <div className="status-strip">
            <button className="status-card" onClick={() => alert("A napnyitás és napzárás funkciót a következő fejlesztési lépésben építjük be.")}>
              <div className="status-symbol"><Clock3 size={21} /></div><div className="status-copy"><span>NAPI ÁLLAPOT</span><strong>Zárva</strong></div><span className="status-action">Nap megnyitása <ChevronRight size={15} /></span>
            </button>
            <div className="date-note"><span className="date-note-label">MAI DÁTUM</span><strong>2026. november 26., csütörtök</strong><span>A napod még csak most kezdődik.</span></div>
          </div>

          <div className="section-heading"><div><h2>Mai értékesítések</h2><p className="muted">Kasszánkénti napi forgalom</p></div><span className="section-tag">MAI NAP</span></div>
          <div className="empty-registers">
            <div className="empty-icon"><Wallet size={22} /></div>
            <div><strong>Még nincsenek kasszák</strong><p>A kezdéshez hozz létre egy kasszát a Beállításokban.</p></div>
            <button className="secondary-button" onClick={() => { setActive("Kasszák"); setExpanded(["Beállítások"]); }}>Kasszák beállítása <ChevronRight size={15} /></button>
          </div>

          <div className="section-heading recent-heading"><div><h2>Legutóbbi értékesítések</h2><p className="muted">A mai nap utolsó 3 tranzakciója</p></div></div>
          <div className="empty-sales"><div className="empty-sales-icon"><FileText size={20} /></div><span>Ma még nem történt értékesítés.</span></div>

          <footer className="page-footer"><span>Repwise <span className="footer-separator">·</span> Személyes forgalomkezelő</span><span>Egyszerűen. Átláthatóan.</span></footer>
        </div>
      </section>

      {saleOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSaleOpen(false); }}>
          <section className="sale-modal" role="dialog" aria-modal="true" aria-labelledby="sale-title">
            <div className="modal-head"><div><span className="eyebrow">ÚJ TRANZAKCIÓ</span><h2 id="sale-title">Értékesítés</h2></div><button className="icon-button" onClick={() => setSaleOpen(false)} aria-label="Bezárás"><X size={20} /></button></div>
            <div className="modal-placeholder"><div className="placeholder-icon"><CreditCard size={23} /></div><strong>Hamarosan itt indíthatod az értékesítést</strong><p>A vendég-, alkalom- és kasszaválasztó mezőket a következő fejlesztési lépésben kötjük be.</p></div>
            <button className="primary-button modal-done" onClick={() => setSaleOpen(false)}>Rendben</button>
          </section>
        </div>
      )}
    </main>
  );
}
