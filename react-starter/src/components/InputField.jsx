const InputField = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm text-gray-700">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
