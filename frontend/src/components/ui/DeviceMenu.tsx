import { useState, useEffect } from "react";
import { Laptop2 } from "lucide-react";
import useAccessStore from "@/store/store";

interface Device {
  id: string;
  name: string;
  is_active: boolean;
  type: string;
}

interface DeviceMenuProps {
  onDeviceSelect: (deviceId: string) => void;
}

const DeviceMenu = ({ onDeviceSelect }: DeviceMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const { accessToken } = useAccessStore();
  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".device-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const fetchDevices = async () => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/devices",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setDevices(data.devices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchDevices();
    }
  };

  return (
    <div className="relative device-menu flex items-center">
      <button
        onClick={handleClick}
        className="text-black hover:text-yellow-100 transition-colors"
      >
        <Laptop2 className="text-white" size={20} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 w-64 bg-blue-600 rounded-lg shadow-lg p-2">
          <h3 className="text-yellow-100 font-semibold px-3 py-2">
            Select Playback Device
          </h3>
          <div className="max-h-48 overflow-y-auto">
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => {
                  onDeviceSelect(device.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-blue-700 rounded ${
                  device.is_active ? "text-green-400" : "text-yellow-100"
                }`}
              >
                <div className="flex items-center">
                  <span className="flex-1">{device.name}</span>
                  {device.is_active && (
                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-xs text-yellow-100/70">{device.type}</div>
              </button>
            ))}
            {devices.length === 0 && (
              <p className="text-yellow-100/70 px-3 py-2">No devices found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceMenu;
