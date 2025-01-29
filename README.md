# ✨ Personal Diary App

A beautiful and modern personal diary application built with React, TypeScript, and Tailwind CSS. Keep track of your daily thoughts and memories with this easy-to-use digital diary.

## 🌟 Features

- **User Authentication**
  
  ![Imagem do WhatsApp de 2025-01-29 à(s) 10 43 27_87ebd735](https://github.com/user-attachments/assets/5ade6400-ceb8-4c2d-bc77-8bdbf07103b8)

  - Secure login and registration system
  - User-specific notes and data persistence
  - Protected routes for authenticated users

- **Calendar Interface**
  
  ![Imagem do WhatsApp de 2025-01-29 à(s) 10 43 06_6de0a3c5](https://github.com/user-attachments/assets/23cdfd4d-2f5a-498e-9f20-d5231fbe7e94)

  - Interactive calendar with month navigation
  - Visual indicators for days with notes
  - Proper handling of different month lengths
  - Highlights for current date and Sundays

- **Note Management**
  
  ![Imagem do WhatsApp de 2025-01-29 à(s) 10 43 12_db5cb61b](https://github.com/user-attachments/assets/91e2fc25-49c6-462a-a177-79156e5d07f0)
  ![Imagem do WhatsApp de 2025-01-29 à(s) 10 43 20_d450060a](https://github.com/user-attachments/assets/e44153bd-d8da-4d85-9e0e-a187d5700f90)


  - Create and edit notes for any date
  - Delete notes with a single click
  - Rich text formatting
  - Confirmation dialogs for important actions
  - Automatic saving to local storage

- **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design for all screen sizes
  - Beautiful transitions and animations
  - Dark mode support
  - Loading states and feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/flaviowmartil/personal-diary-app.git
cd personal-diary-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [date-fns](https://date-fns.org/) - Date Utility Library
- [React Router](https://reactrouter.com/) - Routing

## 📱 Usage

1. **Register/Login**
   - Create a new account or login with existing credentials
   - Your notes are private and only accessible to you

2. **Adding Notes**
   - Click on any date in the calendar
   - Write your thoughts in the modal
   - Click "Save" to store your note
   - Confirm the action in the confirmation dialog

3. **Managing Notes**
   - View all your notes in chronological order below the calendar
   - Hover over a note to reveal the delete button
   - Click the "×" button to delete a note
   - Navigate between months using the arrow buttons

4. **Navigation**
   - Use the calendar to browse different dates
   - Click "Today" to quickly return to the current date
   - Your notes are automatically saved and synced

## 🔒 Security

- All user data is stored securely in the browser's local storage
- Passwords are never stored in plain text
- Protected routes ensure only authenticated users can access their notes

## 🎨 Customization

The app uses Tailwind CSS for styling, making it easy to customize:

1. Colors can be modified in the `tailwind.config.js`
2. Components are styled using utility classes
3. Transitions and animations can be adjusted in the component files

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons and emojis from [Twemoji](https://twemoji.twitter.com/)
- Date handling powered by [date-fns](https://date-fns.org/)
- UI inspiration from modern web applications

---

Made with ❤️ by FlavioMartil
