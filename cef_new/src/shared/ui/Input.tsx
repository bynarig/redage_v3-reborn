type InputProps = {
  type?: string;
  placeholder?: string;
};


export default function Input({type="text", placeholder="Type here"}: InputProps) {
  return (
    <input type={type} placeholder={placeholder} className="input" />
  );
}