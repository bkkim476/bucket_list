
// Assuming you have the 'tasks' state object
const tasks = {
  '1': { id: '1', text: 'Hanbit', completed: false },
  '2': { id: '2', text: 'React Native', completed: true },
  '3': { id: '3', text: 'React Native Sample', completed: false },
  '4': { id: '4', text: 'Edit TODO Item', completed: false }
};

// Use Object.values() to get an array of task objects
// const taskArray = Object.values(tasks);
const taskArray = Object.keys(tasks).map(key => ({ ...tasks[key], key }));

// Use Array.filter() to select tasks where 'completed' is true
const completedTasks = taskArray.filter(task => !task.completed);

// 'completedTasks' now contains an array of tasks where 'completed' is true
console.log(completedTasks);