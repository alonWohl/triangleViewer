# SmileCloud Triangle Viewer Assignment

## Assignment Overview
Create a web interface to display a triangle with its angles based on three input points.

## Requirements

### 1. Input Page
- Form to input 3 points (X, Y coordinates for each)
- "Show Triangle" button to navigate to display page
- No input validation required (assume valid values)

### 2. Display Page
- 800x800px canvas area
- Draw triangle based on input points
- Show arc indicators for each angle
- Display angle values inside the triangle

## Technical Implementation

### Technology Stack
- React with TypeScript
- Tailwind CSS for styling
- SVG for triangle rendering
- Vite as build tool

### Key Components

#### Triangle Service (`src/service/triangle.service.ts`)
- Calculate angles using Law of Cosines
- Helper functions for geometric calculations

#### Input Page (`src/components/InputPage.tsx`)
- Form with coordinate inputs
- State management for points

#### Display Page (`src/components/DisplayPage.tsx`)
- SVG rendering of triangle
- Angle arc visualization
- Angle value display

### Calculation Methods

#### Angle Calculation
Using Law of Cosines: `cos(C) = (a² + b² - c²) / (2ab)`
Where a, b, c are the side lengths of the triangle.

#### Drawing Method
SVG chosen for:
- Precise geometric rendering
- Easy arc drawing for angles
- Scalable graphics
- Built-in coordinate system

## Development Commands
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
```

## Testing Approach
Manual testing with various triangle configurations:
- Equilateral triangle (60°, 60°, 60°)
- Right triangle (90°, 45°, 45°)
- Obtuse triangle
- Acute triangle

## Challenges & Solutions
- **Challenge**: Positioning angle values inside triangle
  - **Solution**: Calculate centroid and offset positions

- **Challenge**: Drawing angle arcs correctly
  - **Solution**: Use SVG path with arc commands

## External Resources Used
- React documentation for component structure
- SVG path documentation for arc drawing
- Mathematical formulas for angle calculations