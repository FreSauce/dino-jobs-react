const authInitialState = {
  user: { email: "suvanth", role: "manager" },
};

const jobs = [{
  type: 'Internship',
  company: 'Google',
  role: 'Software Engineer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 9000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 1
}, {
  type: 'Internship',
  company: 'Apple',
  role: 'Frontend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 20000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 2
}, {
  id: '345234',
  type: 'Job',
  role: 'Backend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 1000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 3
}, {
  type: 'Job',
  company: 'Amazon',
  role: 'Fullstack Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 10000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 4
}, {
  type: 'Job',
  company: 'Microsoft',
  role: 'Software Engineer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 9000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 1
}, {
  type: 'Job',
  company: 'Meta',
  role: 'Frontend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 12300,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 4
}, {
  type: 'Job',
  company: 'Sony',
  role: 'Backend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 24000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 12
}, {
  type: 'Internship',
  company: 'Samsung',
  role: 'Fullstack Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 9102,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 11
}, {
  type: 'Internship',
  company: 'TCS',
  role: 'Software Engineer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 34000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 2
}, {
  type: 'Internship',
  company: 'Infosys',
  role: 'Frontend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 50000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 7
}, {
  type: 'Internship',
  company: 'Wipro',
  role: 'Backend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 70000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 8
}, {
  type: 'Internship',
  company: 'SwipeWire',
  role: 'Fullstack Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 60000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 14
}, {
  type: 'Internship',
  company: 'SecureSmarter',
  role: 'Software Engineer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 40000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 11
}, {
  type: 'Internship',
  company: 'Computers Cruzaders',
  role: 'Frontend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 10000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 7
}, {
  type: 'Job',
  company: 'Intelliware',
  role: 'Backend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 8000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 4
}, {
  type: 'Job',
  company: 'AppXNext',
  role: 'Fullstack Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 5000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 2
}, {
  type: 'Job',
  company: 'Curation Software',
  role: 'Software Engineer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 1000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 1
}, {
  type: 'Job',
  company: 'Bettermid Tech',
  role: 'Frontend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 42000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 12
}, {
  type: 'Job',
  company: 'Softronic',
  role: 'Backend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 11000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 13
}, {
  type: 'Job',
  company: 'Software Giant',
  role: 'Frontend Developer',
  description: 'This is a job description ',
  location: 'Banglore',
  employees: '34-34',
  salary: 90000,
  remote: true,
  req_skills: ['C', 'C++', 'Java'],
  req_experience: 11
}]

export { authInitialState, jobs };
