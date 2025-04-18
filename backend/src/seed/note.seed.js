import Note from "../models/note.model.js";
import { connectDB } from "../config/db.config.js";

const notes = [
  {
    title: "How to Stay Focused While Studying",
    content:
      "Staying focused requires a distraction-free environment, short study intervals, and setting clear goals for each session to maintain productivity.",
  },
  {
    title: "The Ultimate Guide to Time Management",
    content:
      "Time management is about prioritizing tasks, avoiding procrastination, and using tools like calendars and to-do lists for better organization.",
  },
  {
    title: "Why Morning Routines Boost Productivity",
    content:
      "Morning routines help set the tone for your entire day, reduce stress, and increase control, clarity, and confidence in daily activities.",
  },
  {
    title: "Benefits of Learning a New Language",
    content:
      "Learning a language improves cognitive skills, opens up cultural understanding, and enhances career prospects in a global job market.",
  },
  {
    title: "Best Practices for Remote Work Success",
    content:
      "Successful remote work relies on clear communication, dedicated workspace, time tracking, and setting boundaries to avoid burnout.",
  },
  {
    title: "Habits That Make You Mentally Strong",
    content:
      "Resilience, self-discipline, positive self-talk, and consistent routines are key traits of mentally strong individuals and can be developed daily.",
  },
  {
    title: "The Science Behind Power Naps",
    content:
      "Power naps of 10–20 minutes can restore alertness, improve performance, and reduce stress without interfering with nighttime sleep.",
  },
  {
    title: "Top 5 Skills Every Developer Should Learn",
    content:
      "Developers should master Git, problem-solving, clean code practices, version control, and continuous integration for better team performance.",
  },
  {
    title: "Reading Fiction Can Boost Empathy",
    content:
      "Fiction allows readers to immerse in others' experiences, enhancing emotional intelligence, empathy, and understanding of diverse perspectives.",
  },
  {
    title: "The Link Between Exercise and Creativity",
    content:
      "Physical activity increases blood flow to the brain, boosts endorphins, and can lead to enhanced creative thinking and problem-solving skills.",
  },
  {
    title: "How to Create a Personal Budget That Works",
    content:
      "Track income and expenses, set realistic goals, and prioritize saving to build a sustainable and effective budget over time.",
  },
  {
    title: "Building Healthy Digital Habits",
    content:
      "Limit screen time, turn off notifications, and engage in offline activities to reduce digital fatigue and increase mental well-being.",
  },
  {
    title: "Tips for Mastering Public Speaking",
    content:
      "Practice regularly, focus on clarity, use body language, and connect with the audience to deliver impactful speeches.",
  },
  {
    title: "Understanding the Basics of Investing",
    content:
      "Start with low-risk options, diversify your portfolio, and invest for the long term to build wealth through smart financial decisions.",
  },
  {
    title: "The Power of Consistency in Achieving Goals",
    content:
      "Small, repeated actions build momentum and lead to significant results over time. Consistency often outweighs intensity.",
  },
  {
    title: "Easy Habits to Improve Sleep Quality",
    content:
      "Stick to a sleep schedule, avoid screens before bed, and create a calm sleeping environment to enjoy restful sleep.",
  },
  {
    title: "How Journaling Can Improve Mental Health",
    content:
      "Journaling allows for self-reflection, emotional expression, and stress relief, making it a powerful tool for mental clarity.",
  },
  {
    title: "Essential Soft Skills for Career Growth",
    content:
      "Communication, teamwork, adaptability, and emotional intelligence are crucial for long-term success in any profession.",
  },
  {
    title: "The Importance of Goal Setting in Life",
    content:
      "Clear goals provide direction, motivate action, and help measure progress, enabling personal and professional development.",
  },
  {
    title: "Ways to Stay Motivated During Tough Times",
    content:
      "Rely on support systems, remind yourself of your 'why', and take small steps forward to stay focused and hopeful.",
  },
  {
    title: "Steps to Improve Emotional Intelligence",
    content:
      "Self-awareness, empathy, social skills, and self-regulation are key elements to building stronger emotional intelligence.",
  },
  {
    title: "How Reading Daily Can Transform You",
    content:
      "Reading daily improves vocabulary, reduces stress, enhances knowledge, and stimulates mental faculties in meaningful ways.",
  },
  {
    title: "Time Blocking for Maximum Efficiency",
    content:
      "Using a calendar to block off chunks of time for specific tasks helps you stay focused and eliminates decision fatigue.",
  },
  {
    title: "Mindfulness Techniques for Beginners",
    content:
      "Start with short breathing exercises, focus on the present, and practice non-judgmental awareness to cultivate mindfulness.",
  },
  {
    title: "Developing a Growth Mindset",
    content:
      "A growth mindset embraces challenges, learns from criticism, and sees effort as the path to mastery and success.",
  },
  {
    title: "How to Break a Bad Habit Effectively",
    content:
      "Identify the trigger, replace the routine, and reinforce the new habit with rewards and consistency for better results.",
  },
  {
    title: "Simple Ways to Reduce Anxiety Daily",
    content:
      "Incorporate breathing exercises, physical activity, journaling, and limiting caffeine to manage daily anxiety levels.",
  },
  {
    title: "The Power of Saying No Gracefully",
    content:
      "Learn to protect your time and energy by setting boundaries and saying no without guilt or over-explaining.",
  },
  {
    title: "How Podcasts Can Level Up Your Skills",
    content:
      "Listening to topic-specific podcasts can help you learn new skills, stay updated, and spark creative ideas.",
  },
  {
    title: "Why Consuming Less News is Healthy",
    content:
      "Overexposure to news can increase anxiety. Curate your intake and focus on facts instead of sensationalism.",
  },
  {
    title: "How Walking Daily Impacts Health",
    content:
      "Even 30 minutes of daily walking improves cardiovascular health, boosts mood, and reduces stress levels significantly.",
  },
  {
    title: "Create a Vision Board That Actually Works",
    content:
      "Gather images that inspire your goals, visualize daily, and align your actions with the vision for the best results.",
  },
  {
    title: "The Role of Failure in Success",
    content:
      "Failure teaches resilience, highlights what doesn’t work, and is often a stepping stone to greater achievements.",
  },
  {
    title: "Powerful Morning Affirmations for Clarity",
    content:
      "Saying affirmations like 'I am capable', 'I am focused' boosts mental clarity, motivation, and self-belief each morning.",
  },
  {
    title: "The Art of Effective Listening",
    content:
      "Listen to understand, not just to reply. This improves relationships and communication immensely in all aspects of life.",
  },
  {
    title: "Digital Minimalism for Mental Peace",
    content:
      "Unplug from unnecessary apps and digital clutter to regain control, reduce anxiety, and focus on meaningful interactions.",
  },
  {
    title: "The Science of Habit Stacking",
    content:
      "Attach a new habit to an existing one (e.g., meditate after brushing teeth) to make behavior change easier and automatic.",
  },
  {
    title: "Essential Skills for the Future of Work",
    content:
      "Adaptability, digital literacy, collaboration, and creative thinking will define success in the future job market.",
  },
  {
    title: "The Psychological Benefits of Gratitude",
    content:
      "Daily gratitude can increase happiness, improve relationships, and enhance overall psychological health and optimism.",
  },
  {
    title: "Meal Planning for a Healthier Life",
    content:
      "Organize meals weekly to save time, reduce stress, and ensure you eat balanced, nutritious food regularly.",
  },
  {
    title: "Why You Should Track Your Habits",
    content:
      "Habit tracking increases awareness, accountability, and motivation to maintain consistent personal development.",
  },
  {
    title: "Benefits of Learning to Code",
    content:
      "Coding improves problem-solving, boosts creativity, and opens up career opportunities across multiple industries.",
  },
  {
    title: "Creating a Study Space That Works",
    content:
      "Minimize distractions, use comfortable lighting, and personalize the space to enhance your focus and study effectiveness.",
  },
  {
    title: "Strategies for Beating Procrastination",
    content:
      "Break tasks into small chunks, use timers like Pomodoro, and reward yourself for completed goals to beat procrastination.",
  },
  {
    title: "How to Conduct a Weekly Review",
    content:
      "Reflect on wins, evaluate setbacks, and plan the next week to improve productivity and gain clarity on priorities.",
  },
  {
    title: "The Power of Positive Self-Talk",
    content:
      "Replace negative thoughts with encouraging ones to boost self-confidence, performance, and emotional resilience.",
  },
  {
    title: "Time-Saving Tips for Busy Schedules",
    content:
      "Use automation tools, plan ahead, delegate, and batch similar tasks to save time and reduce overwhelm.",
  },
  {
    title: "Daily Rituals That Build Discipline",
    content:
      "Morning routines, journaling, goal tracking, and limiting distractions build habits that strengthen personal discipline.",
  },
  {
    title: "The Benefits of Solo Travel",
    content:
      "Traveling alone builds independence, self-awareness, and confidence while allowing deep cultural immersion and freedom.",
  },
];

const main = async (notes) => {
  await connectDB();
  await Note.deleteMany({});
  await Note.create(notes);
  console.log("Notes seeded successfully");
  process.exit(0);
};

main(notes);
