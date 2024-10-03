// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN components

const categories = [
  { name: 'Linux', description: 'Test your Linux knowledge' },
  { name: 'DevOps', description: 'Quiz on DevOps topics' },
  { name: 'Networking', description: 'How well do you know Networking?' },
  { name: 'Programming', description: 'Test your programming skills' },
  { name: 'Cloud', description: 'Quiz about Cloud technologies' },
  { name: 'Docker', description: 'Quiz about Docker' },
  { name: 'Kubernetes', description: 'Kubernetes-related quiz' }
];

const Home = () => {
  return (
    <div className="quiz-homepage px-4">
      <h1 className="text-3xl text-center font-bold m-4">Choose a Quiz Category</h1>
      
      {/* Container for grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-scroll pb-4 m-10">
        {categories.map((category) => (
          <Link to={`/quiz/${category.name}`} key={category.name}>
            <Card className="bg-blue-500 text-white transition-transform transform hover:scale-105 shadow-sm">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
