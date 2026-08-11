export const Input = ({ label, type = 'text', value, onChange, placeholder, required, className = '' }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
    />
  </div>
);