import { createContext, useState, useContext, ReactNode } from "react";

interface User {
  username: string
  name?: string
  token: string
}

interface UserContextType {
  user: User | null
  loginUser: (userData: Omit<User, 'token'>, token: string) => void
  logoutUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const loginUser = (userData: Omit<User, 'token'>, token: string) => {
    const data = { ...userData, token }
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}
