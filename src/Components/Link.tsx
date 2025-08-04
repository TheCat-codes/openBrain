import type React from "react"
import { useNavigate } from "react-router-dom"

export function Link ({ to, target, destiny }:{to: string, destiny: string, target: string | undefined}) {
  const navigate = useNavigate()
  const validateClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const isMainEvent = event.button === 0
    const isTarget = target === undefined || target === '_self'
    const isModifiedEvent = event.altKey || event.ctrlKey || event.shiftKey || event.metaKey

    if(isTarget && isMainEvent && !isModifiedEvent) {
      navigate(to)
    }
  }

  return (
    <a onClick={validateClick} href={to}>{destiny}</a>
  )
}