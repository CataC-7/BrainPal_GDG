# 🧠 BrainPal

BrainPal is a personal support application designed to help users, particularly those who are neurodivergent, to structure their day, manage routines, and access pre-defined protocols during moments of overwhelm. It provides a simple and calming interface to create consistency and reduce cognitive load.
**See Demo BrainPal.mp4 for a Video of How it works

## ✨ Features

- **Personalized Welcome**: Greets you by name for a friendly and personal experience.
- **Daily Routine Checklists**: Separate, editable checklists for your Morning and Night routines.
- **Today's Flow**: A central checklist for your main tasks of the day, including your "non-negotiables."
- **Fully Editable Routines**:
  - Click "Modify Morning/Night Routine" to enter edit mode.
  - **Add** new tasks to your lists.
  - **Delete** tasks with a single click on the "X" icon.
  - **Re-order** tasks easily using drag-and-drop.
- **Key:Value Activity Pairs**: Quickly select specific activities (like the type of meditation or movement) and see your routine lists update automatically.
- **Emergency Protocols**: Quick access to pre-defined protocols for moments of distress, such as an "Emergency Protocol" for shutdowns or meltdowns.
- **Completion Celebration**: A fun confetti animation celebrates with you when you've completed all your tasks for the day!
- **Clean & Calming UI**: A user interface designed with a calming color palette to be non-distracting and easy to navigate.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Drag & Drop**: [dnd-kit](https://dndkit.com/)

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Install dependencies**:
    Open your terminal in the project root and run the following command to install all the necessary packages.
    ```bash
    npm install
    ```

2.  **Run the development server**:
    Once the installation is complete, run this command:
    ```bash
    npm run dev
    ```

3.  **Open the application**:
    Open your web browser and navigate to [http://localhost:9002](http://localhost:9002) to see your BrainPal app in action.

## 📝 Important Considerations

- **Local Storage**: The application uses the browser's `localStorage` to remember the user's name across sessions. Clearing your browser data will also clear the name.
- **No Database**: Currently, all routine data is hard-coded within the application's source code (`src/lib/data.ts`) and state changes are not persisted. If you refresh the page, the routines will reset to their default state.
