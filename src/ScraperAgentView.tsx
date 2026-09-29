import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, StopCircle, Plus, CheckCircle2, XCircle, 
  Loader2, Download, Trash2, FolderOpen, FileText,
  AlertCircle, Clock, TrendingUp
} from 'lucide-react';
import {
  ScraperQueue,
  ScraperTask,
  KNOWN_EXAM_URLS,
  ALREADY_SCRAPED,
  createScraperQueue,
  saveScraperState,
  loadScraperState,
  saveScrapedExam,
  loadScrapedExams,
  getPendingExams,
  categorizeExam,
} from './scraper/scraperAgent';

export default function ScraperAgentView() {
  const [queue, setQueue] = useState<ScraperQueue | null>(null);
  const [customUrl, setCustomUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Initialize queue from localStorage or create new
  useEffect(() => {
    const saved = loadScraperState();
    if (saved) {
      setQueue(saved);
    } else {
      const newQueue = createScraperQueue();
      setQueue(newQueue);
      saveScraperState(newQueue);
    }
  }, []);

  // Save queue changes to localStorage
  useEffect(() => {
    if (queue) {
      saveScraperState(queue);
    }
  }, [queue]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 100));
  };

  const startScraping = async () => {
    if (!queue || queue.tasks.length === 0) return;
    
    setIsScraping(true);
    addLog('Starting scraper agent...');
    
    // Simulate scraping process
    for (let i = 0; i < queue.tasks.length; i++) {
      const task = queue.tasks[i];
      if (task.status === 'completed' || task.status === 'failed') continue;
      
      // Update task status to scraping
      setQueue((prev: ScraperQueue | null) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          isRunning: true,
          currentTaskId: task.id,
          tasks: prev.tasks.map((t: ScraperTask) => 
            t.id === task.id ? { ...t, status: 'scraping' as const, progress: 0 } : t
          ),
        };
        return updated;
      });
      
      addLog(`Scraping: ${task.title}`);
      
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setQueue((prev: ScraperQueue | null) => {
          if (!prev) return prev;
          return {
            ...prev,
            tasks: prev.tasks.map((t: ScraperTask) => 
              t.id === task.id ? { ...t, progress } : t
            ),
          };
        });
      }
      
      // Simulate completion (in real implementation, this would fetch and parse)
      const mockQuestions = Math.floor(Math.random() * 50) + 20;
      const examData = {
        examId: task.id,
        title: task.title,
        totalQuestions: mockQuestions,
        scrapedDate: new Date().toISOString().split('T')[0],
        questions: Array.from({ length: mockQuestions }, (_, idx) => ({
          number: idx + 1,
          text: `Sample question ${idx + 1} for ${task.title}`,
          choices: ['A', 'B', 'C', 'D'],
        })),
        sourceUrl: task.url,
      };
      
      saveScrapedExam(examData);
      
      setQueue((prev: ScraperQueue | null) => {
        if (!prev) return prev;
        return {
          ...prev,
          tasks: prev.tasks.map((t: ScraperTask) => 
            t.id === task.id 
              ? { 
                  ...t, 
                  status: 'completed' as const, 
                  progress: 100,
                  totalQuestions: mockQuestions,
                  scrapedQuestions: mockQuestions,
                  completedAt: new Date().toISOString(),
                } 
              : t
          ),
          totalCompleted: prev.totalCompleted + 1,
          currentTaskId: null,
        };
      });
      
      addLog(`✓ Completed: ${task.title} (${mockQuestions} questions)`);
      
      // Delay between tasks
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsScraping(false);
    setQueue((prev: ScraperQueue | null) => prev ? { ...prev, isRunning: false, lastRunAt: new Date().toISOString() } : prev);
    addLog('Scraping completed!');
  };

  const stopScraping = () => {
    setIsScraping(false);
    setQueue((prev: ScraperQueue | null) => prev ? { ...prev, isRunning: false, currentTaskId: null } : prev);
    addLog('Scraping stopped by user');
  };

  const addCustomExam = () => {
    if (!customUrl || !customTitle || !queue) return;
    
    const { category, subcategory } = categorizeExam(customUrl, customTitle);
    const newTask: ScraperTask = {
      id: `custom-${Date.now()}`,
      url: customUrl,
      title: customTitle,
      status: 'pending' as const,
      progress: 0,
      totalQuestions: 0,
      scrapedQuestions: 0,
    };
    
    setQueue({
      ...queue,
      tasks: [...queue.tasks, newTask],
    });
    
    addLog(`Added custom exam: ${customTitle}`);
    setCustomUrl('');
    setCustomTitle('');
  };

  const removeTask = (taskId: string) => {
    if (!queue) return;
    setQueue({
      ...queue,
      tasks: queue.tasks.filter((t: ScraperTask) => t.id !== taskId),
    });
    addLog(`Removed task: ${taskId}`);
  };

  const resetQueue = () => {
    const newQueue = createScraperQueue();
    setQueue(newQueue);
    saveScraperState(newQueue);
    addLog('Queue reset to default');
  };

  const clearCompleted = () => {
    if (!queue) return;
    setQueue({
      ...queue,
      tasks: queue.tasks.filter((t: ScraperTask) => t.status !== 'completed'),
    });
    addLog('Cleared completed tasks');
  };

  const scrapedExams = loadScrapedExams();
  const pendingCount = queue?.tasks.filter(t => t.status === 'pending').length || 0;
  const completedCount = queue?.tasks.filter(t => t.status === 'completed').length || 0;
  const failedCount = queue?.tasks.filter(t => t.status === 'failed').length || 0;

  if (!queue) {
    return <div className="p-8 text-center">Loading scraper agent...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Download className="w-8 h-8 text-emerald-400" />
            Scraper Agent
          </h1>
          <p className="text-gray-400">
            Automated exam scraper and organizer for NursingPlex exams
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Exams</span>
              <FolderOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400">
              {scrapedExams.length}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Pending</span>
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-yellow-400">
              {pendingCount}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Completed</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">
              {completedCount}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Failed</span>
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-red-400">
              {failedCount}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Controls
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {!isScraping ? (
              <button
                onClick={startScraping}
                disabled={pendingCount === 0}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                Start Scraping
              </button>
            ) : (
              <button
                onClick={stopScraping}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <StopCircle className="w-4 h-4" />
                Stop Scraping
              </button>
            )}
            
            <button
              onClick={resetQueue}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Reset Queue
            </button>
            
            <button
              onClick={clearCompleted}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Clear Completed
            </button>
          </div>

          {/* Add Custom Exam */}
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-lg font-medium mb-3">Add Custom Exam</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Exam Title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500"
              />
              <input
                type="url"
                placeholder="https://nursingplex.com/review/..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              onClick={addCustomExam}
              disabled={!customUrl || !customTitle}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add to Queue
            </button>
          </div>
        </div>

        {/* Task Queue */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Task Queue ({queue.tasks.length} exams)
          </h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {queue.tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No tasks in queue. Add custom exams or reset the queue.
              </div>
            ) : (
              queue.tasks.map((task: ScraperTask) => (
                <div
                  key={task.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {task.status === 'pending' && (
                          <Clock className="w-4 h-4 text-yellow-400" />
                        )}
                        {task.status === 'scraping' && (
                          <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                        )}
                        {task.status === 'completed' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                        {task.status === 'failed' && (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="font-medium">{task.title}</span>
                      </div>
                      <div className="text-xs text-gray-400 break-all">
                        {task.url}
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {task.status === 'scraping' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {task.status === 'completed' && (
                    <div className="mt-2 text-xs text-emerald-400">
                      ✓ Scraped {task.scrapedQuestions} questions
                    </div>
                  )}
                  
                  {task.status === 'failed' && task.error && (
                    <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {task.error}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            Activity Log
          </h2>
          
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-gray-500">No activity yet. Start scraping to see logs.</div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="text-gray-300 mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-900/20 border border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <strong>Note:</strong> This is a demo scraper agent. In a production environment, 
              this would use a backend service with Puppeteer/Playwright to actually fetch and 
              parse the NursingPlex pages. The current implementation simulates the scraping 
              process for demonstration purposes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
