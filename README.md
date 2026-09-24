# 🎓 Nursing Exam Practice Platform

A comprehensive web application for practicing nursing exams scraped from NursingPlex, featuring interactive question types, exam database management, and quiz functionality.

![Nursing Exam Platform](https://img.shields.io/badge/Exams-7-blue)
![Questions](https://img.shields.io/badge/Questions-503-green)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8)

## ✨ Features

### 📚 Exam Database
- **7 Complete Exams** with 503 total questions
- **Hierarchical Organization** by category (RN, LPN, RN Exit, LPN Exit)
- **Subcategory Filtering** (ATI, HESI, Regular, Certification)
- **Search & Filter** functionality
- **Statistics Dashboard** with exam analytics

### 🎯 Interactive Question Types
- **Multiple Choice** - Standard A/B/C/D questions
- **Select All That Apply (SATA)** - Multiple correct answers
- **Numeric Input** - Calculation questions
- **Matrix/Matching** - Interactive table selections
- **Dropdown** - Fill-in-the-blank with options
- **Diagram Click** - Anatomical location selection
- **Ordering** - Drag and drop sequencing

### 📊 Exams Included

| Exam | Questions | Category |
|------|-----------|----------|
| RN HESI Exit Exam - MCPHS | 127 | RN Exit / HESI |
| ATI RN Fundamentals 2026 | 69 | RN / ATI |
| ATI RN Adult Medical Surgical 2026 | 97 | RN / ATI |
| ATI RN Pharmacology 2026 | 70 | RN / ATI |
| SP26 504W Advanced Med-Surg | 40 | RN / Regular |
| Advanced Med-Surg/Health And Wellness | 50 | RN / Regular |
| Advanced Med Surg Proctored Exam (MCHPS) | 50 | RN / Regular |

### 🎨 User Interface
- **Dark Mode** - Easy on the eyes for long study sessions
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Quiz Mode** - Practice with timer and progress tracking
- **Question Navigator** - Jump to any question instantly
- **Flag Questions** - Mark questions for review
- **Export Functionality** - Download questions as text files

### 🖼️ Image Support
- **Image Display** - Shows available question images
- **Missing Image Notes** - Clear explanations for unavailable images
- **Interactive Diagrams** - Work without requiring images
- **Responsive Images** - Optimized for all screen sizes

## 🔓 Browser Extension

**New!** Automatically unlock NursingPlex questions with our browser extension!

### Features
- ✅ Automatic unlocking on NursingPlex pages
- ✅ Beautiful popup UI with stats
- ✅ Toggle control (enable/disable)
- ✅ Works on all exam review pages
- ✅ No manual script pasting needed

### Quick Install
1. Open `extension/generate-icons.html` in browser
2. Click "Download All" to get icons
3. Go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the `extension/` folder
7. Done! Visit any NursingPlex review page

See [extension/README.md](./extension/README.md) for detailed instructions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/nursing-exam-platform.git
cd nursing-exam-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
nursing-exam-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ExamSelector.tsx
│   ├── data/                # Exam data files
│   │   ├── questions.ts
│   │   ├── ati-fundamentals-2026.ts
│   │   ├── ati-med-surg-2026.ts
│   │   ├── ati-pharmacology-2026.ts
│   │   ├── sp26-advanced-med-surg.ts
│   │   ├── advanced-med-surg-health-wellness.ts
│   │   ├── advanced-med-surg-mchps.ts
│   │   ├── allScrapedQuestions.ts
│   │   ├── examDatabase.ts
│   │   └── allExams.ts
│   ├── App.tsx              # Main application component
│   ├── QuizView.tsx         # Quiz mode component
│   ├── ScrapedQuestions.tsx # Question viewer component
│   ├── ExamDatabaseView.tsx # Database management component
│   ├── InteractiveComponents.tsx # Interactive question components
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎮 Usage Guide

### Viewing Questions

1. Click **"View All Questions"** on the home page
2. Select an exam from the exam cards at the top
3. Browse through questions with search and filter
4. Click **"Show All"** to view all questions in the exam

### Taking Quizzes

1. Click **"Start Quiz Mode"** on the home page
2. Select an exam from the exam selector
3. Answer questions one at a time
4. Use the question navigator to jump between questions
5. Flag questions for review
6. Click **"Review"** to see your answers

### Managing Database

1. Click **"Exam Database"** on the home page
2. Browse exams in folder structure
3. View statistics and metadata
4. Add, edit, or delete exams (admin functionality)

### Interactive Questions

- **Matrix Questions**: Click cells to select Indicated/Not Indicated
- **Dropdown Questions**: Select from dropdown menus
- **Numeric Questions**: Type your answer in the input field
- **Diagram Questions**: Click anatomical locations
- **SATA Questions**: Check multiple boxes

## 📊 Statistics

- **Total Exams**: 7
- **Total Questions**: 503
- **Question Types**: 7 (MCQ, SATA, Numeric, Matrix, Dropdown, Diagram, Ordering)
- **Interactive Components**: 5 (Matrix, Dropdown, Diagram, Numeric, Ordering)
- **Images Available**: 1
- **Images Missing**: 6 (with explanatory notes)

## 🛠️ Technology Stack

- **React 18.3.1** - UI framework
- **TypeScript 5.7.2** - Type safety
- **Vite 6.0.5** - Build tool
- **Tailwind CSS 3.4.17** - Styling
- **Lucide React** - Icons

## 📝 Documentation

Comprehensive documentation is available in the repository:

- **DATABASE.md** - Database schema and management
- **DATABASE_SUMMARY.md** - Quick database overview
- **COMPLETE_DATABASE.md** - Complete database documentation
- **MASSIVE_DATABASE_COMPLETE.md** - Full database stats
- **ATI_SCRAPING_COMPLETE.md** - ATI exam scraping details
- **SP26_EXAM_SCRAPED.md** - SP26 exam details
- **ADVANCED_MED_SURG_HEALTH_WELLNESS_SCRAPED.md** - Health & Wellness exam
- **ADVANCED_MED_SURG_MCHPS_SCRAPED.md** - MCHPS exam details
- **IMAGE_HANDLING_GUIDE.md** - Complete image handling guide
- **SP26_IMAGE_STATUS.md** - SP26 image status
- **IMAGE_SUMMARY.md** - Image summary
- **ALL_INTERACTIVE_FIXED.md** - Interactive components guide
- **MATRIX_QUESTIONS_FIXED.md** - Matrix question fixes
- **BLANK_PAGE_FIXED.md** - Bug fixes documentation
- **EXAM_SELECTION_FIXED.md** - Exam selection fixes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes only. The exam questions are sourced from NursingPlex and are used for study and practice purposes.

## ⚠️ Disclaimer

This application is not affiliated with or endorsed by NursingPlex, ATI, or HESI. All exam content is used for educational purposes only. Please respect copyright and terms of service of the original content providers.

## 🐛 Known Issues

- Some questions reference images that are not available (clearly noted in the UI)
- Interactive diagrams work without requiring actual images
- All questions remain fully functional for practice

## 🔮 Future Enhancements

- [ ] Add more exams from NursingPlex
- [ ] Implement spaced repetition algorithm
- [ ] Add user progress tracking
- [ ] Create study plans based on weak areas
- [ ] Add offline mode with service workers
- [ ] Implement user accounts and cloud sync
- [ ] Add more interactive question types
- [ ] Create mobile app version

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Review the documentation files
- Check the browser console for errors

## 🙏 Acknowledgments

- **NursingPlex** - Source of exam questions
- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the fast build tool
- **Lucide** - For the beautiful icons

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/nursing-exam-platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/nursing-exam-platform?style=social)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/nursing-exam-platform)

---

**Made with ❤️ for nursing students**

**Last Updated**: 2024-01-15
