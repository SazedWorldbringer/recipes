import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useUser } from '@/context/UserContext'

export function Navbar() {
  const { user, logoutUser } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser();
    navigate('/login')
  }

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg text-foreground">
          <span className="sr-only">ReciShare Home</span>
          ReciShare
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>

          {user ? (
            <>
              <Button asChild variant='ghost' className="text-sm">
                <Link to="/create">Create Recipe</Link>
              </Button>

              <Button
                variant='outline'
                className='text-sm'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-sm">
                <Link to="/login">Login</Link>
              </Button>

              <Button asChild className="text-sm">
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
