function Button({ type = "button", onClick, children, disabled = false, className = "", color = 'primary', full = false, style = {}, ...rest }) {
  const colorClass = color === 'orange' ? 'btn-orange' : color === 'gray' ? 'btn-gray' : 'btn-primary';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${colorClass} ${full ? 'btn-full' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
