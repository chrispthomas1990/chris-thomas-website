import { useNavigate } from "react-router-dom";

type NavigationButtonProps = {
  children: string;
  to: string;
};

export default function NavigationButton({ children, to }: NavigationButtonProps) {
  const navigate = useNavigate();

  return (
    <button className="button" type="button" onClick={() => navigate(to)}>
      {children}
    </button>
  );
}
