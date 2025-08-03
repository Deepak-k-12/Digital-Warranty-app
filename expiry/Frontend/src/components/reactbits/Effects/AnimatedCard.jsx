import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const AnimatedCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        'rounded-2xl border border-border shadow-lg hover:shadow-2xl cursor-pointer bg-background backdrop-blur-sm',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
