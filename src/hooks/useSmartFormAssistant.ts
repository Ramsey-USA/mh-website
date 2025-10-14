import { useState, useEffect, useCallback } from 'react'
import { militaryConstructionAI } from '@/lib/militaryConstructionAI'

interface FormField {
  name: string
  value: string
  isValid: boolean
  feedback: string
}

interface SmartFormSuggestion {
  suggestions: string[]
  autoComplete: string
  validation: {
    isValid: boolean
    feedback: string
  }
  militaryContext: {
    isVeteran: boolean
    suggestions: string[]
    discounts: string[]
  }
}

interface PredictiveCompletion {
  suggestions: { field: string; value: string; confidence: number }[]
  autoFillRecommendations: string[]
  nextStepGuidance: string
}

export function useSmartFormAssistant(formData: any) {
  const [currentField, setCurrentField] = useState<string>('')
  const [fieldSuggestions, setFieldSuggestions] =
    useState<SmartFormSuggestion | null>(null)
  const [predictiveCompletion, setPredictiveCompletion] =
    useState<PredictiveCompletion | null>(null)
  const [isVeteranDetected, setIsVeteranDetected] = useState(false)
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(true)

  // Generate smart suggestions for current field
  const generateFieldSuggestions = useCallback(
    (field: string, value: string) => {
      if (!value || value.length < 2) {
        setFieldSuggestions(null)
        return
      }

      const suggestions = militaryConstructionAI.generateSmartFormSuggestions(
        formData,
        field,
        value
      )

      setFieldSuggestions(suggestions)
      setIsVeteranDetected(suggestions.militaryContext.isVeteran)
    },
    [formData]
  )

  // Generate predictive completion for entire form
  const generatePredictiveCompletion = useCallback(() => {
    const completion =
      militaryConstructionAI.generatePredictiveCompletion(formData)
    setPredictiveCompletion(completion)
  }, [formData])

  // Auto-generate predictions when form data changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      generatePredictiveCompletion()
    }
  }, [formData, generatePredictiveCompletion])

  // Handle field focus
  const handleFieldFocus = useCallback((fieldName: string) => {
    setCurrentField(fieldName)
  }, [])

  // Handle field change with smart suggestions
  const handleFieldChange = useCallback(
    (fieldName: string, value: string) => {
      generateFieldSuggestions(fieldName, value)
    },
    [generateFieldSuggestions]
  )

  // Apply suggestion to field
  const applySuggestion = useCallback((suggestion: string) => {
    return suggestion
  }, [])

  // Apply auto-complete
  const applyAutoComplete = useCallback(() => {
    if (fieldSuggestions?.autoComplete) {
      return fieldSuggestions.autoComplete
    }
    return ''
  }, [fieldSuggestions])

  // Get field validation
  const getFieldValidation = useCallback(
    (fieldName: string, value: string) => {
      if (fieldSuggestions && currentField === fieldName) {
        return fieldSuggestions.validation
      }

      // Generate quick validation
      const quickSuggestion =
        militaryConstructionAI.generateSmartFormSuggestions(
          formData,
          fieldName,
          value
        )
      return quickSuggestion.validation
    },
    [fieldSuggestions, currentField, formData]
  )

  // Get veteran discounts display
  const getVeteranDiscounts = useCallback(() => {
    return fieldSuggestions?.militaryContext.discounts || []
  }, [fieldSuggestions])

  // Get completion progress
  const getCompletionProgress = useCallback(() => {
    const completedFields = Object.values(formData).filter(
      value => value && typeof value === 'string' && value.trim().length > 0
    ).length

    const totalFields = Object.keys(formData).length
    return Math.round((completedFields / totalFields) * 100)
  }, [formData])

  return {
    // State
    currentField,
    fieldSuggestions,
    predictiveCompletion,
    isVeteranDetected,
    showSmartSuggestions,

    // Actions
    handleFieldFocus,
    handleFieldChange,
    applySuggestion,
    applyAutoComplete,
    generateFieldSuggestions,
    generatePredictiveCompletion,
    setShowSmartSuggestions,

    // Utilities
    getFieldValidation,
    getVeteranDiscounts,
    getCompletionProgress,
  }
}

export default useSmartFormAssistant
