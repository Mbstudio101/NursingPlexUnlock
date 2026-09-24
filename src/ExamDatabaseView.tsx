import { useState } from 'react';
import { Database, Plus, Edit2, Trash2, X, Check, Search, Filter, Folder, FileText, ChevronRight } from 'lucide-react';
import { 
  examDatabase, 
  examCategories, 
  addExam, 
  updateExam, 
  deleteExam, 
  getExamStats,
  type Exam 
} from './data/examDatabase';
import { allExams, getExamsByCategory, getExamStats as getAllExamStats } from './data/allExams';

export default function ExamDatabaseView({ onExit }: { onExit?: () => void } = {}) {
  const [exams, setExams] = useState(allExams);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['RN_Exit']));
  const [stats, setStats] = useState(getAllExamStats());

  const refreshStats = () => {
    setStats(getAllExamStats());
    setExams([...allExams]);
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      deleteExam(id);
      refreshStats();
    }
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || exam.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // If searching or filtering, show flat list; otherwise show folder view
  const showFolderView = !searchTerm && filterCategory === 'all';

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/90 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onExit && (
              <button
                onClick={onExit}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                title="Back to home"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Exam Database</h1>
              <p className="text-xs text-gray-400">Nursing Exam Archive System</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            Add Exam
          </button>
        </div>
      </header>

      {/* Massive Scale Banner */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🎯 Massive Question Bank Database</h2>
              <p className="text-gray-400">
                {stats.totalQuestions.toLocaleString()}+ questions across {stats.totalExams} exam categories
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-emerald-400">{(stats.totalQuestions / 1000).toFixed(0)}K+</div>
              <div className="text-sm text-gray-400">Total Questions</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-3xl font-bold text-emerald-400">{stats.totalExams}</div>
            <div className="text-xs text-gray-400 mt-1">Exam Categories</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-3xl font-bold text-cyan-400">{stats.totalQuestions.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">Total Questions</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-3xl font-bold text-purple-400">{stats.scrapedExams}</div>
            <div className="text-xs text-gray-400 mt-1">Scraped Exams</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-3xl font-bold text-amber-400">
              {Object.values(stats.byCategory).filter(v => v > 0).length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Categories Used</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-400">Exams by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {examCategories.map(cat => (
              <div key={cat.id} className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-lg font-bold text-white">{stats.byCategory[cat.id as keyof typeof stats.byCategory] || 0}</div>
                <div className="text-xs text-gray-400">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-emerald-500/50"
            >
              <option value="all">All Categories</option>
              {examCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Folder Structure View or Filtered List */}
        {showFolderView ? (
          <div className="space-y-4">
            {examCategories.map(category => {
            const categoryExams = exams.filter(e => e.category === category.id);
            if (categoryExams.length === 0) return null;
            
            const isExpanded = expandedFolders.has(category.id);
            const totalQuestionsInCategory = categoryExams.reduce((sum, exam) => sum + exam.totalQuestions, 0);
            
            return (
              <div key={category.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleFolder(category.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder className={`w-5 h-5 ${isExpanded ? 'text-yellow-400' : 'text-gray-400'}`} />
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <span className="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {categoryExams.length} exams
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {totalQuestionsInCategory.toLocaleString()} questions
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                
                {/* Subcategories */}
                {isExpanded && (
                  <div className="border-t border-gray-800">
                    {category.subcategories.map(subcategory => {
                      const subcategoryExams = categoryExams.filter(e => e.subcategory === subcategory.id);
                      if (subcategoryExams.length === 0) return null;
                      
                      const totalQuestionsInSubcategory = subcategoryExams.reduce((sum, exam) => sum + exam.totalQuestions, 0);
                      
                      return (
                        <div key={subcategory.id} className="border-b border-gray-800 last:border-b-0">
                          {/* Subcategory Header */}
                          <div className="flex items-center gap-2 px-6 py-3 bg-gray-800/30">
                            <Folder className="w-4 h-4 text-purple-400" />
                            <h4 className="text-sm font-medium text-gray-300">{subcategory.name}</h4>
                            <span className="text-xs text-gray-500">({subcategoryExams.length})</span>
                            <span className="text-xs text-emerald-400 font-semibold ml-auto">
                              {totalQuestionsInSubcategory.toLocaleString()} questions
                            </span>
                          </div>
                          
                          {/* Exams in this subcategory */}
                          <div className="divide-y divide-gray-800">
                            {subcategoryExams.map(exam => (
                              <div key={exam.id} className="px-6 py-4 hover:bg-gray-800/20 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                      <h5 className="font-medium text-sm">{exam.title}</h5>
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-400 ml-6">
                                      <span className="font-semibold text-emerald-400">📝 {exam.totalQuestions.toLocaleString()} questions</span>
                                      {exam.totalPages && <span>📄 {exam.totalPages} pages</span>}
                                      {exam.freeQuestions !== undefined && <span>🆓 {exam.freeQuestions} free</span>}
                                      {exam.dateScraped && (
                                        <span className="text-emerald-400">✓ Scraped {exam.dateScraped}</span>
                                      )}
                                    </div>
                                    {exam.notes && (
                                      <p className="text-xs text-gray-500 mt-1 ml-6 italic">{exam.notes}</p>
                                    )}
                                  </div>
                                  <div className="flex gap-2 flex-shrink-0">
                                    <button
                                      onClick={() => setEditingExam(exam)}
                                      className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(exam.id)}
                                      className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          </div>
        ) : (
          /* Filtered List View */
          <div className="space-y-3">
            {filteredExams.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No exams found matching your search.
              </div>
            ) : (
              filteredExams.map(exam => {
                const category = examCategories.find(c => c.id === exam.category);
                const subcategory = category?.subcategories.find(s => s.id === exam.subcategory);
                
                return (
                  <div key={exam.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {category?.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {subcategory?.name}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{exam.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="font-semibold text-emerald-400">📝 {exam.totalQuestions.toLocaleString()} questions</span>
                          {exam.totalPages && <span>📄 {exam.totalPages} pages</span>}
                          {exam.freeQuestions !== undefined && <span>🆓 {exam.freeQuestions} free</span>}
                          {exam.dateScraped && (
                            <span className="text-emerald-400">✓ Scraped {exam.dateScraped}</span>
                          )}
                        </div>
                        {exam.notes && (
                          <p className="text-xs text-gray-500 mt-2 italic">{exam.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => setEditingExam(exam)}
                          className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(exam.id)}
                          className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingExam) && (
        <ExamModal
          exam={editingExam}
          onClose={() => {
            setShowAddModal(false);
            setEditingExam(null);
          }}
          onSave={() => {
            setShowAddModal(false);
            setEditingExam(null);
            refreshStats();
          }}
        />
      )}
    </div>
  );
}

function ExamModal({ exam, onClose, onSave }: {
  exam: Exam | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    title: exam?.title || '',
    category: (exam?.category || 'RN_Exit') as 'RN' | 'LPN' | 'RN_Exit' | 'LPN_Exit',
    subcategory: exam?.subcategory || 'hesi',
    examType: exam?.examType || '',
    source: exam?.source || 'NursingPlex',
    totalQuestions: exam?.totalQuestions || 0,
    totalPages: exam?.totalPages || 0,
    freeQuestions: exam?.freeQuestions || 0,
    url: exam?.url || '',
    status: exam?.status || 'active',
    notes: exam?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (exam) {
      updateExam(exam.id, formData);
    } else {
      addExam(formData);
    }
    
    onSave();
  };

  const selectedCategory = examCategories.find(c => c.id === formData.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{exam ? 'Edit Exam' : 'Add New Exam'}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Exam Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              placeholder="e.g., RN HESI Exit Exam - MCPHS"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'RN' | 'LPN' | 'RN_Exit' | 'LPN_Exit', subcategory: '' })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              >
                {examCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Subcategory *
              </label>
              <select
                required
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="">Select subcategory</option>
                {selectedCategory?.subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Exam Type
            </label>
            <input
              type="text"
              value={formData.examType}
              onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              placeholder="e.g., Proctored Exams, Exit Exam"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Source
              </label>
              <input
                type="text"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
                placeholder="e.g., NursingPlex, ATI, HESI"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Total Questions *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.totalQuestions}
                onChange={(e) => setFormData({ ...formData, totalQuestions: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Total Pages
              </label>
              <input
                type="number"
                min="0"
                value={formData.totalPages}
                onChange={(e) => setFormData({ ...formData, totalPages: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Free Questions
              </label>
              <input
                type="number"
                min="0"
                value={formData.freeQuestions}
                onChange={(e) => setFormData({ ...formData, freeQuestions: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50"
              placeholder="Additional notes about this exam..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform"
            >
              {exam ? 'Update Exam' : 'Add Exam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
