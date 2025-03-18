import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

type ButtonProps = {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  icon: React.ReactNode;
  label?: string;
};

const buttonSizes = {
  sm: "p-2 text-sm",
  md: "p-3 text-base",
  lg: "p-4 text-lg",
};

const buttonVariants = {
  primary:
    "bg-colors-customGreen hover:bg-colors-customBlue text-black border-4 border-black",
  secondary: "bg-gray-200 hover:bg-gray-300 text-black",
  ghost: "bg-transparent hover:bg-gray-100 text-black",
};

const PlayerButton: React.FC<ButtonProps> = ({
  onClick,
  size = "md",
  variant = "primary",
  icon,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-full ${buttonSizes[size]} ${buttonVariants[variant]} transition duration-200`}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
};

export function PlayButton(props: Omit<ButtonProps, "icon">) {
  return <PlayerButton {...props} icon={<Play size={20} />} />;
}

export function PauseButton(props: Omit<ButtonProps, "icon">) {
  return <PlayerButton {...props} icon={<Pause size={20} />} />;
}

export function PreviousButton(props: Omit<ButtonProps, "icon">) {
  return <PlayerButton {...props} icon={<SkipBack size={20} />} />;
}

export function NextButton(props: Omit<ButtonProps, "icon">) {
  return <PlayerButton {...props} icon={<SkipForward size={20} />} />;
}
