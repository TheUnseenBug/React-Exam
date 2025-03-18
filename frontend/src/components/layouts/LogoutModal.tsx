import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// Modal-komponent för utloggningsbekräftelse
const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  // Visa inte modalen om den inte är öppen
  if (!isOpen) return null;

  return (
    <div className="fixed top-3 right-12 flex items-center justify-center z-50">
      <div className="">
        <div className="flex flex-col-reverse md:flex-row justify-center gap-2">
          <button
            onClick={onConfirm}
            className="border-4 border-black bg-red-500 hover:opacity-80 text-black py-1.5 px-3 rounded-md transition-opacity duration-200 ease-in-out"
          >
            Logout
          </button>
          <button
            onClick={onCancel}
            className="border-4 border-black bg-white hover:opacity-80 text-black py-1.5 px-3 rounded-md transition-opacity duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
