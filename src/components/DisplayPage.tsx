import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, Calculator, Info } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeSwitcher } from './ThemeSwitcher'
import { TriangleService } from '../service/triangle.service'

interface Point {
	x: number
	y: number
}

interface DisplayPageProps {
	points: [Point, Point, Point]
}

export default function DisplayPage({ points }: DisplayPageProps) {
	const navigate = useNavigate()
	const [p1, p2, p3] = points

	const angle1 = TriangleService.calculateAngle(p2, p1, p3)
	const angle2 = TriangleService.calculateAngle(p1, p2, p3)
	const angle3 = TriangleService.calculateAngle(p1, p3, p2)

	const centroidX = (p1.x + p2.x + p3.x) / 3
	const centroidY = (p1.y + p2.y + p3.y) / 3

	const getAngleTextPosition = (vertex: Point, offset: number = 30) => {
		const dx = centroidX - vertex.x
		const dy = centroidY - vertex.y
		const length = Math.sqrt(dx * dx + dy * dy)
		return {
			x: vertex.x + (dx / length) * offset,
			y: vertex.y + (dy / length) * offset
		}
	}

	const angle1Pos = getAngleTextPosition(p1)
	const angle2Pos = getAngleTextPosition(p2)
	const angle3Pos = getAngleTextPosition(p3)

	const createAngleArc = (center: Point, p1: Point, p2: Point, radius: number = 20) => {
		const angle1 = Math.atan2(p1.y - center.y, p1.x - center.x)
		const angle2 = Math.atan2(p2.y - center.y, p2.x - center.x)

		let startAngle = angle1
		let endAngle = angle2

		if (Math.abs(endAngle - startAngle) > Math.PI) {
			if (startAngle > endAngle) {
				endAngle += 2 * Math.PI
			} else {
				startAngle += 2 * Math.PI
			}
		}

		const x1 = center.x + radius * Math.cos(startAngle)
		const y1 = center.y + radius * Math.sin(startAngle)
		const x2 = center.x + radius * Math.cos(endAngle)
		const y2 = center.y + radius * Math.sin(endAngle)

		const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0

		return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
	}

	return (
		<div className="min-h-screen bg-background p-4">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Eye className="h-8 w-8 text-primary" />
						<h1 className="text-3xl font-bold">תצוגת משולש</h1>
					</div>
					<div className="flex items-center gap-2">
						<ThemeSwitcher />
						<Button onClick={() => navigate('/')} variant="outline">
							<ArrowLeft className="ml-2 h-4 w-4" />
							חזור לקלט
						</Button>
					</div>
				</div>

				<div className="bg-card border rounded-lg p-6">
					<div className="flex justify-center">
						<svg width="800" height="800" viewBox="0 0 800 800" className="border border-border bg-white rounded">
							{/* Grid background */}
							<defs>
								<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
									<path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
								</pattern>
							</defs>
							<rect width="800" height="800" fill="url(#grid)" />

							{/* Triangle */}
							<path
								d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`}
								fill="rgba(59, 130, 246, 0.1)"
								stroke="rgb(59, 130, 246)"
								strokeWidth="3"
							/>

							{/* Angle arcs */}
							<path d={createAngleArc(p1, p2, p3)} fill="none" stroke="rgb(239, 68, 68)" strokeWidth="2" />
							<path d={createAngleArc(p2, p1, p3)} fill="none" stroke="rgb(239, 68, 68)" strokeWidth="2" />
							<path d={createAngleArc(p3, p1, p2)} fill="none" stroke="rgb(239, 68, 68)" strokeWidth="2" />

							{/* Points */}
							<circle cx={p1.x} cy={p1.y} r="6" fill="rgb(59, 130, 246)" />
							<circle cx={p2.x} cy={p2.y} r="6" fill="rgb(59, 130, 246)" />
							<circle cx={p3.x} cy={p3.y} r="6" fill="rgb(59, 130, 246)" />

							{/* Point labels */}
							<text x={p1.x - 15} y={p1.y - 10} fill="rgb(59, 130, 246)" fontSize="14" fontWeight="bold">
								A
							</text>
							<text x={p2.x + 10} y={p2.y - 10} fill="rgb(59, 130, 246)" fontSize="14" fontWeight="bold">
								B
							</text>
							<text x={p3.x} y={p3.y + 20} fill="rgb(59, 130, 246)" fontSize="14" fontWeight="bold">
								C
							</text>

							{/* Angle values */}
							<text
								x={angle1Pos.x}
								y={angle1Pos.y}
								fill="rgb(239, 68, 68)"
								fontSize="16"
								fontWeight="bold"
								textAnchor="middle"
								dominantBaseline="middle"
							>
								{angle1.toFixed(1)}°
							</text>
							<text
								x={angle2Pos.x}
								y={angle2Pos.y}
								fill="rgb(239, 68, 68)"
								fontSize="16"
								fontWeight="bold"
								textAnchor="middle"
								dominantBaseline="middle"
							>
								{angle2.toFixed(1)}°
							</text>
							<text
								x={angle3Pos.x}
								y={angle3Pos.y}
								fill="rgb(239, 68, 68)"
								fontSize="16"
								fontWeight="bold"
								textAnchor="middle"
								dominantBaseline="middle"
							>
								{angle3.toFixed(1)}°
							</text>
						</svg>
					</div>

					<div className="mt-6 grid grid-cols-3 gap-4 text-center">
						<div className="bg-muted p-4 rounded">
							<div className="flex justify-center mb-2">
								<Calculator className="h-5 w-5 text-red-500" />
							</div>
							<h3 className="font-semibold text-sm text-muted-foreground mb-1">זווית A</h3>
							<p className="text-2xl font-bold text-red-500">{angle1.toFixed(1)}°</p>
						</div>
						<div className="bg-muted p-4 rounded">
							<div className="flex justify-center mb-2">
								<Calculator className="h-5 w-5 text-red-500" />
							</div>
							<h3 className="font-semibold text-sm text-muted-foreground mb-1">זווית B</h3>
							<p className="text-2xl font-bold text-red-500">{angle2.toFixed(1)}°</p>
						</div>
						<div className="bg-muted p-4 rounded">
							<div className="flex justify-center mb-2">
								<Calculator className="h-5 w-5 text-red-500" />
							</div>
							<h3 className="font-semibold text-sm text-muted-foreground mb-1">זווית C</h3>
							<p className="text-2xl font-bold text-red-500">{angle3.toFixed(1)}°</p>
						</div>
					</div>

					<div className="mt-4 text-center text-sm text-muted-foreground">
						<div className="flex items-center justify-center gap-2 mb-2">
							<Info className="h-4 w-4" />
							<p>סכום הזוויות: {(angle1 + angle2 + angle3).toFixed(1)}°</p>
						</div>
						<p>
							קואורדינטות: A({p1.x}, {p1.y}), B({p2.x}, {p2.y}), C({p3.x}, {p3.y})
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
