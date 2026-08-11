export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50 ${className}`}>
    {children}
  </div>
);