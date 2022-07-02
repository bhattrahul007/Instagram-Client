import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 Page not found';
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}
