export const Button = ({ children, onClick, type = 'button', isLoading, variant = 'primary' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={isLoading}
    className={`btn btn-${variant}`}
  >
    {isLoading ? 'Loading...' : children}
  </button>
);