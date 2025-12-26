type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export default function Switch({ checked, onChange, disabled }: Props) {
  return (
    <button type="button" aria-checked={checked} disabled={disabled} onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border transition ${checked ? "bg-primary/70" : "bg-bg-main"}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
      <span className={` absolute left-1 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}
