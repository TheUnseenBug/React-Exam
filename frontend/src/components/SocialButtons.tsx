import AppleIcon from "../assets/svg/icons8-apple.svg";
import FacebookIcon from "../assets/svg/icons8-facebook.svg";
import GoogleIcon from "../assets/svg/icons8-google.svg";

export default function SocialIcons() {
  function handleClick() {
    alert("Nice job, buddy!");
  }

  const baseButtonStyle =
    "flex items-center justify-center w-full px-4 py-3 rounded-full hover:opacity-90";
  const iconStyle = "w-6 h-6 mr-3 bg-inherit";
  const textStyle = "font-normal text-sm bg-inherit";

  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={handleClick}
        className={`${baseButtonStyle} bg-[#4B5993] text-white`}
      >
        <img src={FacebookIcon} alt="Facebook" className={`${iconStyle}`} />
        <span className={textStyle}>CONTINUE WITH FACEBOOK</span>
      </button>

      <button
        onClick={handleClick}
        className={`${baseButtonStyle} bg-black text-white`}
      >
        <img src={AppleIcon} alt="Apple" className={iconStyle} />
        <span className={textStyle}>CONTINUE WITH APPLE</span>
      </button>

      <button
        onClick={handleClick}
        className={`${baseButtonStyle}  text-black border border-black hover:bg-gray-100`}
      >
        <img src={GoogleIcon} alt="Google" className={iconStyle} />
        <span className={textStyle}>CONTINUE WITH GOOGLE</span>
      </button>
    </div>
  );
}
