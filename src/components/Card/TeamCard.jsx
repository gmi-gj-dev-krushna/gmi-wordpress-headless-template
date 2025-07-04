// components/Card/TeamCard.jsx
export default function TeamCard({ name, designation, image }) {
  return (
    <div className="text-center bg-white rounded-2xl p-4 shadow hover:shadow-md">
      <img
        src={image}
        alt={name}
        className="mx-auto w-24 h-24 rounded-full object-cover mb-3"
      />
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">{designation}</p>
    </div>
  );
}
