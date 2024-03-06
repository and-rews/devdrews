// VerticalNavbar.js

const VerticalNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 h-full bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        <li>
          <a href="#" className="hover:text-yellow-300">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300">
            Services
          </a>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </nav>
  );
};

export default VerticalNavbar;
