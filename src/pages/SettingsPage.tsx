import { useMemo, useState } from "react";
import TitleComponent from "../components/shared/TitleComponent";
import { BookOpen, Shield, Bell, SlidersHorizontal, Save, RotateCcw } from "lucide-react";
import Switch from "../components/ui/Switch";

type Settings = {
  autoplayNext: boolean;
  showProgressOnCards: boolean;
  preferredLevel: "beginner" | "intermediate" | "advanced";
  publicProfile: boolean;
  rememberDevice: boolean;
  emailAnnouncements: boolean;
  courseReminders: boolean;
};

const STORAGE_KEY = "settings";

function readSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Settings;
  } catch {}
  return {
    autoplayNext: true,
    showProgressOnCards: true,
    preferredLevel: "beginner",
    publicProfile: false,
    rememberDevice: true,
    emailAnnouncements: true,
    courseReminders: true,
  };
}

function saveSettings(s: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("storage"));
}

export default function SettingsPage() {
  const initial = useMemo(() => readSettings(), []);
  const [settings, setSettings] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    try {
      saveSettings(settings);
    } finally {
      setSaving(false);
    }
  };

  const onReset = () => {
    const next = {
      autoplayNext: true,
      showProgressOnCards: true,
      preferredLevel: "beginner",
      publicProfile: false,
      rememberDevice: true,
      emailAnnouncements: true,
      courseReminders: true,
    } satisfies Settings;

    setSettings(next);
    saveSettings(next);
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage:"linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",}}/>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent title="Settings" description="Personalize your learning experience and manage your privacy." align="center" className="max-w-2xl"/>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6 min-w-0">
            <div className="rounded-3xl border border-border bg-bg-main p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <BookOpen size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary">Learning preferences</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Make the platform fit your study style.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-bg-secondary/40 px-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">Autoplay next lesson</p>
                    <p className="mt-1 text-xs text-text-muted">
                      Automatically continue to the next lesson when one finishes.
                    </p>
                  </div>
                  <Switch checked={settings.autoplayNext} onChange={(v) => setSettings((p) => ({ ...p, autoplayNext: v }))}/>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-bg-secondary/40 px-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">Show progress on course cards</p>
                    <p className="mt-1 text-xs text-text-muted"> Display your completion progress directly on the course list.</p>
                  </div>
                  <Switch checked={settings.showProgressOnCards} onChange={(v) => setSettings((p) => ({ ...p, showProgressOnCards: v }))}/>
                </div>
                <div className="rounded-2xl border border-border bg-bg-secondary/40 px-4 py-4">
                  <p className="text-sm font-medium text-text-primary">Preferred difficulty</p>
                  <p className="mt-1 text-xs text-text-muted"> Helps us highlight courses that match your level.</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">

                    {(["beginner", "intermediate", "advanced"] as const).map((lvl) => {
                      const active = settings.preferredLevel === lvl;
                      return (
                        <button key={lvl} type="button" onClick={() => setSettings((p) => ({ ...p, preferredLevel: lvl }))}
                          className={` h-11 rounded-2xl border border-border text-sm font-medium transition ${active ? "bg-bg-main text-text-primary" : "bg-bg-secondary/20 text-text-secondary hover:bg-bg-muted"}`}>
                          {lvl[0].toUpperCase() + lvl.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Secondn section */}
            <div className="rounded-3xl border border-border bg-bg-main p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Shield size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary">Privacy & security</p>
                  <p className="mt-1 text-sm text-text-secondary"> Control visibility and session behavior.</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-bg-secondary/40 px-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">Public profile</p>
                    <p className="mt-1 text-xs text-text-muted"> Allow your name to appear on leaderboards.</p>
                  </div>
                  <Switch checked={settings.publicProfile} onChange={(v) => setSettings((p) => ({ ...p, publicProfile: v }))}/>
                </div>

                <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-bg-secondary/40 px-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">Remember this device</p>
                    <p className="mt-1 text-xs text-text-muted"> Keep you signed in on this browser.</p>
                  </div>
                  <Switch checked={settings.rememberDevice} onChange={(v) => setSettings((p) => ({ ...p, rememberDevice: v }))}/>
                </div>
              </div>
            </div>

            {/* Third section */}
            <div className="rounded-3xl border border-border bg-bg-main p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Bell size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary">Notifications</p>
                  <p className="mt-1 text-sm text-text-secondary"> Choose what we notify you about.</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-bg-secondary/40 px-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">Platform announcements</p>
                    <p className="mt-1 text-xs text-text-muted"> New features, important updates, and policy changes.</p>
                  </div>
                  <Switch checked={settings.emailAnnouncements} onChange={(v) => setSettings((p) => ({ ...p, emailAnnouncements: v }))}/>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-bg-secondary/40 px-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">Course reminders</p>
                    <p className="mt-1 text-xs text-text-muted"> Friendly reminders to keep your streak going.</p>
                  </div>
                  <Switch checked={settings.courseReminders} onChange={(v) => setSettings((p) => ({ ...p, courseReminders: v }))}/>
                </div>
              </div>
            </div>
          </div>

          {/* Right section*/}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            <div className="rounded-3xl border border-border bg-bg-secondary/50 p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <SlidersHorizontal size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary">Actions</p>
                  <p className="mt-1 text-sm text-text-secondary"> Save or restore default settings anytime.</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <button type="button" onClick={onSave} disabled={saving} className={`h-12 rounded-2xl text-sm font-medium transition inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-hover ${saving ? "opacity-60 cursor-not-allowed" : ""}`}>
                  <Save size={16} />
                  {saving ? "Saving..." : "Save settings"}
                </button>

                <button type="button" onClick={onReset}
                  className=" h-12 rounded-2xl border border-border text-sm font-medium text-text-primary hover:bg-bg-muted transition inline-flex items-center justify-center gap-2">
                  <RotateCcw size={16} />
                  Reset to defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
