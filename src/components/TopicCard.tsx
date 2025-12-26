export function TopicCard({title,children,}: {title?: string; children: React.ReactNode;}) {
  return (
    <section className=" rounded-2xl border border-border bg-bg-main p-4 sm:p-5 min-w-0">
      {title && (
        <h3 className=" text-base font-semibold text-text-primary leading-snug wrap-break-word">
          {title}
        </h3>
      )}

      <div className={`${title ? "mt-3 sm:mt-4" : ""} min-w-0`}>
        {children}
      </div>
    </section>
  );
}
