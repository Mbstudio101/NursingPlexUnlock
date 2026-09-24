import { allScrapedExams } from './data/allScrapedQuestions';

export default function TestData() {
  console.log('=== TEST DATA COMPONENT ===');
  console.log('allScrapedExams:', allScrapedExams);
  console.log('Number of exams:', allScrapedExams.length);
  
  if (!allScrapedExams || allScrapedExams.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">ERROR: No exams loaded!</h1>
        <pre className="bg-gray-800 p-4 rounded overflow-auto">
          {JSON.stringify({ allScrapedExams }, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Test Data - Exams Loaded</h1>
      <div className="mb-4">
        <strong>Total Exams:</strong> {allScrapedExams.length}
      </div>
      <div className="space-y-4">
        {allScrapedExams.map((exam, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold">{exam.title}</h2>
            <p>ID: {exam.id}</p>
            <p>Category: {exam.category} / {exam.subcategory}</p>
            <p>Questions: {exam.questions?.length || 0}</p>
            <p>Total Questions: {exam.totalQuestions}</p>
            {exam.questions && exam.questions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-400">First question:</p>
                <p className="text-sm">{exam.questions[0].text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
