import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InputPage from './components/InputPage'
import DisplayPage from './components/DisplayPage'
import { ThemeProvider } from './contexts/ThemeContext'
import { useState } from 'react'

interface Point {
	x: number
	y: number
}

function App() {
	const [trianglePoints, setTrianglePoints] = useState<[Point, Point, Point] | null>(null)

	const handleInputSubmit = (points: [Point, Point, Point]) => {
		setTrianglePoints(points)
	}

	return (
		<ThemeProvider defaultTheme="system" storageKey="triangle-ui-theme">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<InputPage onSubmit={handleInputSubmit} />} />
					<Route
						path="/display"
						element={
							trianglePoints ? (
								<DisplayPage points={trianglePoints} />
							) : (
								<InputPage onSubmit={handleInputSubmit} />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
