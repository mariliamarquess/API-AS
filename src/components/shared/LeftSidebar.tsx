import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useUserContext } from '@/hooks/useUserContext';
import { sidebarLinks } from '@/constants';

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { logout, isAuthenticated } = useUserContext();

  console.log(isAuthenticated)

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        {/* Logo */}
        <Link to="/" className="flex gap-3 items-center justify-center">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            width={100}
            height={36}
          />
        </Link>

        {/* Seção de perfil (só mostra se autenticado)
        {isAuthenticated && (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">
                {user.name || user.email.split('@')[0]}
              </p>
              {user.username && (
                <p className="small-regular text-light-3">@{user.username}</p>
              )}
            </div>
          </Link>
        )} */}

        {/* Links de navegação */}
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={
                      isActive
                        ? link.imgURL.replace('.png', '-active.png')
                        : link.imgURL
                    }
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Botão de Logout (só mostra se autenticado) */}
      {isAuthenticated && (
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => logout()}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      )}
    </nav>
  );
};

export default LeftSidebar;