'use client'

import type { CardStyles } from './stores/config-store'

type CardKey = keyof CardStyles

interface HomeDraggableLayerProps {
	cardKey: CardKey
	x: number
	y: number
	width?: number
	height?: number
	children: React.ReactNode
}

export function HomeDraggableLayer({ children }: HomeDraggableLayerProps) {
	return <>{children}</>
}
