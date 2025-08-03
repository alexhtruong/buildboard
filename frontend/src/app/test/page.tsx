export default function TestPage() {
  return (
    <div className="p-8 bg-blue-500 text-white">
      <h1 className="text-4xl font-bold">Tailwind Test</h1>
      <p className="mt-4 text-lg">
        If you see blue background and white text, Tailwind is working!
      </p>
      <button className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded">
        Test Button
      </button>
    </div>
  );
}
