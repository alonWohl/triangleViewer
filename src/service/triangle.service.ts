export class TriangleService {
	static calculateAngle(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }) {
		const v1 = { x: p1.x - p2.x, y: p1.y - p2.y }
		const v2 = { x: p3.x - p2.x, y: p3.y - p2.y }

		const angle = Math.acos((v1.x * v2.x + v1.y * v2.y) / (Math.sqrt(v1.x ** 2 + v1.y ** 2) * Math.sqrt(v2.x ** 2 + v2.y ** 2)))

		return angle * (180 / Math.PI)
	}

	static calculateDistance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
	}

	static calculateTriangleArea(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }): number {
		return Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2)
	}

	static getTriangleType(angles: [number, number, number]): string {
		const maxAngle = Math.max(...angles)

		if (Math.abs(maxAngle - 90) < 0.1) {
			return 'ישר זווית'
		} else if (maxAngle > 90) {
			return 'קהה זווית'
		} else {
			return 'חד זווית'
		}
	}

	static isValidTriangle(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }): boolean {
		const area = this.calculateTriangleArea(p1, p2, p3)
		return area > 0.001
	}
}
