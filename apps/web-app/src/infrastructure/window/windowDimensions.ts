import { useEffect, useState } from 'react'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [isSm, setSm] = useState(false)
  const [isMd, setMd] = useState(false)
  const [isLg, setLg] = useState(false)
  const [isXl, setXl] = useState(false)
  const [is2xl, set2Xl] = useState(false)

  useEffect(() => {
    setSm(windowDimensions.width >= 640)
    setMd(windowDimensions.width >= 768)
    setLg(windowDimensions.width >= 1024)
    setXl(windowDimensions.width >= 1280)
    set2Xl(windowDimensions.width >= 1536)
  }, [windowDimensions.width])

  return {
    ...windowDimensions,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl
  }
}