import { useEffect, useMemo, useState } from "react";
import TitleComponent from "../components/shared/TitleComponent";
import { Camera, Mail, Phone, ShieldCheck, User2, Save, BadgeCheck, Settings } from "lucide-react";
import { getAuth } from "../utils/auth";
import { readProfile, writeProfile, type ProfileData } from "../utils/profile";
import { useToast } from "../components/shared/Toast";
import VerifyPhoneModal from "../components/VerifyPhoneModal";
import { Link } from "react-router-dom";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfilePage() {
  const { toast } = useToast();
  const auth = useMemo(() => getAuth(), []);
  const baseName = auth.user?.name ?? "User";
  const baseEmail = auth.user?.email ?? "";
  const initialProfile = useMemo<ProfileData>(() => {
    const p = readProfile();
    return (
      p ?? {name: baseName, email: baseEmail, phone: "", phoneVerified: false, avatar: "", bio: "", country: "", website: "", linkedin: "", github: "",}
    );
  }, [baseName, baseEmail]);

  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [saving, setSaving] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);

  useEffect(() => {
    writeProfile(profile);
  }, []);

  const canSave = useMemo(() => {
    return profile.name.trim().length >= 2 && profile.email.trim().length > 4;
  }, [profile.name, profile.email]);

  const inputWrap ="group flex items-center gap-3 rounded-2xl border border-border bg-bg-main px-4 h-12 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15";

  const inputBase = "w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted";

  const onPickAvatar = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ variant: "error", title: "Invalid file", message: "Please select an image file." });
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setProfile((p) => ({ ...p, avatar: dataUrl }));
  };

  const onSave = async () => {
    if (!canSave) return;

    setSaving(true);
    try {
      writeProfile(profile);
      toast({ variant: "success", title: "Saved", message: "Profile updated successfully." });
    } finally {
      setSaving(false);
    }
  };

  const sendVerification = () => {
    const phone = profile.phone?.trim() ?? "";
    if (phone.length < 7) {
      toast({ variant: "error", title: "Phone required", message: "Please enter a valid phone number first." });
      return;
    }
    toast({
      variant: "info",
      title: "Verification code sent",
      message: `We sent a code to ${phone}. Enter it to verify.`,
    });

    setVerifyOpen(true);
  };

  const markVerified = () => {
    setProfile((p) => ({ ...p, phoneVerified: true }));
    toast({ variant: "success", title: "Phone verified", message: "Your phone number is now verified." });
  };
  const initials = (profile.name?.trim()?.[0] ?? "U").toUpperCase();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg-main to-transparent" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg-main" />
        <div className="absolute -top-32 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 left-24 h-105 w-105 rounded-full bg-cta/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
          style={{ backgroundImage: "linear-gradient(to right, rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.35) 1px, transparent 1px)", backgroundSize: "44px 44px",}}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <TitleComponent title="Profile" description="Update your info, verify your phone, and add extra details." align="center" className="max-w-2xl"/>
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 min-w-0 space-y-6">
            <div className="rounded-3xl border border-border bg-bg-secondary/60 p-6 sm:p-7 backdrop-blur">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex items-center gap-4">
                  <div className=" relative h-18 w-18 rounded-full overflow-hidden border border-border bg-bg-main grid place-items-center shrink-0">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="user img" className="h-full w-full object-cover" loading="lazy"/>
                    ) : (
                      <span className="text-text-primary font-semibold text-xl">
                        {initials}
                      </span>
                    )}

                    <label className=" absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full border border-border bg-bg-secondary/80 backdrop-blur cursor-pointer hover:bg-bg-muted transition" title="Change Image">
                      <Camera size={16} className="text-text-secondary" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => onPickAvatar(e.target.files?.[0])}/>
                    </label>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary wrap-break-word">
                      {profile.name}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary wrap-break-word">
                      {profile.email}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-main/60 px-3 py-1 text-xs text-text-secondary">
                        <ShieldCheck size={14} className="text-primary" />
                        Account
                      </span>

                      <span className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs ${profile.phoneVerified ? "bg-primary/10 text-primary" : "bg-bg-main/60 text-text-secondary"}`}>
                        <BadgeCheck size={14} className={profile.phoneVerified ? "text-primary" : "text-text-muted"} />
                        {profile.phoneVerified ? "Phone verified" : "Phone not verified"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sm:ml-auto">
                  <button onClick={onSave} disabled={!canSave || saving} className={`h-12 w-full sm:w-auto px-5 rounded-2xl text-sm font-medium transition inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-hover ${!canSave || saving && "opacity-60 cursor-not-allowed"}`}>
                    <Save size={16} />
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>

            {/* Basic info section*/}
            <div className="rounded-3xl border border-border bg-bg-main p-6">
              <h3 className="text-base font-semibold text-text-primary">Basic info</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 min-w-0">
                <label className="grid gap-2 min-w-0">
                  <span className="text-xs text-text-muted">Full name</span>
                  <div className={inputWrap}>
                    <User2 size={18} className="text-text-muted group-focus-within:text-primary transition" />
                    <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className={inputBase} placeholder="Your name" autoComplete="name"/>
                  </div>
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs text-text-muted">Email</span>
                  <div className={inputWrap}>
                    <Mail size={18} className="text-text-muted group-focus-within:text-primary transition" />
                    <input value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                      className={inputBase} placeholder="you@example.com" autoComplete="email"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Phone verification section*/}
            <div className="rounded-3xl border border-border bg-bg-main p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-text-primary">Phone</h3>
                  <p className="mt-1 text-sm text-text-secondary"> Add your phone number and verify it for extra security.</p>
                </div>

                <button type="button" onClick={sendVerification} className={`h-12 shrink-0 px-4 rounded-2xl text-sm font-medium transition ${profile.phoneVerified ? "border border-border bg-bg-muted text-text-muted cursor-not-allowed": "bg-primary text-white hover:bg-primary-hover"}`} disabled={profile.phoneVerified}>
                  {profile.phoneVerified ? "Verified" : "Verify"}
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 min-w-0">
                <label className="grid gap-2 min-w-0 sm:col-span-2">
                  <span className="text-xs text-text-muted">Phone number</span>
                  <div className={inputWrap}>
                    <Phone size={18} className="text-text-muted group-focus-within:text-primary transition" />
                    <input value={profile.phone ?? ""} onChange={(e) =>
                        setProfile((p) => ({...p, phone: e.target.value,
                          phoneVerified: false, // reset if changed
                        }))
                      }
                      className={inputBase}
                      placeholder="+963 989 124 578"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Extra info section */}
            <div className="rounded-3xl border border-border bg-bg-main p-6">
              <h3 className="text-base font-semibold text-text-primary">Additional info</h3>
              <p className="mt-1 text-sm text-text-secondary"> Optional details to personalize your profile.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 min-w-0">
                <label className="grid gap-2 min-w-0 sm:col-span-2">
                  <span className="text-xs text-text-muted">Bio</span>
                  <textarea value={profile.bio ?? ""} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} rows={4}
                    placeholder="Tell us a bit about you..." className=" w-full rounded-2xl border border-border bg-bg-secondary/40 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition min-w-0"/>
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs text-text-muted">Country</span>
                  <input value={profile.country ?? ""} onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}
                    className=" h-12 w-full rounded-2xl border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"
                    placeholder="Syria"
                  />
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs text-text-muted">Website</span>
                  <input value={profile.website ?? ""} onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))}
                    className="h-12 w-full rounded-2xl border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted
                      focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"
                    placeholder="enter your website url"
                  />
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs text-text-muted">LinkedIn</span>
                  <input value={profile.linkedin ?? ""} onChange={(e) => setProfile((p) => ({ ...p, linkedin: e.target.value }))}
                    className="h-12 w-full rounded-2xl border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"
                    placeholder="enter your linkedin url"
                  />
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs text-text-muted">GitHub</span>
                  <input value={profile.github ?? ""} onChange={(e) => setProfile((p) => ({ ...p, github: e.target.value }))}
                    className="h-12 w-full rounded-2xl border border-border bg-bg-secondary/40 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition"
                    placeholder="enter your github url"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="lg:col-span-4 min-w-0 space-y-6">
            <div className="rounded-3xl border border-border bg-bg-secondary/50 p-6">
              <p className="text-sm font-semibold text-text-primary">Note</p>
              <p className="mt-2 text-sm text-text-secondary">Your profile name may appear on certificates. Make sure it’s correct.</p>
            </div>
            <div className="rounded-3xl border border-border bg-bg-secondary/50 p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Settings size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary"> Account settings </p>
                  <p className="mt-1 text-sm text-text-secondary"> Manage preferences, theme, and notifications.</p>
                </div>
              </div>

              <Link to="/settings" className="mt-5 h-12 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border text-sm font-medium text-text-primary hover:bg-bg-muted transition">
                Go to Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      <VerifyPhoneModal open={verifyOpen} phone={profile.phone} onClose={() => setVerifyOpen(false)} onVerified={markVerified}/>
    </section>
  );
}
