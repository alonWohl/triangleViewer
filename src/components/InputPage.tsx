import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Triangle, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ThemeSwitcher } from './ThemeSwitcher'

interface Point {
	x: number
	y: number
}

interface InputPageProps {
	onSubmit: (points: [Point, Point, Point]) => void
}

export default function InputPage({ onSubmit }: InputPageProps) {
	const navigate = useNavigate()
	const [point1, setPoint1] = useState<Point>({ x: 100, y: 100 })
	const [point2, setPoint2] = useState<Point>({ x: 400, y: 100 })
	const [point3, setPoint3] = useState<Point>({ x: 250, y: 300 })

	const [error, setError] = useState<string>('')

	const validatePoints = (points: [Point, Point, Point]): string | null => {
		for (const point of points) {
			if (point.x < 0 || point.x > 800 || point.y < 0 || point.y > 800) {
				return 'כל הנקודות חייבות להיות בטווח 0-800'
			}
		}

		const [p1, p2, p3] = points
		const area = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2)
		if (area < 1) {
			return 'הנקודות לא יכולות להיות על קו ישר'
		}

		return null
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		const points: [Point, Point, Point] = [point1, point2, point3]
		const validationError = validatePoints(points)

		if (validationError) {
			setError(validationError)
			return
		}

		onSubmit(points)
		navigate('/display')
	}

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6">
				<div className="flex justify-end">
					<ThemeSwitcher />
				</div>
				<div className="text-center">
					<div className="flex justify-center mb-4">
						<Triangle className="h-12 w-12 text-primary" />
					</div>
					<h1 className="text-3xl font-bold text-foreground mb-2">הזנת נקודות משולש</h1>
					<p className="text-muted-foreground">הזן שלוש נקודות ליצירת משולש</p>
					<p className="text-xs text-muted-foreground mt-1">ערכי X ו-Y חייבים להיות בטווח 0-800</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border" noValidate>
					<div className="space-y-4">
						<div className="space-y-2">
							<h3 className="text-lg font-medium">נקודה 1</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<Label htmlFor="p1x">X</Label>
									<Input
										id="p1x"
										type="number"
										min="0"
										max="800"
										value={point1.x}
										onChange={e => setPoint1({ ...point1, x: Number(e.target.value) })}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="p1y">Y</Label>
									<Input
										id="p1y"
										type="number"
										min="0"
										max="800"
										value={point1.y}
										onChange={e => setPoint1({ ...point1, y: Number(e.target.value) })}
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<h3 className="text-lg font-medium">נקודה 2</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<Label htmlFor="p2x">X</Label>
									<Input
										id="p2x"
										type="number"
										min="0"
										max="800"
										value={point2.x}
										onChange={e => setPoint2({ ...point2, x: Number(e.target.value) })}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="p2y">Y</Label>
									<Input
										id="p2y"
										type="number"
										min="0"
										max="800"
										value={point2.y}
										onChange={e => setPoint2({ ...point2, y: Number(e.target.value) })}
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<h3 className="text-lg font-medium">נקודה 3</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<Label htmlFor="p3x">X</Label>
									<Input
										id="p3x"
										type="number"
										min="0"
										max="800"
										value={point3.x}
										onChange={e => setPoint3({ ...point3, x: Number(e.target.value) })}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="p3y">Y</Label>
									<Input
										id="p3y"
										type="number"
										min="0"
										max="800"
										value={point3.y}
										onChange={e => setPoint3({ ...point3, y: Number(e.target.value) })}
									/>
								</div>
							</div>
						</div>
					</div>

					{error && (
						<div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-md text-sm flex items-center gap-2">
							<AlertCircle className="h-4 w-4" />
							{error}
						</div>
					)}

					<Button type="submit" className="w-full" size="lg">
						<Play className="mr-2 h-5 w-5" />
						הצג משולש
					</Button>
				</form>
			</div>
		</div>
	)
}
