# AI Chat Interface

A modern, responsive chat interface for AI LLM interaction built with React, TypeScript, and Chakra UI.

## Features

### 🎨 Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between color schemes with automatic system preference detection
- **Smooth Animations**: Fluid transitions and hover effects for better user experience
- **Accessibility**: Full keyboard navigation and screen reader support

### 💬 Chat Features

- **Real-time Messaging**: Send and receive messages with instant feedback
- **Message Streaming**: Watch AI responses appear word by word in real-time
- **Message History**: View complete conversation history with timestamps
- **Copy Messages**: One-click copy functionality for any message
- **Error Handling**: Graceful error handling with user-friendly error messages

### 🔧 Advanced Features

- **Multi-line Input**: Support for longer messages with Shift+Enter for new lines
- **Auto-resize Textarea**: Input field automatically adjusts to content length
- **Chat Export**: Export entire conversation as JSON file
- **Clear Chat**: Reset conversation with confirmation
- **Streaming Toggle**: Enable/disable streaming responses
- **Loading States**: Visual feedback during AI processing

### 🎯 User Experience

- **Auto-scroll**: Automatically scrolls to latest messages
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Toast Notifications**: Success/error feedback for user actions
- **Hover Effects**: Interactive elements with smooth hover states

## Technology Stack

- **React 19**: Latest React with hooks and modern patterns
- **TypeScript**: Type-safe development with full type coverage
- **Chakra UI v3**: Modern component library with excellent theming
- **Vite**: Fast build tool and development server
- **React Icons**: Comprehensive icon library (Lucide icons)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.tsx          # Basic chat interface
│   ├── EnhancedChatInterface.tsx  # Advanced chat interface with streaming
│   └── ui/
│       ├── color-mode.tsx         # Color mode utilities
│       └── provider.tsx           # Chakra UI provider
├── services/
│   └── aiService.ts              # AI API service with streaming support
├── App.tsx                       # Main application component
└── main.tsx                      # Application entry point
```

## AI Service Integration

The chat interface includes a comprehensive AI service that supports:

- **Real API Integration**: Connect to OpenAI, Anthropic, or custom AI endpoints
- **Streaming Responses**: Real-time streaming for better user experience
- **Error Handling**: Robust error handling with retry mechanisms
- **Message History**: Context-aware conversations with full history
- **Demo Mode**: Built-in simulation for testing without API keys

### Configuration

To connect to a real AI service, update the `aiService.ts` file:

```typescript
// Example OpenAI configuration
const aiService = new AIService(
  "https://api.openai.com/v1/chat/completions",
  "your-api-key-here"
);
```

## Customization

### Theming

The interface uses Chakra UI's theming system. Customize colors, fonts, and spacing in the theme configuration.

### Styling

All components use Chakra UI's style props for easy customization. Modify the component props to adjust appearance.

### Adding Features

The modular architecture makes it easy to add new features:

- Add new message types
- Implement file uploads
- Add voice input/output
- Integrate with external services

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on the repository or contact the development team.
