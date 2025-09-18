export function InputField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  fullWidth,
  error,
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full border ${error ? "border-red-300" : "border-gray-300"
          } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm transition-colors`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
  fullWidth,
  error,
}) {
  return (
    <div className={`relative ${fullWidth ? "md:col-span-2" : ""}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border ${error ? "border-red-300" : "border-gray-300"
          } rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 cursor-pointer shadow-sm appearance-none transition-colors`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.toLowerCase()} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-9 text-gray-500 pointer-events-none">
        ▼
      </span>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}