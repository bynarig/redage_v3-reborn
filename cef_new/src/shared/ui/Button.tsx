type ButtonProps = {
  name: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
};
export default function Button({name, onClick, type = 'button'}: ButtonProps) {
  return (
    <button type={type} className="btn btn-primary" onClick={onClick}>
      {name}
    </button>
  );
}
