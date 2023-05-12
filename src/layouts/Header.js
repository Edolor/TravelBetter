import React from 'react'
import Button from "react-bootstrap/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import world from "../Assets/img/world.svg"

function Header() {
  const navigate = useNavigate();
  const { logout, currentUser, setCurrentUser, setToken } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.setItem("token", "");
      setCurrentUser(null);
      setToken(null);
      navigate("/login");
    } catch {
      localStorage.setItem("token", "");
      setCurrentUser(null);
      setToken(null);
      navigate("/login");
    }
  };

  return (
    <header className="py-3">
      <div className="mx-auto width-wrapper d-flex mx-auto flex-row justify-content-between align-items-center">
        <figure className="margin-0">
            <Link to={!currentUser ? "/" : "/dashboard"} className="d-flex align-items-center justify-content-center color-grey--dark-2 text-decoration-none font-heading font-heading--s">
              <div className="d-flex align-items-center gap-3">
                  <img src={world} alt="world icon" style={{marginBottom: "-4px"}} />
                  <span>Travelbetter</span>
              </div>
            </Link>
        </figure>

        <ul className="list-s-none d-flex gap-4 margin-0 align-items-center font-weight-500">
          <li>
            {!currentUser ? 
            (<Link to="/login" className="text-decoration-none text-secondary fw-bold body-copy hover-underline focus-underline">Sign in</Link>)
            : 
            (<Link to="/settings" className="text-decoration-none text-secondary fw-bold body-copy hover-underline focus-underline">Settings</Link>)
            }
          </li>

          <li>
            {!currentUser ? 
            (<Link to="/signup" size="lg" variant="button" className="btn btn-primary px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold body-copy text-white">Get started</Link>)
            : 
            (<Button className="btn btn-primary px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold body-copy text-white" variant="primary" type="button" onClick={handleLogout}>Logout</Button>)
            }
          </li>
        </ul>
      </div>

    </header>
  )
}

export default Header;