function SelectField({ name, value, onChange, options }) {
  return (
    <select name={name} value={value} onChange={onChange} className="select-field">
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

export default SelectField;
