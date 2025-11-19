import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Moon, Sun } from 'lucide-react';

export default function TodoList() {
  const [tasks, setTasks] = useState(["مطالعه",'یوگا', 'فیلم']);
  const [newTask, setNewTask] = useState('');//متن داخل اینپوت
  // تم تاریک/روشن + ذخیره در حافظه مرورگر 
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === null || saved === 'true';
  });
//هروقت دارک-مود عوض شئ تو لوکال اسنوریج ذخیره کن و به اچ-تی-ام-ال کلاس دارک رو بده/بردار
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    darkMode ? document.documentElement.classList.add('dark') 
             : document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // قبل از رندر React (جلوگیری از فلش)
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'false') document.documentElement.classList.remove('dark');
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks(t => [...t, newTask.trim()]);
      setNewTask('');
    }
  };

  const deleteTask = (i) => setTasks(t => t.filter((_, idx) => idx !== i));
  const moveUp = (i) => { if (i > 0) { const arr = [...tasks]; [arr[i], arr[i-1]] = [arr[i-1], arr[i]]; setTasks(arr); }};
  const moveDown = (i) => { if (i < tasks.length-1) { const arr = [...tasks]; [arr[i], arr[i+1]] = [arr[i+1], arr[i]]; setTasks(arr); }};

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-600 to-blue-600'} flex items-center justify-center p-4`}>
        {/* کارت اصلی */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg">
        {/* دکمه تغییر تم */}
        <button onClick={() => setDarkMode(!darkMode)} className="absolute top-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition">
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
        </button>

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          To-Do List 
        </h1>
         {/* اینپوت + دکمه اضافه کردن */}
        <div className="flex gap-3 mb-8">
          <input
            type="text" value={newTask} onChange={e => setNewTask(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addTask()}
            placeholder="یه کار جدید اضافه کن..."
            className="flex-1 px-5 py-4 text-lg rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-purple-500 transition"
          />
          <button onClick={addTask} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold flex items-center gap-2 transition hover:scale-105">
            <Plus size={24} /> اضافه کن
          </button>
        </div>
        {/* لیست کارها */}
        <ol className="space-y-4">
          {tasks.map((task, i) => (
            <li key={i} className="group bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition">
              <span className="flex-1 text-xl font-medium text-gray-800 dark:text-gray-100">{task}</span>
              {/* دکمه‌ها فقط وقتی ماوس میاد روشون ظاهر می‌شن */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => moveUp(i)} className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600"><ArrowUp size={20} /></button>
                <button onClick={() => moveDown(i)} className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600"><ArrowDown size={20} /></button>
                <button onClick={() => deleteTask(i)} className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600"><Trash2 size={20} /></button>
              </div>
            </li>
          ))}
        </ol>
        {/* وقتی هیچ کاری نبود */}
        {tasks.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 mt-12 text-lg">هنوز کاری اضافه نکردی</p>}
      </div>
    </div>
  );
}