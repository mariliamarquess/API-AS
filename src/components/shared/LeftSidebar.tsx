import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useUserContext } from '@/hooks/useUserContext';
import { sidebarLinks } from '@/constants';

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { logout, isAuthenticated, user } = useUserContext();

  return (
    <nav className="leftsidebar h-full w-[270px] hidden md:flex flex-col justify-between px-6 py-8 border-r border-dark-4 bg-gradient-to-b from-dark-1 to-dark-2 shadow-xl">
      {/* Top section */}
      <div className="flex flex-col gap-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-2">
          <img src="/assets/icons/logo.svg" alt="logo" className="w-36 h-auto" />
        </Link>

        {/* Perfil do usuário */}
        {isAuthenticated && user && (
          <div className="flex flex-col items-center gap-3 text-center border-b border-dark-4 pb-6">
            <img
              src="/assets/icons/profile-placeholder.svg"
              alt="user"
              className="h-16 w-16 rounded-full border-2 border-primary-500 shadow-lg"
            />
            <div className="flex flex-col">
              <p className="text-white font-bold text-lg">{user.name}</p>
              <p className="text-light-3 text-sm">@{user.username}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label}>
                <NavLink
                  to={link.route}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-light-2 hover:bg-dark-3 hover:text-white'}
                  `}
                >
                  <img
                    src={
                      isActive
                        ? link.imgURL.replace('.png', '-active.png')
                        : link.imgURL
                    }
                    alt={link.label}
                    className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span>{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom section: Logout */}
      {isAuthenticated && (
        <Button
          variant="ghost"
          className="flex gap-3 items-center text-light-3 hover:text-white hover:bg-dark-3 px-4 py-3 rounded-xl transition-all duration-200"
          onClick={() => logout()}
        >
          <img src="/assets/icons/logout.svg" alt="logout" className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </Button>
      )}
    </nav>
  );
};

export default LeftSidebar;
