export const Button = ({ children, onClick, type = 'button', isLoading, variant = 'primary', className = '' }) => {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 shadow-lg shadow-slate-900/20',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus:ring-slate-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
};