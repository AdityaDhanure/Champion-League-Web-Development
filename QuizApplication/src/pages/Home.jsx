import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // ShadCN components

// Open Trivia Database categories
const categories = [
  { id: 9, name: 'General Knowledge', description: 'Test your general knowledge' },
  { id: 10, name: 'Books', description: 'Quiz on Books and Literature' },
  { id: 11, name: 'Film', description: 'Quiz on Movies and Films' },
  { id: 18, name: 'Science: Computers', description: 'Test your computer science knowledge' },
  { id: 19, name: 'Science: Mathematics', description: 'Mathematics-related quiz' },
  { id: 21, name: 'Sports', description: 'How well do you know sports?' },
  { id: 23, name: 'History', description: 'Test your history knowledge' },
  { id: 17, name: 'Science & Nature', description: 'Test your knowledge on Science and Nature' },
  { id: 20, name: 'Mythology', description: 'How aware are you about Mythology?' },
  { id: 22, name: 'Geography', description: 'Test your Geography knowledge' },
  { id: 25, name: 'Art', description: 'Test your history knowledge' },
  { id: 30, name: 'Science and Gadgets', description: 'Test your history knowledge' },


];

const Home = () => {
  return (
    <div className="quiz-homepage px-4">
      <h1 className="text-3xl text-center font-bold m-4">Choose a Quiz Category</h1>
      
      {/* Container for grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-scroll pb-4 m-10">
        {categories.map((category) => (
          <Link to={`/quiz/${category.id}`} key={category.id}>
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
