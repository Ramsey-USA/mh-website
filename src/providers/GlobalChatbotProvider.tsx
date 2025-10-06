'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { GlobalChatbot } from '../components/chatbot/GlobalChatbot'
import { usePathname } from 'next/navigation'

interface GlobalChatbotContextType {
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  currentPageData?: any
  setCurrentPageData: (data: any) => void
  currentPage?: string
  setCurrentPage: (page: string) => void
  formData?: any
  setFormData: (data: any) => void
}

const GlobalChatbotContext = createContext<
  GlobalChatbotContextType | undefined
>(undefined)

export function GlobalChatbotProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true) // Always visible by default
  const [currentPageData, setCurrentPageData] = useState(null)
  const [currentPage, setCurrentPage] = useState('')
  const [formData, setFormData] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    setCurrentPage(pathname)
  }, [pathname])

  const value = {
    isVisible,
    setIsVisible,
    currentPageData,
    setCurrentPageData,
    currentPage,
    setCurrentPage,
    formData,
    setFormData,
  }

  return (
    <GlobalChatbotContext.Provider value={value}>
      {children}
      {/* Global Chatbot - Always rendered when visible */}
      {isVisible && <GlobalChatbot estimatorData={currentPageData} />}
    </GlobalChatbotContext.Provider>
  )
}

export function useGlobalChatbot() {
  const context = useContext(GlobalChatbotContext)
  if (context === undefined) {
    throw new Error(
      'useGlobalChatbot must be used within a GlobalChatbotProvider'
    )
  }
  return context
}
