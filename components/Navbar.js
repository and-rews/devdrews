// VerticalNavbar.js

const VerticalNavbar = () => {
  return (
    <nav className="nav">
      <ul className="text-white flex space-y-4">
        <li>
          <a href="#" className="mr">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="mr">
            About Me
          </a>
        </li>
        <li>
          <a href="#" className="mr">
            My Projects
          </a>
        </li>
        <li>
          <a href="#" className="">
            Contact Me
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalNavbar;
