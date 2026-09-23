# Nursing Exam Database System

A comprehensive database system for organizing and archiving nursing exams across multiple categories and sources.

## 📊 Database Structure

### Hierarchical Organization

The database is organized into 4 main categories:

#### 1. **RN Exams**
- **ATI** - Fundamentals, Med-Surg, Mental Health, Maternity, Pediatrics, Community
- **HESI** - Exit Exam, Specialty Exams
- **Regular** - Practice Exams, Mock Exams
- **Certification** - NCLEX Prep, Licensure Exams

#### 2. **LPN Exams**
- **ATI** - Fundamentals, Med-Surg, Mental Health, Maternity, Pediatrics
- **HESI** - Exit Exam, Specialty Exams
- **Regular** - Practice Exams, Mock Exams

#### 3. **RN Exit**
- **ATI Exams** - Exit Exam, Comprehensive Predictor
- **HESI Exams** - Exit Exam, Proctored Exams

#### 4. **LPN Exit**
- **ATI Exams** - Exit Exam, Comprehensive Predictor
- **HESI Exams** - Exit Exam, Proctored Exams

## 🎯 Features

### Database Management
- **Add New Exams** - Track exam metadata (title, questions, pages, source, URL)
- **Edit Exams** - Update exam information anytime
- **Delete Exams** - Remove exams from the database
- **Search & Filter** - Find exams by name, source, or category
- **Statistics Dashboard** - View total exams, questions, and category breakdown

### Exam Tracking
Each exam record includes:
- **Title** - Full exam name
- **Category** - RN, LPN, RN_Exit, or LPN_Exit
- **Subcategory** - ATI, HESI, Regular, Certification
- **Exam Type** - Specific exam type (e.g., "Proctored Exams")
- **Source** - Where the exam came from (e.g., "NursingPlex", "ATI", "HESI")
- **Total Questions** - Number of questions in the exam
- **Total Pages** - Number of pages (if applicable)
- **Free Questions** - Number of free/unlocked questions
- **URL** - Source URL (if available)
- **Status** - Active, Archived, or Incomplete
- **Date Added** - When the exam was added to the database
- **Date Scraped** - When the exam was scraped (if applicable)
- **Notes** - Additional information about the exam

## 📁 File Structure

```
src/
├── data/
│   ├── examDatabase.ts          # Database schema and functions
│   ├── questions.ts              # Question data for exams
│   └── interactiveData.ts        # Interactive question configurations
├── ExamDatabaseView.tsx          # Database management UI
├── QuizView.tsx                  # Quiz interface
├── ScrapedQuestions.tsx          # Question viewer
├── InteractiveComponents.tsx     # Interactive question types
└── App.tsx                       # Main application
```

## 🚀 How to Use

### Accessing the Database
1. Click the **"Exam Database"** button on the home page
2. Or navigate to the database view from any screen

### Adding a New Exam
1. Click the **"Add Exam"** button (top right)
2. Fill in the exam details:
   - Select Category (RN, LPN, RN Exit, LPN Exit)
   - Select Subcategory (ATI, HESI, Regular, etc.)
   - Enter exam title, source, question count, etc.
3. Click **"Add Exam"** to save

### Editing an Exam
1. Find the exam in the list
2. Click the **Edit** icon (pencil) on the right
3. Update the information
4. Click **"Update Exam"** to save changes

### Deleting an Exam
1. Find the exam in the list
2. Click the **Delete** icon (trash can) on the right
3. Confirm the deletion

### Searching and Filtering
- **Search**: Type in the search box to filter by title or source
- **Filter**: Use the dropdown to filter by category

## 📊 Current Database Contents

### Active Exams
- **RN HESI Proctored Exit Exam - MCPHS** (127 questions, 32 pages)
  - Category: RN Exit
  - Subcategory: HESI
  - Source: NursingPlex
  - Status: Active
  - Notes: First exam successfully scraped with all 127 questions and 23 interactive question types

## 🔧 Technical Details

### Database Functions

```typescript
// Get all exams
examDatabase: Exam[]

// Get exams by category
getExamsByCategory(category: string): Exam[]

// Get exams by subcategory
getExamsBySubcategory(category: string, subcategory: string): Exam[]

// Add a new exam
addExam(exam: Omit<Exam, 'id' | 'dateAdded'>): Exam

// Update an existing exam
updateExam(id: string, updates: Partial<Exam>): Exam | null

// Delete an exam
deleteExam(id: string): boolean

// Get database statistics
getExamStats(): {
  totalExams: number;
  byCategory: { RN: number; LPN: number; RN_Exit: number; LPN_Exit: number };
  totalQuestions: number;
  activeExams: number;
}
```

### Data Persistence

Currently, the database is stored in memory. To add persistence:

1. **LocalStorage**: Save to browser localStorage
2. **Backend API**: Connect to a Node.js/Express backend
3. **Database**: Use SQLite, PostgreSQL, or MongoDB
4. **Firebase**: Use Firebase Firestore for cloud storage

Example localStorage implementation:
```typescript
// Save to localStorage
localStorage.setItem('examDatabase', JSON.stringify(examDatabase));

// Load from localStorage
const saved = localStorage.getItem('examDatabase');
if (saved) {
  examDatabase = JSON.parse(saved);
}
```

## 🎨 UI Components

### ExamDatabaseView
Main database management interface with:
- Statistics dashboard
- Category breakdown
- Search and filter controls
- Exam list with edit/delete actions
- Add/Edit modal

### Exam Modal
Form for adding/editing exams with:
- Category and subcategory selectors
- Exam metadata fields
- Status selector
- Notes field

## 📈 Future Enhancements

### Planned Features
1. **Bulk Import** - Import multiple exams from CSV/JSON
2. **Export** - Export database to CSV/JSON
3. **Question Linking** - Link questions to exam records
4. **Progress Tracking** - Track which exams you've completed
5. **Tags** - Add custom tags to exams
6. **Attachments** - Attach PDF files or screenshots
7. **Version Control** - Track changes to exam content
8. **Sharing** - Share exam records with other users
9. **Analytics** - Charts and graphs for exam statistics
10. **API Integration** - Auto-import from NursingPlex, ATI, HESI

### Integration Ideas
- **Quiz System** - Launch quiz directly from database
- **Scraper Integration** - Auto-populate exam data when scraping
- **Study Plans** - Create study plans based on exam database
- **Progress Reports** - Generate reports on completed exams

## 🐛 Troubleshooting

### Database Not Saving
- Currently using in-memory storage
- Data resets on page refresh
- Implement localStorage or backend for persistence

### Category Not Showing
- Check that category ID matches exactly
- Categories: 'RN', 'LPN', 'RN_Exit', 'LPN_Exit'
- Subcategories: 'ati', 'hesi', 'regular', 'certification'

### Can't Edit/Delete
- Check browser console for errors
- Ensure exam ID exists in database
- Verify permissions (currently no auth system)

## 📝 License

This project is for educational purposes only.

## 🤝 Contributing

To add more exams to the database:
1. Scrape the exam using the unlock script
2. Add exam metadata to the database
3. Link the questions to the exam record
4. Test the quiz functionality

## 📞 Support

For issues or questions:
- Check the FAQ section in the app
- Review the code documentation
- Check browser console for errors
