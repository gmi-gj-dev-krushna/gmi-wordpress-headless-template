// components/Loader.jsx
export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
      <span className="text-blue-500 text-lg">{message}</span>
    </div>
  );
}
