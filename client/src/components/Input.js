export const Input = (props) => {
  const {
    type = 'text',
    change,
    isDisabled = false,
    placeholder = '',
    name = '',
  } = props;

  return (
    <div className="input-field col s12">
      <input
        type={type}
        name={name}
        onChange={change}
        disabled={isDisabled}
      />
      <label htmlFor={name}>{placeholder || name}</label>
    </div>
  );
};
