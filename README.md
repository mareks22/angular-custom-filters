# Angular Custom Filter Tool

A professional, feature-rich custom filter builder developed with Angular 20. This project demonstrates advanced reactive form handling, component composition, and modern Angular best practices (Zoneless, Signals, and Typed Forms).

## 🚀 Key Features

- **Dynamic Event Steps**: Add, remove, and duplicate filter steps iteratively.
- **Typed Reactive Forms**: Fully type-safe `FormGroup` and `FormArray` implementation for robust data handling.
- **Modern UI Components**: Reusable UI atoms like `EditableLabel` and `IconTabs` built from scratch.
- **PrimeNG Integration**: Leveraging PrimeNG 20 for high-quality UI components with a customized theme.
- **Zoneless Architecture**: Developed using Angular's modern zoneless change detection for optimal performance.
- **Comprehensive Testing**: Full unit test coverage for components and services using `ChromeHeadless`.

## 🛠️ Technical Stack

- **Framework**: Angular 20 (Zoneless)
- **UI Library**: PrimeNG 20
- **Icons**: PrimeIcons
- **Styling**: SCSS
- **Formatting**: Prettier
- **Testing**: Jasmine & Karma

## 🏃 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- Angular CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mareks22/angular-custom-filters.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm start
```
Navigate to `http://localhost:4200/`.

### Testing

Run the full test suite:
```bash
npm test
```

Run tests in headless mode (CI/CD friendly):
```bash
npm run test:headless
```

### Formatting

To ensure consistent code style:
```bash
npm run format
```

## 📊 Data Model

The application produces a structured JSON output designed for backend consumption. Example output:
```json
{
  "steps": [
    {
      "event_type": "purchase",
      "display_name": "Product Purchase",
      "filters": [
        {
          "attribute": "price",
          "operator": "greater than",
          "value": 100,
          "type": "number"
        }
      ]
    }
  ]
}
```

---
Developed by **Marek S.** for the Senior Angular Developer Interview Assignment.
