import { Link } from 'react-router-dom';
import logo from '../vector/image.png'

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="bg-black p-10 flex justify-between items-center">

      <div className="flex items-center space-x-4 text-white font-bold text-2xl">
      <img src={logo} alt="SkillShare Logo" className="w-10 h-10 object-cover rounded-full" />

        <span>SkillShare</span>
      </div>
      <ul className="flex space-x-6">
        <li>
          <a href="/" className="text-white hover:text-yellow-400 transition-colors duration-300">
            Home
          </a>
        </li>
        <li>
          <a href="/matches" className="text-white hover:text-yellow-400 transition-colors duration-300">
            Matches
          </a>
        </li>
        <li>
          <a href="/profile" className="text-white hover:text-yellow-400 transition-colors duration-300">
            Profile
          </a>
        </li>
        {/* Removed Sign In and Sign Up buttons */}
      </ul>
    </nav>
  );
};

export default Navbar;
